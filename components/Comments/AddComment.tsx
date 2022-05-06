import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { UserContext } from '../../lib/context'
import { auth, firestore } from '../../lib/firebase'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const AddComment = ({ movie_id }) => {
  const { user } = useContext(UserContext)
  const [content, setContent] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const uid = auth.currentUser.uid

    const commentRef = doc(collection(firestore, 'users', uid, 'comments'))

    const data = {
      id: commentRef.id,
      content,
      movie_id,
      uid,
      user_img: user?.photoURL,
      createdAt: serverTimestamp(),
    }

    setContent('')

    try {
      await setDoc(commentRef, data)
    } catch (error) {
      toast.error('failed to add comment')
      // console.log(error.message)
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
