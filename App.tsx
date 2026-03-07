import React, { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { Download, Radar, Share2 } from "lucide-react";
import EditorSidebar from "./components/EditorSidebar";
import PreviewCanvas from "./components/PreviewCanvas";
import SlideSelector from "./components/SlideSelector";
import { INITIAL_SLIDES, DEFAULT_THEME, DEFAULT_CSS } from "./constants";
import { SlideData, ThemeConfig, TabView } from "./types";

function App() {
  const [slides, setSlides] = useState<SlideData[]>(INITIAL_SLIDES);
  const [currentSlideId, setCurrentSlideId] = useState<string>(
    INITIAL_SLIDES[0].id,
  );
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [customCss, setCustomCss] = useState<string>(DEFAULT_CSS);
  const [activeTab, setActiveTab] = useState<TabView>("content");
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides.find((s) => s.id === currentSlideId) || slides[0];

  const updateCurrentSlide = (updates: Partial<SlideData>) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === currentSlideId ? { ...s, ...updates } : s)),
    );
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  const addSlide = () => {
    const newId = Date.now().toString();
    const nextNumber = (slides.length + 1).toString().padStart(2, "0");
    const newSlide: SlideData = {
      id: newId,
      number: nextNumber,
      question: "سؤال جديد؟",
      answer: "الإجابة تظهر هنا...",
      isOpen: false,
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideId(newId);
  };

  const deleteSlide = (id: string) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((s) => s.id !== id);
    setSlides(newSlides);
    if (currentSlideId === id) {
      setCurrentSlideId(newSlides[0].id);
    }
  };

  const handleExport = useCallback(async () => {
    if (canvasRef.current === null) {
      return;
    }
    setIsExporting(true);

    try {
      // Small delay to ensure any layout shifts are settled
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 2x makes 1080 -> 2160, super crisp.
        style: {
          transform: "none", // Reset the display scale for the actual export
          transformOrigin: "top left",
        },
        width: 1080,
        height: 1080,
      });

      const link = document.createElement("a");
      link.download = `radar-faq-slide-${currentSlide.number}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      alert("حدث خطأ أثناء تصدير الصورة.");
    } finally {
      setIsExporting(false);
    }
  }, [currentSlide.number]);

  return (
    <div className="app-root">
      {/* Header */}
      <header className="header-bar">
        <div className="logo-container">
          <div className="logo-badge">
            <Radar size={18} />
          </div>
          <h1 className="app-title">رادار المصمم</h1>
          <span className="beta-tag">BETA</span>
        </div>

        <div className="header-actions">
          {/* Simulate a logged in user or status */}
          <div className="vision-text">رؤية 2030</div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`export-button ${
              isExporting ? "export-button-disabled" : "export-button-active"
            }`}
          >
            <Download size={18} />
            <span>{isExporting ? "جاري التصدير..." : "تصدير الصورة"}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="main-layout">
        {/* Editor Sidebar */}
        <EditorSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentSlide={currentSlide}
          updateCurrentSlide={updateCurrentSlide}
          theme={theme}
          updateTheme={updateTheme}
          customCss={customCss}
          setCustomCss={setCustomCss}
        />

        {/* Canvas Area */}
        <div className="canvas-container">
          <div className="preview-pane">
            <PreviewCanvas
              ref={canvasRef}
              slide={currentSlide}
              theme={theme}
              customCss={customCss}
            />
          </div>

          {/* Bottom Bar: Slide Selector */}
          <SlideSelector
            slides={slides}
            currentSlideId={currentSlideId}
            setCurrentSlideId={setCurrentSlideId}
            addSlide={addSlide}
            deleteSlide={deleteSlide}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
