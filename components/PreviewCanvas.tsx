import React, { forwardRef } from 'react';
import { SlideData, ThemeConfig } from '../types';
import { Plus, Minus, Radar } from 'lucide-react';

interface PreviewCanvasProps {
  slide: SlideData;
  theme: ThemeConfig;
  customCss: string;
}

// Fixed dimensions for a standard Instagram/LinkedIn Portrait (4:5) or Square (1:1)
// Let's use 1080x1080 for square carousel or 1080x1350 for portrait.
// To fit on screen, we scale it down via CSS transform but render at high res.
// Using 1080x1080 (1:1) as per standard carousels.

const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(({ slide, theme, customCss }, ref) => {

  return (
    <div className="canvas-preview-wrapper">
      {/* 
         This wrapper handles the responsive scaling of the preview on screen. 
         The internal div is the actual 1080x1080 canvas.
      */}
      <div
        className="canvas-shadow-box"
        style={{
          width: '600px', // Display size
          height: '600px', // Display size
        }}
      >
        <div
          ref={ref}
          className="canvas-actual card-container"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            transform: 'scale(0.5555)', // Scale 1080 -> 600
            transformOrigin: 'top left',
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
          }}
        >
          {/* Inject Custom CSS Scoped to this container */}
          <style>{customCss}</style>

          {/* Background Image Layer */}
          {theme.backgroundImageUrl && (
            <div
              className="bg-layer"
              style={{ backgroundImage: `url(${theme.backgroundImageUrl})` }}
            />
          )}

          {/* Content Layer */}
          <div className="content-layer" style={{ paddingBottom: '140px' }}>

            {/* Header: Logo & Number */}
            <div className="canvas-header">
              <div className="canvas-logo-group">
                {theme.showLogo && theme.logoUrl && (
                  <img
                    src={theme.logoUrl}
                    alt="Logo"
                    style={{ height: '80px', width: 'auto', maxWidth: '280px', objectFit: 'contain', display: 'block' }}
                  />
                )}
              </div>
              <div
                className="canvas-slide-number"
                style={{ color: theme.primaryColor }}
              >
                {slide.number}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="canvas-main-area">

              {/* Question Card */}
              <div
                className="question-box group"
                style={{
                  borderColor: slide.isOpen ? theme.primaryColor : 'rgba(255,255,255,0.1)',
                  backgroundColor: slide.isOpen ? 'rgba(16, 185, 129, 0.05)' : 'transparent'
                }}
              >
                <div className="question-header">
                  <h1
                    className="question-text-content question-text"
                    style={{ color: slide.isOpen ? theme.primaryColor : theme.textColor }}
                  >
                    {slide.question}
                  </h1>

                  {/* Toggle Icon Visual */}
                  <div
                    className="toggle-icon-visual"
                    style={{
                      borderColor: theme.primaryColor,
                      backgroundColor: slide.isOpen ? theme.primaryColor : 'transparent',
                      color: slide.isOpen ? '#000' : theme.primaryColor
                    }}
                  >
                    {slide.isOpen ? <Minus size={40} strokeWidth={3} /> : <Plus size={40} strokeWidth={3} />}
                  </div>
                </div>

                {/* Answer Area (Conditionally Rendered based on isOpen) */}
                {slide.isOpen && (
                  <div className="answer-area answer-box">
                    <p className="answer-text">
                      {slide.answer}
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            {theme.showFooter && (
              <div className="canvas-footer">
                <p className="footer-text">
                  {theme.footerText}
                </p>
                <div className="footer-decor">
                  <div className="decor-dot" style={{ backgroundColor: '#10b981' }}></div>
                  <div className="decor-dot" style={{ backgroundColor: '#374151' }}></div>
                  <div className="decor-dot" style={{ backgroundColor: '#374151' }}></div>
                </div>
              </div>
            )}

          </div>

          {/* Premium Footer Bar (5px height) */}
          <div className="premium-footer">
            <span className="premium-footer-text" style={{ direction: 'ltr' }}>منصة المستثمر الاقتصادية</span>
            <span className="premium-footer-text" style={{ direction: 'rtl' }}>al-investor.com</span>
          </div>

          {/* Subtle Grain Overlay for texture */}
          <div className="grain-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default PreviewCanvas;
