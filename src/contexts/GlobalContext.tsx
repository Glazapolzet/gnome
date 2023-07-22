import {FC, ReactNode, createContext, useMemo, useState} from "react";

interface GlobalContextProps {
  firstTimePopupShown: boolean,
  setFirstTimePopupShown: (val: boolean) => void,
}

interface GlobalContextProviderProps {
  children: ReactNode
}

export const GlobalContext = createContext<GlobalContextProps>({firstTimePopupShown: false, setFirstTimePopupShown: () => {}});

export const GlobalContextProvider: FC<GlobalContextProviderProps> = ({ children }) => {
    const [firstTimePopupShown, setFirstTimePopupShown] = useState(false);

    const value = useMemo(
        () => ({firstTimePopupShown, setFirstTimePopupShown}),
        [firstTimePopupShown]
    )

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}




