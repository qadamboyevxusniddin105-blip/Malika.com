/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Code, 
  Copy, 
  Check, 
  Download, 
  X,
  Cat,
  Crown,
  Globe,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { soundFX } from './utils/soundEffects';
import { standaloneHtmlCode } from './utils/vanillaCode';

// Verified, high-quality cute cat GIF URLs
const CAT_GIFS = {
  initial: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3A4aGhkbDN3ZXFid3lva21pNm93eDVmaG5rY3YxMTB0dWppd3NscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif',
  sad1: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJ3ZnpnOXpnYnlrM2w4cGM4anl1aWp2anF4c3B0ZHA1cG40bHRsNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif',
  sad2: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnFwM2NycTZ4OTdzNXhxcmQydnZzZTVmZjFnZXVybnZjaGNsOHRrcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob50R0O79CA/giphy.gif',
  happy: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVrMnhjNm4wNGprdW9xMmxld2phNGppMjE1dDZpZzE4eXFjc291OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T86i6yDyOYz7J6dPhf/giphy.gif',
};

// Sequential humorous stages for the "No" button
const NO_BUTTON_TEXTS = [
  'No',
  'Are you sure, Malika? 🥺',
  'Think again 🥺',
  'Last chance, Malika! 🐾',
  'Really sure? 💔',
  'Don\'t break my heart! 😿',
  'Look at this cute face! 🥺',
  'Just say Yes! 💖',
  'Meow? 🥺',
  'You have no choice, Malika! 😻',
  'Error: "No" is forbidden 🚫',
  'Resistance is impossible 💕'
];

// Scale multipliers for Yes button
const YES_SCALES = [1, 1.25, 1.55, 1.9, 2.35, 2.85, 3.4, 4.0, 4.7, 5.5, 6.3, 7.2];

export default function App() {
  const [noCount, setNoCount] = useState<number>(0);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [noButtonOffset, setNoButtonOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [showGithubModal, setShowGithubModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync sound setting
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // Determine current Cat image & status badge
  let currentImage = CAT_GIFS.initial;
  let statusBadge = '🐾 Serious Cat';

  if (isAccepted) {
    currentImage = CAT_GIFS.happy;
    statusBadge = '😻 Pure Joy!';
  } else if (noCount >= 4) {
    currentImage = CAT_GIFS.sad2;
    statusBadge = '😿 Heartbroken';
  } else if (noCount >= 1) {
    currentImage = CAT_GIFS.sad1;
    statusBadge = '🥺 Pleading kitten';
  }

  // Calculate current scale for Yes button
  const currentScale = !isAccepted 
    ? YES_SCALES[Math.min(noCount, YES_SCALES.length - 1)] 
    : 1.15;

  // Calculate current text for No button
  const currentNoText = NO_BUTTON_TEXTS[Math.min(noCount, NO_BUTTON_TEXTS.length - 1)];

  // Confetti blaster function
  const triggerConfetti = () => {
    const end = Date.now() + 1400;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#ffe4e6']
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#e11d48', '#be123c', '#fda4af', '#f43f5e', '#fecdd3']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Heart shapes
    confetti({
      particleCount: 65,
      spread: 120,
      origin: { y: 0.6 },
      scalar: 1.4,
      colors: ['#e11d48', '#f43f5e', '#fda4af']
    });
  };

  // Handle Yes click
  const handleYes = () => {
    setIsAccepted(true);
    soundFX.playVictory();
    triggerConfetti();
  };

  // Handle No click or runaway interaction
  const handleNo = () => {
    if (isAccepted) return;
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setImageError(false);

    if (nextCount < 3) {
      soundFX.playSadWhimper();
    } else {
      soundFX.playMeow();
    }

    // After 5 attempts, No button starts dodging
    if (nextCount >= 5) {
      const distance = Math.min(130, 40 + nextCount * 12);
      const randomAngle = Math.random() * Math.PI * 2;
      const x = Math.cos(randomAngle) * distance;
      const y = Math.sin(randomAngle) * distance * 0.7;
      setNoButtonOffset({ x, y });
    }
  };

  // On hover over No button when high count: dodge away!
  const handleNoHover = () => {
    if (!isAccepted && noCount >= 6) {
      const distance = 90 + Math.random() * 60;
      const angle = Math.random() * Math.PI * 2;
      setNoButtonOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.6
      });
      soundFX.playPop();
    }
  };

  // Reset all state
  const handleReset = () => {
    setNoCount(0);
    setIsAccepted(false);
    setNoButtonOffset({ x: 0, y: 0 });
    setImageError(false);
    soundFX.playPop();
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(standaloneHtmlCode);
      setCopiedCode(true);
      soundFX.playPop();
      setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      // fallback
    }
  };

  // Download standalone index.html (Perfect for GitHub Pages)
  const handleDownloadCode = (fileName = 'index.html') => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    soundFX.playPop();
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-rose-100 via-pink-100 to-amber-50 selection:bg-pink-300 selection:text-pink-900 overflow-hidden font-['Nunito',sans-serif]"
    >
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(18)].map((_, i) => {
          const size = 16 + (i % 5) * 6;
          const left = (i * 5.8 + 3) % 96;
          const duration = 7 + (i % 6) * 1.5;
          const delay = (i * 0.7) % 6;
          return (
            <div
              key={i}
              className="absolute animate-float-up opacity-40 select-none text-rose-400"
              style={{
                left: `${left}%`,
                fontSize: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                bottom: '-40px'
              }}
            >
              {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💖' : '🐾'}
            </div>
          );
        })}
      </div>

      {/* Top Floating Utility Bar */}
      <header className="absolute top-4 sm:top-6 left-4 right-4 flex items-center justify-between z-30 max-w-2xl mx-auto pointer-events-auto">
        {/* Dedicated for Malika Badge */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-rose-700 text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full shadow-sm border border-rose-200">
          <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Faqat Malika uchun maxsus</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* GitHub Pages Help Button */}
          <button
            onClick={() => setShowGithubModal(true)}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-sm border border-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="GitHub Pages-da oq ekranni to'g'irlash bo'yicha ko'rsatma"
          >
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>GitHub Pages 🚀</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              soundFX.playPop();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/80 hover:bg-white text-rose-700 border border-rose-200 shadow-sm flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title={soundEnabled ? 'Ovozni o\'chirish' : 'Ovozni yoqish'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-rose-500" />
                <span className="hidden sm:inline">Ovoz: Yoqilgan</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline text-slate-500">Ovoz: O'chiq</span>
              </>
            )}
          </button>

          {/* Vanilla HTML/JS Code View Button */}
          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-md shadow-rose-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="HTML / CSS / JS kodlarini ko'rish va yuklab olish"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Vanilla Kod</span>
          </button>
        </div>
      </header>

      {/* Main Romantic Card */}
      <main className="relative z-10 w-full max-w-[460px] bg-white/95 backdrop-blur-md rounded-[36px] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(244,63,94,0.22)] border border-white text-center transition-all duration-300">
        
        {/* Adorable Cat GIF / Image Container */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 rounded-3xl overflow-hidden shadow-lg shadow-rose-500/15 border-4 border-white bg-rose-50 group">
          {!imageError ? (
            <img
              src={currentImage}
              alt="Cute kitten asking with love"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Cute Animated SVG Fallback if network drops
            <div className="w-full h-full flex flex-col items-center justify-center bg-rose-100 text-rose-500 p-4">
              <div className="relative">
                <Cat className="w-24 h-24 text-rose-500 stroke-[1.5]" />
                <Heart className="w-8 h-8 fill-rose-500 text-rose-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <p className="text-xs font-bold mt-2 text-rose-700">Miyov! 🐾</p>
            </div>
          )}

          {/* Cute Cat Mood Status Badge */}
          <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-extrabold text-rose-600 shadow-sm border border-rose-100 flex items-center gap-1">
            <span>{statusBadge}</span>
          </div>
        </div>

        {/* Dynamic Titles */}
        <div className="space-y-1.5 mb-8">
          <h1 className="font-['Fredoka',cursive] text-3xl sm:text-4xl font-bold text-rose-950 tracking-tight leading-tight">
            {isAccepted ? (
              <span>I knew it! You're mine now, Malika 😻</span>
            ) : (
              <span>Malika, will you be mine? 💕</span>
            )}
          </h1>
          <p className="text-rose-700/85 font-semibold text-sm sm:text-base min-h-[24px]">
            {isAccepted 
              ? 'purr-fect decision, malikam. 🐾✨' 
              : 'asked by a very small, very serious cat'}
          </p>
        </div>

        {/* Action Button Stage */}
        <div className="relative min-h-[96px] flex items-center justify-center">
          {!isAccepted ? (
            <div className="flex items-center justify-center gap-4 flex-wrap relative">
              {/* YES BUTTON (Grows with every "No" press!) */}
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${currentScale})`,
                  zIndex: 20,
                  transformOrigin: 'center center',
                }}
                className={`font-['Fredoka',sans-serif] font-semibold text-lg sm:text-xl text-white px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-lg shadow-rose-500/45 hover:shadow-rose-500/70 hover:brightness-105 active:scale-95 transition-[transform,box-shadow,background-color] duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer select-none whitespace-nowrap ${
                  noCount >= 3 ? 'animate-pulse-glow' : ''
                }`}
              >
                <span>Yes 💕</span>
                {noCount >= 4 && <Sparkles className="w-5 h-5 text-amber-200 inline" />}
              </button>

              {/* NO BUTTON (Changes text, shrinks, dodges mouse) */}
              <button
                onClick={handleNo}
                onMouseEnter={handleNoHover}
                style={{
                  transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px) scale(${
                    Math.max(0.65, 1 - noCount * 0.04)
                  })`,
                  transition: noCount >= 5 ? 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'all 0.2s ease',
                  zIndex: 10,
                }}
                className="font-bold text-sm sm:text-base text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-6 py-3 rounded-full cursor-pointer select-none whitespace-nowrap active:scale-90 shadow-sm"
              >
                {currentNoText}
              </button>
            </div>
          ) : (
            /* ACCEPTED STATE: Joyful Celebration */
            <div className="space-y-4 animate-gentle-bounce">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-200 px-5 py-2.5 rounded-full font-bold text-base shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Happy ever after! Forever yours, Malika 🐾💖</span>
              </div>
            </div>
          )}
        </div>

        {/* Ask Me Again Button (Only appears after Yes) */}
        {isAccepted && (
          <div className="mt-6 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-dashed border-rose-400 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ask me again 🔄</span>
            </button>
          </div>
        )}

        {/* Friendly Hint when "No" is clicked repeatedly */}
        {!isAccepted && noCount > 0 && (
          <p className="mt-6 text-xs font-bold text-rose-400 transition-opacity">
            {noCount === 1 && "💡 Malika, birinchi qadam: yaxshilab o'ylab ko'ring..."}
            {noCount === 2 && "😿 Mushukcha sizdan xafa bo'lyapti..."}
            {noCount === 3 && "💔 Kichkina yurak parchalanyapti..."}
            {noCount >= 4 && noCount < 7 && "💖 'Yes' tugmasi boshqa tanlov qoldirmayapti!"}
            {noCount >= 7 && "😻 Malika, taqdiringiz aniq — faqat 'Yes'!"}
          </p>
        )}
      </main>

      {/* Footer watermark & instructions */}
      <footer className="relative z-10 mt-6 text-center text-xs font-semibold text-rose-900/60 flex items-center justify-center gap-2 flex-wrap">
        <span>Yurakdan muhabbat bilan yaratilgan 🐾</span>
        <span>•</span>
        <button
          onClick={() => setShowGithubModal(true)}
          className="underline hover:text-rose-700 cursor-pointer font-bold text-rose-600"
        >
          GitHub Pages Oq Ekran Yechimi 🚀
        </button>
        <span>•</span>
        <button
          onClick={() => setShowCodeModal(true)}
          className="underline hover:text-rose-700 cursor-pointer"
        >
          Vanilla HTML/CSS/JS Kod
        </button>
      </footer>

      {/* GITHUB PAGES BLANK SCREEN FIX MODAL */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-rose-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-rose-500 text-white shadow-md shadow-rose-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Fredoka',sans-serif] font-bold text-slate-800 text-lg">
                    GitHub Pages Oq Ekranini Tuzatish 🛠️
                  </h3>
                  <p className="text-xs text-rose-600 font-semibold">
                    Saytingiz 1 daqiqada oq ekransiz ishlaydi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGithubModal(false)}
                className="p-2 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700">
              {/* Sababi */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-amber-900 text-sm">Nega oq ekran chiqqan edi?</h4>
                  <p className="text-amber-800 text-xs leading-relaxed">
                    1. <strong>Asosiy sabab:</strong> Vite loyihasida fayllar yo'li (assets path) nisbiy qilinmagan bo'ladi (biz hozir <code>vite.config.ts</code> da <code>base: './'</code> qilib to'g'irlab qo'ydik).<br />
                    2. Yoki GitHub repoga <code>.tsx</code> fayllar to'g'ridan-to'g'ri yuklanganda brauzer uni o'qiy olmaydi.
                  </p>
                </div>
              </div>

              {/* Yechim 1 */}
              <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    1-usul: Eng oson va tezkor (30 soniya)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hech qanday Node.js yoki build qilish shart emas! Quyidagi tugma orqali tayyor mustaqil <strong>index.html</strong> faylini yuklab oling va GitHub repongizga shunchaki yuklang:
                </p>
                <button
                  onClick={() => handleDownloadCode('index.html')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-md shadow-rose-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>GitHub Pages uchun index.html ni yuklab olish</span>
                </button>
                <div className="text-[11px] text-slate-500 space-y-1 pl-1">
                  <p>1. GitHub-da yangi repository oching (yoki mavjudiga kiring).</p>
                  <p>2. Yuklab olingan <strong>index.html</strong> faylini yuklang (Upload files).</p>
                  <p>3. <strong>Settings ➔ Pages ➔ Branch: main / root</strong> tanlang va <strong>Save</strong> bosing. Bo'ldi, sayt tayyor!</p>
                </div>
              </div>

              {/* Yechim 2 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    2-usul: Butun Vite loyihasini GitHub Actions orqali deploy qilish
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Loyiha ichiga allaqachon avtomatik deploy qiluvchi <code>.github/workflows/deploy.yml</code> va <code>vite.config.ts</code> da <code>base: './'</code> kiritildi.
                </p>
                <div className="text-[11px] text-slate-500 space-y-1 pl-1">
                  <p>• GitHub-da: <strong>Settings ➔ Pages ➔ Build and deployment: GitHub Actions</strong> ni tanlasangiz, loyihangiz avtomatik build bo'lib xatosiz ishlaydi.</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-white flex justify-end">
              <button
                onClick={() => setShowGithubModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Tushundim, rahmat!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CODE VIEW & EXPORT MODAL */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-rose-100 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between bg-rose-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500 text-white">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Fredoka',sans-serif] font-bold text-slate-800 text-lg">
                    Mustaqil Vanilla HTML/CSS/JS Kodi
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bitta <code className="bg-rose-100 text-rose-700 px-1 py-0.5 rounded">index.html</code> faylida to'liq ishlaydi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="p-2 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Actions */}
            <div className="px-5 py-3 bg-slate-50 flex items-center justify-between border-b border-slate-200">
              <span className="text-xs font-bold text-slate-600">
                HTML + CSS + Vanilla JS (100% tayyor)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm transition-all active:scale-95"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-extrabold">Nusxalandi!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Koddan nusxa olish</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadCode('index.html')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>index.html yuklab olish</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-200 select-text leading-relaxed">
              <pre className="whitespace-pre">{standaloneHtmlCode}</pre>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-white flex justify-end">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
