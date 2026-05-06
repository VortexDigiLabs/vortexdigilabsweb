import { useState, useRef, useCallback, useEffect } from 'react';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../lib/cloudinary';

interface AssetItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploaded: string;
  publicId: string;
}

interface UploadTask {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
}

const STORAGE_KEY = 'vdl_assets';

function loadStoredAssets(): AssetItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAssets(assets: AssetItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
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
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'other'>('all');
  const [previewAsset, setPreviewAsset] = useState<AssetItem | null>(null);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAssets(loadStoredAssets());
  }, []);

  const uploadFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      const taskId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;

      setUploads((prev) => [
        ...prev,
        { id: taskId, name: file.name, progress: 0, status: 'uploading' },
      ]);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', CLOUDINARY_UPLOAD_URL);

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setUploads((prev) =>
            prev.map((u) => (u.id === taskId ? { ...u, progress: pct } : u))
          );
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const newAsset: AssetItem = {
            id: taskId,
            name: file.name,
            url: data.secure_url,
            type: file.type || 'application/octet-stream',
            size: data.bytes,
            uploaded: new Date().toISOString(),
            publicId: data.public_id,
          };

          setAssets((prev) => {
            const updated = [newAsset, ...prev];
            saveAssets(updated);
            return updated;
          });

          setUploads((prev) =>
            prev.map((u) =>
              u.id === taskId ? { ...u, status: 'done', progress: 100 } : u
            )
          );

          setTimeout(() => {
            setUploads((prev) => prev.filter((u) => u.id !== taskId));
          }, 2500);
        } else {
          setUploads((prev) =>
            prev.map((u) => (u.id === taskId ? { ...u, status: 'error' } : u))
          );
        }
      });

      xhr.addEventListener('error', () => {
        setUploads((prev) =>
          prev.map((u) => (u.id === taskId ? { ...u, status: 'error' } : u))
        );
      });

      xhr.send(formData);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) uploadFiles(e.target.files);
    e.target.value = '';
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const deleteAsset = (asset: AssetItem) => {
    if (!window.confirm(`Remove "${asset.name}" from your library?`)) return;
    setDeletingId(asset.id);
    setAssets((prev) => {
      const updated = prev.filter((a) => a.id !== asset.id);
      saveAssets(updated);
      return updated;
    });
    if (previewAsset?.id === asset.id) setPreviewAsset(null);
    setDeletingId(null);
  };

  const filteredAssets = assets.filter((a) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'image' && a.type.startsWith('image/')) ||
      (filter === 'video' && a.type.startsWith('video/')) ||
      (filter === 'other' && !a.type.startsWith('image/') && !a.type.startsWith('video/'));
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countFor = (f: 'image' | 'video' | 'other') =>
    assets.filter((a) =>
      f === 'image'
        ? a.type.startsWith('image/')
        : f === 'video'
        ? a.type.startsWith('video/')
        : !a.type.startsWith('image/') && !a.type.startsWith('video/')
    ).length;

  return (
    <div className="assets-page">
      {/* Header */}
      <div className="assets-header">
        <div className="assets-header-inner">
          <div className="assets-brand">
            <span className="assets-logo">⬡</span>
            <div>
              <h1>My Assets</h1>
              <p>Vortex Digi Labs — Cloudinary Media Library</p>
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
          <div className="drop-zone-sub">or click to browse — images, videos, audio, PDFs</div>
        </div>

        {/* Active Uploads */}
        {uploads.length > 0 && (
          <div className="upload-queue">
            {uploads.map((u) => (
              <div key={u.id} className={`upload-item upload-item--${u.status}`}>
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

        {/* Toolbar */}
        <div className="assets-toolbar">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Files <span className="filter-tab-count">{assets.length}</span>
            </button>
            <button
              className={`filter-tab ${filter === 'image' ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter('image')}
            >
              🖼 Images <span className="filter-tab-count">{countFor('image')}</span>
            </button>
            <button
              className={`filter-tab ${filter === 'video' ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter('video')}
            >
              🎬 Videos <span className="filter-tab-count">{countFor('video')}</span>
            </button>
            <button
              className={`filter-tab ${filter === 'other' ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter('other')}
            >
              📁 Other <span className="filter-tab-count">{countFor('other')}</span>
            </button>
          </div>
          <input
            className="assets-search"
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        {filteredAssets.length === 0 ? (
          <div className="assets-empty">
            <div className="assets-empty-icon">📭</div>
            <div>{assets.length === 0 ? 'No assets yet. Drop some files above.' : 'No files match your filter.'}</div>
          </div>
        ) : (
          <div className="assets-grid">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className="asset-thumb" onClick={() => setPreviewAsset(asset)}>
                  {asset.type.startsWith('image/') ? (
                    <img src={asset.url} alt={asset.name} loading="lazy" />
                  ) : asset.type.startsWith('video/') ? (
                    <video src={asset.url} muted />
                  ) : (
                    <div className="asset-thumb-icon">{getFileIcon(asset.type)}</div>
                  )}
                  <div className="asset-thumb-overlay">Preview</div>
                </div>
                <div className="asset-info">
                  <div className="asset-name" title={asset.name}>
                    {asset.name.length > 28 ? asset.name.slice(0, 25) + '…' : asset.name}
                  </div>
                  <div className="asset-meta">
                    <span>{formatBytes(asset.size)}</span>
                    <span>{new Date(asset.uploaded).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="asset-actions">
                  <button
                    className={`asset-btn asset-btn--copy ${copiedUrl === asset.url ? 'asset-btn--copied' : ''}`}
                    onClick={() => copyUrl(asset.url)}
                  >
                    {copiedUrl === asset.url ? '✓ Copied' : '🔗 Copy URL'}
                  </button>
                  <button
                    className="asset-btn asset-btn--delete"
                    onClick={() => deleteAsset(asset)}
                    disabled={deletingId === asset.id}
                  >
                    🗑
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
            <button
              className="preview-copy-btn"
              onClick={() => copyUrl(previewAsset.url)}
            >
              {copiedUrl === previewAsset.url ? '✓ Copied!' : '🔗 Copy URL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
