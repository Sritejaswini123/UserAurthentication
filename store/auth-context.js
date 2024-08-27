//Storing and managing user authentication state using React Context involves setting up a global state that can be accessed throughout your app. 
//This is especially useful in scenarios like logging in, logging out, and determining whether a user is authenticated.

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext } from 'react'
import {useState, useEffect} from 'react'

export const AuthContext = createContext({
     isAuthenticated: false,
     authenticate: (token) => {},
     logout: () => {},

})

function AuthContextProvider({children}) {

    const[authToken , setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token)
        AsyncStorage.setItem('token', token)
    }
    function logout() {
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value= {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }
 return <AuthContext.Provider value= {value}>{children}</AuthContext.Provider>
}
export default AuthContextProvider