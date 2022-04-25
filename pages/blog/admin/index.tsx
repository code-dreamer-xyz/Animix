import WithUsername from '../../../components/WithUsername'
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { auth, firestore } from '../../../lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import PostFeed from '../../../components/blog/PostFeed'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { UserContext } from '../../../lib/context'
import kebabCase from 'lodash.kebabcase'
import toast from 'react-hot-toast'

const AdminPostsPage = () => {
  return (
    <section className="py-6">
      <WithUsername>
        <div className="max-w-screen-lg mx-auto">
          <PostList />
          <CreateNewPost />
        </div>
      </WithUsername>
    </section>
  )
}

const PostList = () => {
  const userPostsRef = query(
    collection(firestore, 'users', auth?.currentUser?.uid, 'posts'),
    orderBy('createdAt')
  )
  const [userPostsSnapshot] = useCollection(userPostsRef)
  const posts = userPostsSnapshot?.docs.map((doc) => doc.data())

  return (
    <div>
      <h3 className="text-white mb-6 text-xl font-bold capitalize font-sans">
        manage your posts
      </h3>
      <PostFeed posts={posts} admin />
    </div>
  )
}

const CreateNewPost = () => {
  const router = useRouter()
  const { username } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const slug = encodeURI(kebabCase(title))
  const isValidTitle = title.length > 3 && title.length < 100

  const createPost = async (e) => {
    e.preventDefault()
    const uid = auth.currentUser.uid
    const newPostRef = doc(firestore, 'users', uid, 'posts', slug)
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      content: '# new post',
      heartCount: 0,
    }

    try {
      await setDoc(newPostRef, data)
      toast.success('Post craeted!')
      router.push(`/blog/admin/${slug}`)
    } catch (err) {
      toast.error('error while creating post')
      console.log(err)
    }
  }

  return (
    <form className="py-4" onSubmit={createPost}>
      <div className="mb-6">
        <label htmlFor="article" className="block mb-2 font-bold text-gray-300">
          New Article:
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          className="shadow-sm border text-sm rounded focus:ring-primary focus:border-primary block w-full p-3 bg-primaryDark border-gray-600 placeholder-gray-300 text-white shadow-sm-light"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2  rounded"
        disabled={!isValidTitle}
      >
        submit
      </button>
    </form>
  )
}

export default AdminPostsPage
