import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { UserContext } from '../../lib/context'
import { auth, firestore, serverTimestamp } from '../../lib/firebase'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const AddComment = ({ movie_id }) => {
  const { user, userProfile } = useContext(UserContext)
  const [content, setContent] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const uid = auth.currentUser.uid
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('comments')
      .doc()

    const data = {
      id: ref.id,
      content,
      movie_id,
      user_id: uid,
      user_img: userProfile.photoURL,
      createdAt: serverTimestamp(),
    }

    setContent('')

    try {
      await ref.set(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex space-x-4 mb-6">
      {user && (
        <>
          <Avatar img={user.photoURL} />
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Add a Comment"
              className="bg-transparent border-b-2 border-gray-600 py- px-2 text-white"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </form>
        </>
      )}
      {!user && (
        <Button>
          <Link href="/login">
            <a>Login To Comment</a>
          </Link>
        </Button>
      )}
    </div>
  )
}

export default AddComment
