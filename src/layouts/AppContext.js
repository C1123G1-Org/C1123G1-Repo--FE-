import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [nut1, setNut1] = useState(false);
    const [nut2, setNut2] = useState(false);
    const [nut3, setNut3] = useState(false);
    const [nut4, setNut4] = useState(false);
    const [nut5, setNut5] = useState(false);
    const [nut6, setNut6] = useState(false);
    const [nut7, setNut7] = useState(false);

    return (
        <AppContext.Provider
            value={{
                nut1, nut2, nut3, nut4, nut5, nut6, nut7,
                setNut1, setNut2, setNut3, setNut4, setNut5, setNut6, setNut7
            }}
        >
            {children}
        </AppContext.Provider>
    );
};