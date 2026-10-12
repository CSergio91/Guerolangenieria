import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Upload, RotateCcw, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  onLoadCustomVideo?: (url: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  onLoadCustomVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (onLoadCustomVideo) {
        onLoadCustomVideo(url);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0F1117] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0B0F]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD000]" />
            <h3 className="font-condensed font-extrabold text-lg text-white uppercase tracking-wider">
              CÓMO TRABAJAMOS — DE UN LOCAL VACÍO A UN NEGOCIO
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl || 'https://res.cloudinary.com/lju4v2pw/video/upload/v1791820267/Architectural_walkthrough_camera__1080p_20261012173439.mp4'}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* Overlay controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1 hover:text-[#FFD000] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-1 hover:text-[#FFD000] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-slate-300 font-mono text-[11px]">Walkthrough 1080p</span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#FFD000] transition-colors text-[11px] cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Cargar otro vídeo</span>
            </button>
          </div>
        </div>


        {/* 4 Phases Timeline bar */}
        <div className="p-6 bg-[#0E1017] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#FFD000] block">01 / SEMANA 1-2</span>
            <span className="font-bold text-white block">Demolición & Replanteo</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#FFD000] block">02 / SEMANA 3-5</span>
            <span className="font-bold text-white block">Instalaciones & Clima</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#FFD000] block">03 / SEMANA 6-7</span>
            <span className="font-bold text-white block">Revestimientos & Vidrio</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#FFD000] block">04 / SEMANA 8</span>
            <span className="font-bold text-white block">Licencia & Apertura</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm"
          className="hidden"
          onChange={handleFileChange}
        />

      </div>
    </div>
  );
};
