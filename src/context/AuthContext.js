import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within AuthProvider')
	return context
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
			if (firebaseUser) {
				const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
				const userData = userDoc.data()

				setUser({
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					...userData,
				})
				setIsAuthenticated(true)
				setIsAdmin(userData?.role === 'admin')
			} else {
				setUser(null)
				setIsAuthenticated(false)
				setIsAdmin(false)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	const register = async (email, password, userData) => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		)
		const user = userCredential.user

		await setDoc(doc(db, 'users', user.uid), {
			...userData,
			email,
			role: 'user',
			createdAt: new Date().toISOString(),
		})

		return user
	}

	const login = async (email, password) => {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		)

		// Сразу проверяем роль после входа
		const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
		const userData = userDoc.data()

		return userData?.role === 'admin'
	}

	const logout = async () => {
		await signOut(auth)
	}

	const updateUser = async userData => {
		const userRef = doc(db, 'users', user.uid)
		await setDoc(userRef, { ...userData }, { merge: true })
		setUser({ ...user, ...userData })
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isAdmin,
				loading,
				register,
				login,
				logout,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
