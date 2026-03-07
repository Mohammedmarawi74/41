import React from 'react';
import { SlideData } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface SlideSelectorProps {
  slides: SlideData[];
  currentSlideId: string;
  setCurrentSlideId: (id: string) => void;
  addSlide: () => void;
  deleteSlide: (id: string) => void;
}

const SlideSelector: React.FC<SlideSelectorProps> = ({
  slides,
  currentSlideId,
  setCurrentSlideId,
  addSlide,
  deleteSlide,
}) => {
  return (
    <div className="slide-selector">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide-thumb ${
            slide.id === currentSlideId
              ? 'slide-thumb-active'
              : 'slide-thumb-inactive'
          }`}
          onClick={() => setCurrentSlideId(slide.id)}
        >
          <div className="slide-thumb-label">
             {slide.number}
          </div>
          <div className="slide-thumb-index">
            {index + 1}
          </div>
          
          {slides.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSlide(slide.id);
              }}
              className="delete-slide-btn"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addSlide}
        className="add-slide-btn"
      >
        <Plus size={24} />
        <span className="text-xs">إضافة</span>
      </button>
    </div>
  );
};

export default SlideSelector;
