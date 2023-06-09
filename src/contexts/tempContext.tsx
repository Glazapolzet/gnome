import {FC,  ReactNode, createContext, useContext, useMemo, useState} from "react";

interface TempContextProps {
    firstTimePopupShown: boolean,
    setFirstTimePopupShown: (val: boolean) => void,
}

const TempContext = createContext<TempContextProps>({firstTimePopupShown: false, setFirstTimePopupShown: () => {}});

interface TempContextProviderProps {
    children: ReactNode
}

// create context provider
export const TempProvider: FC<TempContextProviderProps> = ({ children }) => {
    const [firstTimePopupShown, setFirstTimePopupShown] = useState(false);

    const value = useMemo(
        () =>{ return {firstTimePopupShown, setFirstTimePopupShown} },
        [firstTimePopupShown]
    )

    return (
        <TempContext.Provider value={value}> 
            {children}
        </TempContext.Provider>
    )
}

export const useTemp = (): [boolean, (val: boolean) => void]  => {
    const ctx = useContext(TempContext)
    return [
        ctx.firstTimePopupShown,
        ctx.setFirstTimePopupShown
    ]
}



