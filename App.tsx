import React, { useState, useCallback, useEffect } from 'react';
import { getCalendarDate, isValidDate } from './utils/dateUtils';
import PaperCard from './components/PaperCard';
import Controls from './components/Controls';
import { useOneWayUrl } from './hooks/useOneWayUrl';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { imageUrl, loadingState, retry } = useOneWayUrl(currentDate);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevDay();
      if (e.key === 'ArrowRight') handleNextDay();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentDate]);

  const handlePrevDay = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  }, []);

  const handleNextDay = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  }, []);

  const handleToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (isValidDate(newDate)) {
      setCurrentDate(newDate);
    }
  }, []);

  // Format date for the input field (YYYY-MM-DD)
  const dateStr = currentDate.toISOString().split('T')[0];
  const isToday = new Date().toDateString() === currentDate.toDateString();

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-800 flex flex-col overflow-hidden relative selection:bg-gray-300">
      
      {/* Background Aesthetic - Subtle noise or gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-200 to-[#f3f4f6]"></div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 text-center">
        <h1 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase">
          One Way
        </h1>
        <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-1">
          Calendar
        </p>
      </header>

      {/* Main Card Area */}
      <main className="relative z-10 flex-1 flex items-start justify-center pt-6 pb-32 px-4 overflow-y-auto no-scrollbar">
        <PaperCard 
          currentDate={getCalendarDate(currentDate)}
          imageUrl={imageUrl}
          loadingState={loadingState}
          onRetry={retry}
        />
      </main>

      {/* Controls */}
      <Controls 
        onPrev={handlePrevDay}
        onNext={handleNextDay}
        onToday={handleToday}
        onDateChange={handleDateChange}
        currentDateStr={dateStr}
        isToday={isToday}
      />

    </div>
  );
};

export default App;
