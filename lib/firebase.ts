import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import toast from 'react-hot-toast'

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export const firestore = firebase.firestore()

export const storage = firebase.storage()

export const commentToJSON = (doc) => {
    const data = doc.data()
    return {
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
    }
}

export const signOut = () => {
    try {
        auth.signOut()
        toast.success('successfully signed out')
    } catch (error) {
        toast.error('signing out failed')
    }
}

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
