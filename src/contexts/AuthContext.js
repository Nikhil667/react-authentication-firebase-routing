import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { updateEmail, updatePassword } from "firebase/auth"

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password){
      return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
      return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
      return auth.signOut()
    }

    function resetPassword(email){
      return auth.sendPasswordResetEmail(email)
    }

    function emailChange(email) {
      return updateEmail(currentUser, email)
    }
  
    function passwordChange(password) {
      return updatePassword(currentUser, password)
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false)
      }) 
      return unsubscribe;
    }, [])


    const value = {
        currentUser,
        signUp, 
        login,
        logout,
        resetPassword,
        emailChange,
        passwordChange
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
