import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import toast from 'react-hot-toast'

const firebaseConfig = {
    /// add config 
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
