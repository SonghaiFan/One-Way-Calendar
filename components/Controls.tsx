import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';

interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentDateStr: string; // YYYY-MM-DD for input
  isToday: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  onPrev, 
  onNext, 
  onToday, 
  onDateChange, 
  currentDateStr,
  isToday
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 pb-6 sm:pb-4 z-50 transition-all duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* Left Arrow */}
        <button 
          onClick={onPrev}
          className="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors active:scale-95"
          aria-label="Previous Day"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <input 
              type="date" 
              value={currentDateStr}
              onChange={onDateChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 group-hover:bg-gray-100 transition-colors shadow-sm">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="serif tracking-wide">{currentDateStr}</span>
            </button>
          </div>

          {!isToday && (
            <button 
              onClick={onToday}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
              title="Return to Today"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={onNext}
          className="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors active:scale-95"
          aria-label="Next Day"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Controls;
