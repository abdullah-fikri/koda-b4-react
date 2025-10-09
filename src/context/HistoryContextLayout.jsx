import React, { useEffect, useState } from "react";
import { History } from "./Context";

export const HistoryContextLayout = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error parsing history from localStorage:", err);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const contextValue = {
    history,
    setHistory,
  };

  return <History.Provider value={contextValue}>{children}</History.Provider>;
};
