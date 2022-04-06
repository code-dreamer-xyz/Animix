import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import toast from 'react-hot-toast'

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()

export const firestore = getFirestore(app)

export const storage = getStorage(app)

export const commentToJSON = (doc) => {
    const data = doc.data()
    return {
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
    }
}

export const sign_Out = () => {
    signOut(auth)
        .then(() => {
            toast.success('successfully signed out')
        })
        .catch((err) => {
            toast.error('signing out failed')
        })
}
