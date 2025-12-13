import React, { createContext, useState } from "react";

export const SelectedSlotContext = createContext();

export const SelectedSlotProvider = ({ children }) => {
  const [selectedTheater, setSelectedTheater] = useState({
    name: "",
    price: 0,
    slot: "",
  });

  // 👇 provide an OBJECT (not an array)
  return (
    <SelectedSlotContext.Provider
      value={{ selectedTheater, setSelectedTheater }}
    >
      {children}
    </SelectedSlotContext.Provider>
  );
};
