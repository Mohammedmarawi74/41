import React, { useRef } from 'react';
import { SlideData, ThemeConfig, TabView } from '../types';
import { Layers, Palette, Code, Upload, Image as ImageIcon, Type, Eye, EyeOff } from 'lucide-react';

interface EditorSidebarProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  currentSlide: SlideData;
  updateCurrentSlide: (updates: Partial<SlideData>) => void;
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  customCss: string;
  setCustomCss: (css: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeTab,
  setActiveTab,
  currentSlide,
  updateCurrentSlide,
  theme,
  updateTheme,
  customCss,
  setCustomCss,
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'backgroundImageUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateTheme({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sidebar-container">
      {/* Tabs */}
      <div className="sidebar-tabs">
        <button
          onClick={() => setActiveTab('content')}
          className={`tab-button ${
            activeTab === 'content' ? 'tab-button-active' : 'tab-button-inactive'
          }`}
        >
          <Layers size={18} />
          <span>المحتوى</span>
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`tab-button ${
            activeTab === 'design' ? 'tab-button-active' : 'tab-button-inactive'
          }`}
        >
          <Palette size={18} />
          <span>التصميم</span>
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`tab-button ${
            activeTab === 'css' ? 'tab-button-active' : 'tab-button-inactive'
          }`}
        >
          <Code size={18} />
          <span>CSS</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="sidebar-content">
        
        {activeTab === 'content' && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="field-label field-label-alt">حالة السؤال</label>
                <button
                  onClick={() => updateCurrentSlide({ isOpen: !currentSlide.isOpen })}
                  className={`status-badge ${
                    currentSlide.isOpen ? 'status-badge-active' : 'status-badge-inactive'
                  }`}
                >
                  {currentSlide.isOpen ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{currentSlide.isOpen ? 'مفتوح (إظهار الجواب)' : 'مغلق (سؤال فقط)'}</span>
                </button>
              </div>

              <div>
                <label className="field-label">رقم الشريحة</label>
                <input
                  type="text"
                  value={currentSlide.number}
                  onChange={(e) => updateCurrentSlide({ number: e.target.value })}
                  className="text-input"
                />
              </div>

              <div>
                <label className="field-label">نص السؤال</label>
                <textarea
                  value={currentSlide.question}
                  onChange={(e) => updateCurrentSlide({ question: e.target.value })}
                  rows={3}
                  className="text-area"
                  placeholder="اكتب السؤال هنا..."
                />
              </div>

              {currentSlide.isOpen && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="field-label">نص الجواب</label>
                  <textarea
                    value={currentSlide.answer}
                    onChange={(e) => updateCurrentSlide({ answer: e.target.value })}
                    rows={6}
                    className="text-area"
                    placeholder="اكتب الجواب هنا..."
                  />
                </div>
              )}
            </div>
            
            <div className="divider">
               <label className="field-label">نص التذييل (Footer)</label>
               <input
                  type="text"
                  value={theme.footerText}
                  onChange={(e) => updateTheme({ footerText: e.target.value })}
                  className="text-input"
                />
            </div>
          </>
        )}

        {activeTab === 'design' && (
          <div className="space-y-6">
            
            {/* Logo Selection Library */}
            <div>
              <label className="field-label">اختيار الشعار (Logo Library)</label>
              <div className="logo-library">
                {['logo-1.png', 'logo-2.png', 'logo-3.png', 'logo-4.png'].map((logoName) => {
                  const url = `/logooo/${logoName}`;
                  return (
                    <div 
                      key={logoName}
                      className={`logo-item ${theme.logoUrl === url ? 'active' : ''}`}
                      onClick={() => updateTheme({ logoUrl: url, showLogo: true })}
                    >
                      <img src={url} alt={logoName} />
                    </div>
                  );
                })}
              </div>
              
              { (theme.logoUrl || theme.showLogo) && (
                <button 
                  onClick={() => updateTheme({ logoUrl: null, showLogo: false })}
                  className="remove-logo-btn"
                >
                  إزالة الشعار كلياً (إخفاء)
                </button>
              )}

              <div className="mt-4 flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    checked={theme.showLogo}
                    onChange={(e) => updateTheme({ showLogo: e.target.checked })}
                    className="accent-[#10b981]"
                 />
                 <span className="text-xs text-gray-400">إظهار الشعار في التصميم</span>
              </div>
            </div>

            {/* Background Image Upload */}
            <div>
              <label className="field-label">صورة الخلفية</label>
              <div 
                onClick={() => bgInputRef.current?.click()}
                className="upload-zone"
              >
                {theme.backgroundImageUrl ? (
                   <div className="upload-zone-img">
                     <img src={theme.backgroundImageUrl} alt="BG" className="w-full h-full object-cover" />
                     <div className="upload-zone-overlay">
                       <span className="text-xs">تغيير</span>
                     </div>
                   </div>
                ) : (
                  <>
                    <ImageIcon size={20} className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">ارفع صورة الخلفية</span>
                  </>
                )}
                <input 
                  ref={bgInputRef} 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, 'backgroundImageUrl')} 
                />
              </div>
              {theme.backgroundImageUrl && (
                <button 
                  onClick={() => updateTheme({ backgroundImageUrl: null })}
                  className="text-xs text-red-400 mt-2 hover:text-red-300"
                >
                  إزالة الخلفية
                </button>
              )}
            </div>

            {/* Colors */}
            <div className="control-group divider">
              <div>
                <label className="field-label">اللون الأساسي (أخضر)</label>
                <div className="color-picker-row">
                  <div className="color-preview" style={{backgroundColor: theme.primaryColor}}></div>
                  <input 
                    type="color" 
                    value={theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="native-color-input"
                  />
                </div>
              </div>
              
              <div>
                <label className="field-label">لون الخلفية (Dark)</label>
                <div className="color-picker-row">
                  <div className="color-preview" style={{backgroundColor: theme.backgroundColor}}></div>
                  <input 
                    type="color" 
                    value={theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="native-color-input"
                  />
                </div>
              </div>

               <div>
                <label className="field-label">لون النص</label>
                <div className="color-picker-row">
                  <div className="color-preview" style={{backgroundColor: theme.textColor}}></div>
                  <input 
                    type="color" 
                    value={theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    className="native-color-input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'css' && (
          <div className="h-full flex flex-col">
            <p className="vision-text mb-2">
              اكتب CSS مخصص للتحكم الكامل في العناصر. الفئات المتاحة: 
              <span className="font-mono text-[#10b981] mx-1">.card-container</span>,
              <span className="font-mono text-[#10b981] mx-1">.question-text</span>,
              <span className="font-mono text-[#10b981] mx-1">.answer-box</span>
            </p>
            <textarea
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              className="text-area flex-1 font-mono text-sm leading-relaxed"
              spellCheck={false}
              placeholder=".card-container { ... }"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorSidebar;
