import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { BackgroundLayer } from './components/BackgroundLayer';
import { SlideDeck } from './components/SlideDeck';
import { VideoModal } from './components/VideoModal';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  // [currentSlide, slideDirection] managed together for synchronous directional animations:
  // slideDirection = 1 (forward: enters from right along circumference wheel, exits to left)
  // slideDirection = -1 (backward: enters from left along circumference wheel, exits to right)
  const [[currentSlide, slideDirection], setSlideState] = useState<[number, number]>([0, 1]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [prefilledType, setPrefilledType] = useState<string>('Retail / Comercio');

  const handleSlideChange = useCallback((targetIndex: number) => {
    setSlideState(([prevSlide]) => {
      if (targetIndex < 0 || targetIndex >= 6 || targetIndex === prevSlide) {
        return [prevSlide, 1];
      }
      const newDirection = targetIndex > prevSlide ? 1 : -1;
      return [targetIndex, newDirection];
    });
  }, []);

  const handleOpenStudyModal = (sectorOrSummary?: string) => {
    if (sectorOrSummary) {
      setPrefilledType(sectorOrSummary);
    }
    // Jump to Contact Slide (Slide 5)
    handleSlideChange(5);
  };

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCustomVideoLoaded = (url: string) => {
    setCustomVideoUrl(url);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#090B0F] text-slate-100 selection:bg-[#FFD000] selection:text-black">
      {/* 1. SCROLL-SYNCED HARDWARE-ACCELERATED 1080P VIDEO BACKGROUND */}
      <BackgroundLayer
        activeSlideIndex={currentSlide}
        customVideoUrl={customVideoUrl}
        onCustomVideoLoaded={handleCustomVideoLoaded}
        onVideoClick={handleOpenVideoModal}
      />

      {/* 2. FIXED HEADER DIRECTLY ON BACKGROUND WITH ACTIVE SLIDE SYNC */}
      <Header
        activeSlideIndex={currentSlide}
        onSelectSlide={handleSlideChange}
        onOpenStudyModal={() => handleOpenStudyModal()}
        onOpenVideoModal={handleOpenVideoModal}
      />

      {/* 3. ORBITAL SLIDE DECK (RESTS DEAD-CENTER, BIDIRECTIONAL WHEEL ANIMATIONS) */}
      <main className="relative z-10 w-full h-full">
        <SlideDeck
          currentSlide={currentSlide}
          direction={slideDirection}
          onSlideChange={handleSlideChange}
          onOpenStudyModal={handleOpenStudyModal}
          onOpenVideoModal={handleOpenVideoModal}
          prefilledType={prefilledType}
        />
      </main>

      {/* 4. MODAL SHOWREEL DE VÍDEO (1080P) */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={customVideoUrl || 'https://res.cloudinary.com/lju4v2pw/video/upload/q_auto,f_auto,w_1280,c_limit/v1791820267/Architectural_walkthrough_camera__1080p_20261012173439.mp4'}
      />

      {/* 5. MOBILE QUICK ACCESS BAR */}
      <MobileQuickBar onOpenStudyModal={() => handleOpenStudyModal()} />
    </div>
  );
}
