import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import toast from 'react-hot-toast'

const firebaseConfig = {
  apiKey: 'AIzaSyBpoXymNPxZn-Fzs9UO2yyf-eKC5ZXaUKw',
  authDomain: 'orcanime-a918a.firebaseapp.com',
  projectId: 'orcanime-a918a',
  storageBucket: 'orcanime-a918a.appspot.com',
  messagingSenderId: '445462942565',
  appId: '1:445462942565:web:63489cf44a68b38beb478c',
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

export async function getUserWithUsername(username) {
  const userQuery = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  )
  const userDoc = (await getDocs(userQuery)).docs[0]
  return userDoc
}

export function postToJSON(doc) {
  const data = doc.data()

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
}
