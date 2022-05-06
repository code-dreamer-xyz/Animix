import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from './firebase'

export function useUserData() {
  const [user] = useAuthState(auth)
  // const [userProfile, setUserProfile] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let unsubscribe

    const getUser = async () => {
      if (user) {
        const docSnap = doc(firestore, 'users', user.uid)
        unsubscribe = onSnapshot(docSnap, (doc) => {
          setUsername(doc.data()?.username)
        })
      } else {
        setUsername(null)
      }
    }
    getUser()

    return unsubscribe
  }, [user])

  return { user, username }
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
