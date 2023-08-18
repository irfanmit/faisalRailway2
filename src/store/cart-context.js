import { createContext } from "react";

export const UserContext = createContext(null);
export const InputContext = createContext(null);
export const startEndContext = createContext(null)
export const trackContext = createContext(null);
export const dataContext = createContext(null);
export const authContext = createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=>{

    },
    logout: () => {

    }
})