import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { increment, doc, writeBatch, getDoc } from 'firebase/firestore'
import { auth, firestore } from '../../lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import toast from 'react-hot-toast'

const HeartButton = ({ postRef }) => {
  const heartRef = doc(
    firestore,
    `/${postRef.path}/hearts/${auth?.currentUser?.uid}`
  )

  const [heartDoc] = useDocument(heartRef)

  const removeHeart = async () => {
    const batch = writeBatch(firestore)

    batch.update(postRef, { heartCount: increment(-1) })
    batch.delete(heartRef)
    try {
      await batch.commit()
    } catch (err) {
      toast.error('fail to unheart the post')
    }
  }

  const addHeart = async () => {
    const uid = auth?.currentUser?.uid
    const batch = writeBatch(firestore)

    batch.update(postRef, { heartCount: increment(1) })
    batch.set(heartRef, { uid })

    try {
      await batch.commit()
    } catch (err) {
      toast.error('fail to heart the post')
    }
  }

  return (
    <>
      {heartDoc?.exists() && (
        <button onClick={removeHeart}>
          <FontAwesomeIcon
            className="text-xl 
               text-red-600"
            icon={faHeart}
          />
        </button>
      )}
      {!heartDoc?.exists() && (
        <button onClick={addHeart}>
          <FontAwesomeIcon
            className="text-xl 
               text-white"
            icon={faHeart}
          />
        </button>
      )}
    </>
  )
}

export default HeartButton
