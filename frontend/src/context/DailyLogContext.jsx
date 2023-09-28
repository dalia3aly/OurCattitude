import React, { createContext, useState, useContext } from 'react';

const DailyLogContext = createContext();

export const useDailyLog = () => {
  return useContext(DailyLogContext);
};

export const DailyLogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const filteredLogs = logs.filter(log => log.date === selectedDate);

  const value = {
    logs,
    setLogs,
    selectedDate,
    setSelectedDate,
    filteredLogs,
  };

  return (
    <DailyLogContext.Provider value={value}>
      {children}
    </DailyLogContext.Provider>
  );
};
