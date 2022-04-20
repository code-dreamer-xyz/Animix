import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from './firebase'

export function useUserData() {
  const [user] = useAuthState(auth)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    let unsubscribe

    const getUser = async () => {
      if (user) {
        const docSnap = await getDoc(doc(firestore, 'users', user.uid))

        if (docSnap.exists()) {
          unsubscribe = setUserProfile(docSnap.data())
        } else {
          const newUser = {
            photoURL: user.photoURL,
            userName: user.displayName,
          }
          setDoc(docSnap, newUser)
          setUserProfile(newUser)
        }
      } else {
        setUserProfile(null)
      }
    }
    getUser()

    return unsubscribe
  }, [user])

  return { user, userProfile }
}

export async function getUserMovies(uid) {
  const userMovies = []

  const q = query(collection(firestore, 'users', uid, 'user_movies'))

  const moviesData = await getDocs(q)

  moviesData?.forEach((movie) => userMovies.push(movie.data()))

  return userMovies
}

export const moviePurshased = async (id, uid) => {
  const docRef = doc(firestore, 'users', uid, 'user_movies', id)

  const movieSnapshot = await getDoc(docRef)
  if (movieSnapshot.exists()) {
    return true
  } else {
    return false
  }
}
