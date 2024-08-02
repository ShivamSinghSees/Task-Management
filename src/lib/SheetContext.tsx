"use client";
import React, { createContext, useContext, useState } from "react";

type SheetContextType = {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  return (
    <SheetContext.Provider value={{ isOpen, openSheet, closeSheet }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};
