import React, { useState, useEffect } from 'react';
import { CalendarDate, LoadingState } from '../types';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

interface PaperCardProps {
  currentDate: CalendarDate;
  imageUrl: string;
  loadingState: LoadingState;
  onRetry: () => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ currentDate, imageUrl, loadingState, onRetry }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when date changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentDate]);

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      {/* Binding Mechanism */}
      <div className="absolute -top-6 left-0 w-full flex justify-evenly z-20 px-8">
        {[1, 2].map((i) => (
          <div key={i} className="relative group">
            {/* Ring hole */}
            <div className="w-4 h-4 rounded-full bg-gray-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border-b border-gray-600/50 relative top-6 z-0"></div>
            {/* Metal Ring */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-lg z-30 ring-1 ring-gray-400/50"></div>
          </div>
        ))}
      </div>

      {/* Main Paper Board */}
      <div className="relative bg-[#fdfbf7] rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2),0_2px_10px_rgba(0,0,0,0.1)] overflow-hidden min-h-[600px] flex flex-col transform transition-all duration-300">
        
        {/* Perforated Top */}
        <div className="h-12 bg-[#fdfbf7] border-b-2 border-dashed border-gray-200 w-full relative z-10"></div>

        {/* Content Area */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
          
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

          {loadingState === LoadingState.LOADING && (
            <div className="flex flex-col items-center justify-center space-y-4 text-gray-400 animate-pulse">
              <Loader2 className="w-10 h-10 animate-spin" />
              <span className="text-sm tracking-widest uppercase font-medium">Loading Wisdom...</span>
            </div>
          )}

          {loadingState === LoadingState.ERROR && (
            <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
              <AlertCircle className="w-12 h-12 text-gray-300" />
              <p className="text-center font-serif text-gray-600 max-w-[200px]">
                Even the calendar needs a rest sometimes. No page found for this date.
              </p>
              <button 
                onClick={onRetry}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {loadingState === LoadingState.SUCCESS && (
             <div className="w-full h-full flex flex-col">
               {/* Date Header - Only visible if image doesn't load fully or for aesthetic balance, 
                   but usually Owspace images include the date. We'll hide this to keep it pure 
                   unless you want a hybrid approach. Let's keep it pure image for now. 
               */}
               
               <img 
                 src={imageUrl} 
                 alt={`One Way Calendar ${currentDate.year}-${currentDate.month}-${currentDate.day}`}
                 className="w-full h-auto object-contain mix-blend-multiply filter contrast-[1.05] drop-shadow-sm"
                 draggable={false}
               />
             </div>
          )}
        </div>

        {/* Bottom Metadata / Footer */}
        <div className="h-12 flex items-center justify-center text-gray-300 text-xs tracking-[0.2em] font-light border-t border-gray-100/50">
           OWSPACE {currentDate.year}
        </div>
      </div>

      {/* Stacked Paper Effect (Pages behind) */}
      <div className="absolute top-2 left-1 right-1 h-full bg-white rounded-sm shadow-sm -z-10 rotate-[0.5deg]"></div>
      <div className="absolute top-3 left-2 right-2 h-full bg-white rounded-sm shadow-sm -z-20 rotate-[-0.5deg]"></div>
    </div>
  );
};

export default PaperCard;
