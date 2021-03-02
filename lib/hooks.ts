import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from './firebase'

export function useUserData() {
    const [user] = useAuthState(auth)
    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        let unsubscribe

        if (user) {
            

            const userRef = firestore.collection('users').doc(user.uid)
            userRef.get().then((snapshot) => {
                if (snapshot.exists) {
                    unsubscribe = userRef.onSnapshot((doc) => {
                        setUserProfile(doc.data())
                    })
                } else {
                    const newUser = {
                        photoURL: user.photoURL,
                        userName: user.displayName,
                    }

                    userRef.set(newUser)

                    setUserProfile(newUser)
                }
            })
        } else {
            setUserProfile(null)
        }

        return unsubscribe
    }, [user])

    return { user, userProfile }
}
