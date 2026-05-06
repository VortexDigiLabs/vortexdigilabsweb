import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
  getMetadata,
} from 'firebase/storage';
import { storage } from '../lib/firebase';

interface AssetItem {
  name: string;
  url: string;
  fullPath: string;
  type: string;
  size: number;
  uploaded: string;
}

interface UploadTask {
  name: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith('video/')) return '🎬';
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('pdf')) return '📄';
  return '📁';
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [uploads, setUploads] = useState<UploadTask[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'other'>('all');
  const [previewAsset, setPreviewAsset] = useState<AssetItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadAssets = useCallback(async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, 'assets/');
      const result = await listAll(storageRef);
      const items: AssetItem[] = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const meta = await getMetadata(itemRef);
          return {
            name: itemRef.name,
            url,
            fullPath: itemRef.fullPath,
            type: meta.contentType || 'application/octet-stream',
            size: meta.size,
            uploaded: meta.timeCreated,
          };
        })
      );
      items.sort((a, b) => new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime());
      setAssets(items);
    } catch (err) {
      console.error('Failed to load assets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const uploadFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      const taskName = file.name;
      setUploads((prev) => [...prev, { name: taskName, progress: 0, status: 'uploading' }]);

      const storageRef = ref(storage, `assets/${Date.now()}_${file.name}`);
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        'state_changed',
        (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setUploads((prev) =>
            prev.map((u) => (u.name === taskName ? { ...u, progress: pct } : u))
          );
        },
        () => {
          setUploads((prev) =>
            prev.map((u) => (u.name === taskName ? { ...u, status: 'error' } : u))
          );
        },
        async () => {
          setUploads((prev) =>
            prev.map((u) => (u.name === taskName ? { ...u, status: 'done', progress: 100 } : u))
          );
          await loadAssets();
          setTimeout(() => {
            setUploads((prev) => prev.filter((u) => u.name !== taskName));
          }, 2000);
        }
      );
    });
  }, [loadAssets]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const deleteAsset = async (asset: AssetItem) => {
    if (!window.confirm(`Delete "${asset.name}"?`)) return;
    setDeletingPath(asset.fullPath);
    try {
      await deleteObject(ref(storage, asset.fullPath));
      setAssets((prev) => prev.filter((a) => a.fullPath !== asset.fullPath));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingPath(null);
    }
  };

  const filteredAssets = assets.filter((a) => {
    if (filter === 'image') return a.type.startsWith('image/');
    if (filter === 'video') return a.type.startsWith('video/');
    if (filter === 'other') return !a.type.startsWith('image/') && !a.type.startsWith('video/');
    return true;
  });

  return (
    <div className="assets-page">
      {/* Header */}
      <div className="assets-header">
        <div className="assets-header-inner">
          <div className="assets-brand">
            <span className="assets-logo">⬡</span>
            <div>
              <h1>My Assets</h1>
              <p>Vortex Digi Labs — Firebase Storage</p>
            </div>
          </div>
          <div className="assets-stats">
            <div className="stat-pill">{assets.length} files</div>
            <div className="stat-pill">
              {formatBytes(assets.reduce((acc, a) => acc + a.size, 0))}
            </div>
          </div>
        </div>
      </div>

      <div className="assets-body">
        {/* Drop Zone */}
        <div
          className={`drop-zone ${isDragging ? 'drop-zone--active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <div className="drop-zone-icon">{isDragging ? '📂' : '☁️'}</div>
          <div className="drop-zone-title">
            {isDragging ? 'Drop to upload' : 'Drag & Drop files here'}
          </div>
          <div className="drop-zone-sub">
            or click to browse — images, videos, audio, PDFs
          </div>
        </div>

        {/* Active Uploads */}
        {uploads.length > 0 && (
          <div className="upload-queue">
            {uploads.map((u) => (
              <div key={u.name} className={`upload-item upload-item--${u.status}`}>
                <div className="upload-item-name">{u.name}</div>
                <div className="upload-progress-bar">
                  <div className="upload-progress-fill" style={{ width: `${u.progress}%` }} />
                </div>
                <div className="upload-item-meta">
                  {u.status === 'done' ? '✓ Done' : u.status === 'error' ? '✗ Failed' : `${u.progress}%`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {(['all', 'image', 'video', 'other'] as const).map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Files' : f === 'image' ? '🖼 Images' : f === 'video' ? '🎬 Videos' : '📁 Other'}
              <span className="filter-tab-count">
                {f === 'all'
                  ? assets.length
                  : assets.filter((a) =>
                      f === 'image'
                        ? a.type.startsWith('image/')
                        : f === 'video'
                        ? a.type.startsWith('video/')
                        : !a.type.startsWith('image/') && !a.type.startsWith('video/')
                    ).length}
              </span>
            </button>
          ))}
        </div>

        {/* Asset Grid */}
        {loading ? (
          <div className="assets-loading">
            <div className="loading-spinner" />
            <span>Loading assets...</span>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="assets-empty">
            <div className="assets-empty-icon">📭</div>
            <div>No assets yet. Start by dropping some files above.</div>
          </div>
        ) : (
          <div className="assets-grid">
            {filteredAssets.map((asset) => (
              <div key={asset.fullPath} className="asset-card">
                {/* Thumbnail */}
                <div
                  className="asset-thumb"
                  onClick={() => setPreviewAsset(asset)}
                >
                  {asset.type.startsWith('image/') ? (
                    <img src={asset.url} alt={asset.name} loading="lazy" />
                  ) : asset.type.startsWith('video/') ? (
                    <video src={asset.url} muted />
                  ) : (
                    <div className="asset-thumb-icon">{getFileIcon(asset.type)}</div>
                  )}
                  <div className="asset-thumb-overlay">
                    <span>Preview</span>
                  </div>
                </div>

                {/* Info */}
                <div className="asset-info">
                  <div className="asset-name" title={asset.name}>
                    {asset.name.length > 28 ? asset.name.slice(0, 25) + '…' : asset.name}
                  </div>
                  <div className="asset-meta">
                    <span>{formatBytes(asset.size)}</span>
                    <span>{new Date(asset.uploaded).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="asset-actions">
                  <button
                    className={`asset-btn asset-btn--copy ${copiedUrl === asset.url ? 'asset-btn--copied' : ''}`}
                    onClick={() => copyUrl(asset.url)}
                    title="Copy URL"
                  >
                    {copiedUrl === asset.url ? '✓ Copied' : '🔗 Copy URL'}
                  </button>
                  <button
                    className="asset-btn asset-btn--delete"
                    onClick={() => deleteAsset(asset)}
                    disabled={deletingPath === asset.fullPath}
                    title="Delete"
                  >
                    {deletingPath === asset.fullPath ? '…' : '🗑'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewAsset && (
        <div className="preview-modal" onClick={() => setPreviewAsset(null)}>
          <div className="preview-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="preview-close" onClick={() => setPreviewAsset(null)}>✕</button>
            <div className="preview-name">{previewAsset.name}</div>
            {previewAsset.type.startsWith('image/') ? (
              <img src={previewAsset.url} alt={previewAsset.name} className="preview-media" />
            ) : previewAsset.type.startsWith('video/') ? (
              <video src={previewAsset.url} controls autoPlay className="preview-media" />
            ) : (
              <div className="preview-file-icon">{getFileIcon(previewAsset.type)}</div>
            )}
            <div className="preview-meta">
              <span>{formatBytes(previewAsset.size)}</span>
              <span>{previewAsset.type}</span>
              <span>{new Date(previewAsset.uploaded).toLocaleString()}</span>
            </div>
            <button className="preview-copy-btn" onClick={() => copyUrl(previewAsset.url)}>
              {copiedUrl === previewAsset.url ? '✓ Copied!' : '🔗 Copy URL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
