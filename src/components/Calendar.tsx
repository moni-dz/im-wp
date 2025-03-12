import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [notes, setNotes] = useState<{[key: string]: string}>({});
  const [noteInput, setNoteInput] = useState<string>('');

  // month names and helper functions
  const monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // generate days for the current month help me lord
  const getDaysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (): (Date | null)[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    const days: (Date | null)[] = [];
    
    // adding days
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // day selection and note handling
  const handleDaySelect = (day: Date | null) => {
    if (day) {
      setSelectedDay(day);
      const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
      setNoteInput(notes[key] || '');
    }
  };

  const handleSaveNote = () => {
    if (selectedDay) {
      const key = `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, '0')}-${String(selectedDay.getDate()).padStart(2, '0')}`;
      setNotes(prev => ({
        ...prev,
        [key]: noteInput
      }));
    }
  };

  // check if a date is today
  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  };

  // format date for display
  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="flex border border:blue-950 max-w-4xl mx-auto bg-white shadow-lg rounded-lg  overflow-hidden">
      <div className="w-2/3">
        {/* Month Navigation */}
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <button 
            onClick={handlePrevMonth} 
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <ChevronLeftIcon className="h-6 w-6  text-blue-950" />
          </button>
          <h2 className="text-xl font-geoformHeavy text-blue-950 font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={handleNextMonth} 
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <ChevronRightIcon className="h-6 w-6  text-blue-950" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 p-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold text-sm  text-blue-950">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDaySelect(day)}
              className={`
                p-2 rounded-lg 
                ${day ? 'hover:bg-gray-100' : ''}
                ${day && isToday(day) ? 'bg-white border border-blue-950 text-blue-950' : ''}
                ${selectedDay && day && 
                  selectedDay.getFullYear() === day.getFullYear() &&
                  selectedDay.getMonth() === day.getMonth() &&
                  selectedDay.getDate() === day.getDate()
                  ? 'bg-blue-950 text-white' : ''}
                ${!day ? 'opacity-0' : ''}
              `}
              disabled={!day}
            >
              {day ? day.getDate() : ''}
            </button>
          ))}
        </div>

        {/* Notes Section */}
        {selectedDay && (
          <div className="p-4 bg-gray-50">
            <h3 className="text-blue-950 text-lg font-geoformHeavy font-semibold mb-2">
              Notes for {formatDate(selectedDay)}
            </h3>
            <textarea
              className="w-full p-2 border rounded-lg "
              rows={4}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Enter your notes here..."
            />
            <button 
              onClick={handleSaveNote}
              className="mt-2 px-4 font-geoformHeavy py-2 bg-blue-950 text-white rounded-lg hover:bg-white border hover:border-blue-950 hover:text-blue-950"
            >
              Save Note
            </button>
          </div>
        )}
      </div>

      {/* Saved Notes Section */}
      <div className="w-1/3 p-4 bg-gray-100 border-l">
        <h3 className="text-xl font-semibold font-geoformHeavy mb-4 text-blue-950">Saved Notes</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {Object.entries(notes).length > 0 ? (
            Object.entries(notes).map(([dateKey, noteContent]) => (
              <div key={dateKey} className="bg-white p-3 rounded-lg  shadow-sm">
                <div className="font-semibold text-blue-950 mb-2">{dateKey}</div>
                <p className="text-gray-700">{noteContent}</p>
              </div>
            ))
          ) : (
            <p className="text-blue-950 font-geoformHeavy text-center">No saved notes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;