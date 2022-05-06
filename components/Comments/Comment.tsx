import React, { useContext } from 'react'
import Avatar from '../ui/Avatar'
import TimeAgo from 'timeago-react'
import { UserContext } from '../../lib/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, firestore } from '../../lib/firebase'
import toast from 'react-hot-toast'
import { deleteDoc, doc } from 'firebase/firestore'

const Comment = ({ comment }) => {
  const { user } = useContext(UserContext)
  const onDelClick = async () => {
    const { uid } = auth.currentUser

    try {
      await deleteDoc(doc(firestore, 'users', uid, 'comments', comment.id))
      toast.success('comment deleted ✅')
    } catch (error) {
      toast.error('Failed deleting the comment')
    }
  }

  return (
    <div className="flex space-x-4 mb-6">
      <Avatar img={comment?.user_img} />
      <div className="relative w-72">
        <div className=" flex space-x-2 mb-4 items-center">
          <p className="text-white text-xl font-sans">Zino</p>
          <span className="text-md text-gray-500 font-sans">
            {comment.createdAt && (
              <TimeAgo datetime={comment.createdAt.toDate()} live={false} />
            )}
          </span>
        </div>
        <p className="text-lg text-white font-sans">{comment?.content}</p>
        {user && comment && user?.uid === comment?.uid && (
          <button
            onClick={onDelClick}
            className="hover:text-primary focus:outline-none absolute text-md text-gray-100 top-0 right-0"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Comment
