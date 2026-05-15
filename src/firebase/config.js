import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCMLffTSCx78-M1dDQLE0kWSYCeI87hD_E',
	authDomain: 'clearbreathd.firebaseapp.com',
	projectId: 'clearbreathd',
	storageBucket: 'clearbreathd.firebasestorage.app',
	messagingSenderId: '1065676489898',
	appId: '1:1065676489898:web:dde3b10d39dc1f8746fcd3',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
