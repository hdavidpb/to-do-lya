import React, { createContext, useState } from "react";

export const ModeContext = createContext();

const ModeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  // const now = new Date();
  // const hour = now.getHours();
  // useEffect(() => {
  //   if (hour > 6 && hour <= 17) {
  //     setDayMode(false);
  //   } else {
  //     setDayMode(true);
  //   }
  //   console.log(hour);
  // }, [hour]);

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
