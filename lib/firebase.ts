import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import toast from 'react-hot-toast'

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_MSG_SENDER_ID}`,
    appId: `${process.env.FIREBASE_APP_ID}`,
}

let app
if (!getApps().length) {
    app = initializeApp(firebaseConfig)
}

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
