import {FC, ReactNode, createContext, useContext, useMemo, useState} from "react";

interface GlobalContextProps {
    firstTimePopupShown: boolean,
    setFirstTimePopupShown: (val: boolean) => void,
}

interface GlobalContextProviderProps {
  children: ReactNode
}

const GlobalContext = createContext<GlobalContextProps>({firstTimePopupShown: false, setFirstTimePopupShown: () => {}});

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

export const useGlobal = (): [boolean, (val: boolean) => void]  => {
    const {firstTimePopupShown, setFirstTimePopupShown} = useContext(GlobalContext)
    return [
        firstTimePopupShown,
        setFirstTimePopupShown
    ]
}



