import React, { useState, useEffect, useRef } from 'react';
import './HexGallery.css';
import { X } from 'lucide-react';

interface HexData {
  id: number;
  title: string;
  subtitle: string;
  imgSrc: string;
  videoSrc?: string;
  alt: string;
}

const hexItems: HexData[] = [
  {
    id: 1,
    title: "River Canyon",
    subtitle: "Nature Photography",
    imgSrc: "https://picsum.photos/id/1015/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-river-flowing-through-a-mountain-valley-4443-large.mp4",
    alt: "Serene river flowing through a canyon"
  },
  {
    id: 2,
    title: "Mountain Peak",
    subtitle: "Expedition 2026",
    imgSrc: "https://picsum.photos/id/1016/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-peak-4456-large.mp4",
    alt: "Rugged mountain landscape"
  },
  {
    id: 3,
    title: "Alpine Fog",
    subtitle: "Winter Series",
    imgSrc: "https://picsum.photos/id/1018/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-foggy-mountain-landscape-4458-large.mp4",
    alt: "Foggy mountain peak"
  },
  {
    id: 4,
    title: "Coastal Waves",
    subtitle: "Ocean View",
    imgSrc: "https://picsum.photos/id/1019/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-waves-crashing-on-the-shore-4467-large.mp4",
    alt: "Coastal view with waves crashing"
  },
  {
    id: 5,
    title: "Wilderness",
    subtitle: "Wildlife Reserve",
    imgSrc: "https://picsum.photos/id/1020/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-brown-bear-walking-in-the-forest-4475-large.mp4",
    alt: "Bear walking in the distance"
  },
  {
    id: 6,
    title: "Deep Forest",
    subtitle: "Canopy Exploration",
    imgSrc: "https://picsum.photos/id/1021/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-lush-green-forest-canopy-from-above-4478-large.mp4",
    alt: "Lush green forest canopy"
  },
  {
    id: 7,
    title: "Aurora",
    subtitle: "Night Sky",
    imgSrc: "https://picsum.photos/id/1022/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-northern-lights-dancing-in-the-night-sky-4482-large.mp4",
    alt: "Northern lights over mountains"
  },
  {
    id: 8,
    title: "The Journey",
    subtitle: "Urban Transit",
    imgSrc: "https://picsum.photos/id/1023/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-bicycle-wheel-spinning-close-up-4486-large.mp4",
    alt: "Bicycle tire close up"
  },
  {
    id: 9,
    title: "Flight",
    subtitle: "Aerial Photography",
    imgSrc: "https://picsum.photos/id/1024/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-vast-canyon-landscape-4491-large.mp4",
    alt: "Bird flying over a canyon"
  },
  {
    id: 10,
    title: "Cozy Mornings",
    subtitle: "Portrait Series",
    imgSrc: "https://picsum.photos/id/1025/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-cute-pug-dog-wrapped-in-a-blanket-4495-large.mp4",
    alt: "Pug wrapped in a blanket"
  },
  {
    id: 11,
    title: "Barren Lands",
    subtitle: "Desert Textures",
    imgSrc: "https://picsum.photos/id/1026/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-vast-desert-landscape-with-rocky-terrain-4501-large.mp4",
    alt: "Rocky terrain"
  },
  {
    id: 12,
    title: "Winter Solstice",
    subtitle: "Fashion Editorial",
    imgSrc: "https://picsum.photos/id/1027/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-woman-standing-in-the-snow-during-winter-4505-large.mp4",
    alt: "Woman standing in snow"
  },
  {
    id: 13,
    title: "Undergrowth",
    subtitle: "Macro Nature",
    imgSrc: "https://picsum.photos/id/1028/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-lush-green-moss-on-the-forest-floor-4510-large.mp4",
    alt: "Lush green forest floor"
  },
  {
    id: 14,
    title: "Concrete Oasis",
    subtitle: "Cityscapes",
    imgSrc: "https://picsum.photos/id/1029/400/400",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-urban-city-park-with-skyscrapers-in-the-background-4515-large.mp4",
    alt: "Urban city park view"
  }
];

const HexGallery: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHexClick = (videoSrc?: string) => {
    if (videoSrc) {
      setActiveVideo(videoSrc);
    }
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [activeVideo]);

  const handleVideoEnded = () => {
    // Optionally close video when done
    closeModal();
  };

  return (
    <main className="gallery-wrapper" id="gallery">
      <div className="hex-grid">
        {hexItems.map((item) => (
          <div 
            key={item.id} 
            className="hex" 
            tabIndex={0} 
            role="button"
            onClick={() => handleHexClick(item.videoSrc)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleHexClick(item.videoSrc); }}
          >
            <div className="hex-shape">
              <img src={item.imgSrc} alt={item.alt} />
              <div className="hex-caption">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Overlay */}
      <div 
        className={`video-modal-overlay ${activeVideo ? 'active' : ''}`}
        onClick={closeModal}
      >
        <div 
          className="video-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal" onClick={closeModal} aria-label="Close video">
            <X size={24} />
          </button>
          {activeVideo && (
            <video 
              ref={videoRef}
              src={activeVideo} 
              controls 
              autoPlay 
              onEnded={handleVideoEnded}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default HexGallery;
