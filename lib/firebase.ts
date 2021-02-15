import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBpoXymNPxZn-Fzs9UO2yyf-eKC5ZXaUKw',
    authDomain: 'orcanime-a918a.firebaseapp.com',
    projectId: 'orcanime-a918a',
    storageBucket: 'orcanime-a918a.appspot.com',
    messagingSenderId: '445462942565',
    appId: '1:445462942565:web:63489cf44a68b38beb478c',
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

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
