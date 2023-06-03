import {createContext} from "react";

// Можно делать не просто контексты, а делать для них хуки и провайдеры
// Например так:

// const MyContext = React.createContext()

// function useMy() {
//   const context = React.useContext(MyContext)
//   if (!context) {
//     throw new Error(`useMyContext must be used within a MyProvider`)
//   }
//   return context
// }

// function MyProvider(props) {
//  const [count, setCount] = React.useState(0)
//  const value = React.useMemo(() => [count, setCount], [count])
//  return <MyProvider.Provider value={value} {...props} />
//   }

// ...
// const [my, setMy] = useMy()


// Переименуй чтобы было понятно что он делает
export const WindowContext = createContext(undefined);