import React, { useEffect, useRef, useState, useCallback } from 'react';

interface BackgroundLayerProps {
  customVideoUrl?: string | null;
  onCustomVideoLoaded?: (url: string) => void;
  onVideoClick?: () => void;
  activeSlideIndex: number;
}

// 1080p Cloudinary architectural walkthrough video (optimized for streaming and seeking)
const OPTIMIZED_CLOUDINARY_VIDEO_URL =
  'https://res.cloudinary.com/lju4v2pw/video/upload/q_auto,f_auto,w_1280,c_limit/v1791820267/Architectural_walkthrough_camera__1080p_20261012173439.mp4';
const POSTER_IMAGE_URL =
  'https://res.cloudinary.com/lju4v2pw/image/upload/v1791820235/Vest%C3%ADbulo_moderno_en_fase_de_reforma.png';

// Exact timestamps corresponding to the user's choreography (total video duration ~10s):
// Slide 0 (Inicio): 0.0s (start in empty shell)
// Slide 1 (Proceso): 2.5s (moving through the local)
// Slide 2 (Servicios & Calculadora): 5.0s (PAUSED, completely covered by opaque section)
// Slide 3 (Antes y Después): 7.5s (revealing the luxury transformed interior)
// Slide 4 (Garantías): 8.8s (further inside the completed space)
// Slide 5 (Contacto): 10.0s (final majestic view)
const SLIDE_TIMESTAMPS: Record<number, number> = {
  0: 0.0,
  1: 2.5,
  2: 5.0,
  3: 7.5,
  4: 8.8,
  5: 10.0,
};

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  customVideoUrl,
  activeSlideIndex,
}) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeVideoUrl = customVideoUrl || OPTIMIZED_CLOUDINARY_VIDEO_URL;
  const rafRef = useRef<number | null>(null);

  // Smoothly seek or play the video to target timestamp
  const transitionToTargetTime = useCallback((targetTime: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 10.0;
    const clampedTarget = Math.max(0, Math.min(targetTime, duration));

    // If target is ahead of current time, use native hardware-accelerated playback for silky 60fps
    if (clampedTarget > video.currentTime + 0.05) {
      video.playbackRate = 1.25;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          const monitorPlayback = () => {
            if (!video) return;
            setCurrentVideoTime(video.currentTime);
            if (video.currentTime >= clampedTarget - 0.08 || video.currentTime >= duration - 0.05) {
              video.pause();
              video.currentTime = clampedTarget;
              setCurrentVideoTime(clampedTarget);
            } else {
              rafRef.current = requestAnimationFrame(monitorPlayback);
            }
          };
          rafRef.current = requestAnimationFrame(monitorPlayback);
        }).catch(() => {
          // Fallback if browser requires gesture: seek directly
          video.currentTime = clampedTarget;
          setCurrentVideoTime(clampedTarget);
        });
      }
    } else if (clampedTarget < video.currentTime - 0.05) {
      // Rewind smoothly backwards
      video.pause();
      const stepRewind = () => {
        if (!video) return;
        const diff = video.currentTime - clampedTarget;
        if (diff <= 0.08) {
          video.currentTime = clampedTarget;
          setCurrentVideoTime(clampedTarget);
        } else {
          // Smooth easing rewind
          const step = Math.max(0.06, diff * 0.18);
          video.currentTime = Math.max(clampedTarget, video.currentTime - step);
          setCurrentVideoTime(video.currentTime);
          rafRef.current = requestAnimationFrame(stepRewind);
        }
      };
      rafRef.current = requestAnimationFrame(stepRewind);
    } else {
      video.pause();
      video.currentTime = clampedTarget;
      setCurrentVideoTime(clampedTarget);
    }
  }, []);

  // Update video whenever activeSlideIndex changes
  useEffect(() => {
    const target = SLIDE_TIMESTAMPS[activeSlideIndex] ?? 0;
    transitionToTargetTime(target);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeSlideIndex, transitionToTargetTime]);

  // Video initialization and gesture unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    // Prime the video decoder on first user interaction if blocked
    const unlockDecoder = () => {
      if (!video) return;
      video.play().then(() => {
        const target = SLIDE_TIMESTAMPS[activeSlideIndex] ?? 0;
        if (activeSlideIndex === 2 || activeSlideIndex === 0) {
          video.pause();
          video.currentTime = target;
        }
        setIsVideoReady(true);
      }).catch(() => {
        setIsVideoReady(true);
      });
      window.removeEventListener('click', unlockDecoder);
      window.removeEventListener('touchstart', unlockDecoder);
      window.removeEventListener('wheel', unlockDecoder);
    };

    window.addEventListener('click', unlockDecoder, { once: true, passive: true });
    window.addEventListener('touchstart', unlockDecoder, { once: true, passive: true });
    window.addEventListener('wheel', unlockDecoder, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', unlockDecoder);
      window.removeEventListener('touchstart', unlockDecoder);
      window.removeEventListener('wheel', unlockDecoder);
    };
  }, [activeSlideIndex]);

  const handleLoadedData = () => {
    setIsVideoReady(true);
    const video = videoRef.current;
    if (video) {
      const target = SLIDE_TIMESTAMPS[activeSlideIndex] ?? 0;
      video.currentTime = target;
      setCurrentVideoTime(target);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#090b0f]">
      {/* 1. INSTANT HIGH-RES POSTER (Visible instantly while video initializes) */}
      <img
        src={POSTER_IMAGE_URL}
        alt="Vestíbulo moderno en fase de reforma - Guerola Ingeniería"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
          isVideoReady ? 'opacity-0' : 'opacity-100'
        }`}
        referrerPolicy="no-referrer"
        loading="eager"
      />

      {/* 2. OPTIMIZED CLOUDINARY WALKTHROUGH VIDEO (1080P WALKTHROUGH, HARDWARE DECODED, ZERO OVERLAYS) */}
      <video
        ref={videoRef}
        src={activeVideoUrl}
        poster={POSTER_IMAGE_URL}
        onLoadedData={handleLoadedData}
        onCanPlay={() => setIsVideoReady(true)}
        preload="auto"
        playsInline
        muted
        style={{
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        className="w-full h-full object-cover object-center"
      />

      {/* Subtly indicate current video frame timestamp */}
      <div className="absolute bottom-4 left-6 hidden lg:flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD000] animate-pulse" />
        <span>RECORRIDO EN DIRECTO: {currentVideoTime.toFixed(1)}s / 10.0s</span>
      </div>
    </div>
  );
};
