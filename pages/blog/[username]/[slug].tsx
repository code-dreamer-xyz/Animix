import { collectionGroup, doc, getDoc, getDocs } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import PostContent from '../../../components/blog/PostContent'
import {
  auth,
  firestore,
  getUserWithUsername,
  postToJSON,
} from '../../../lib/firebase'

import UserProfile from '../../../components/blog/UserProfile'
import { useRouter } from 'next/router'
import HeartButton from '../../../components/blog/HeartButton'

export async function getStaticProps({ params }) {
  const { username, slug } = params

  const userDoc = await getUserWithUsername(username)

  let post, path

  if (userDoc) {
    const postRef = doc(firestore, 'users', userDoc.ref.id, 'posts', slug)

    post = postToJSON(await getDoc(postRef))

    path = postRef.path
  }

  return {
    props: { post, path },
    revalidate: 5000,
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collectionGroup(firestore, 'posts'))

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

const PostPage = (props) => {
  const postRef = doc(firestore, props.path)

  const [realTimePost] = useDocumentData(postRef)
  const post = realTimePost || props.post
  const router = useRouter()
  const user = { ...auth.currentUser, username: router.query.username }

  return (
    <section className="py-6">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="grid grid-cols-8 gap-8">
          <div className="col-span-6 flex space-x-6 ">
            <div className="flex flex-col items-center space-y-2">
              <HeartButton postRef={postRef} />
              <span className="text-gray-300">{post.heartCount}</span>
            </div>
            <div className="bg-primaryDark w-full rounded shadow-md border border-gray-700 p-4">
              <PostContent post={post} />
            </div>
          </div>
          <div className="col-span-2 bg-secondaryDark rounded p-4 border border-gray-800">
            <UserProfile user={user} />
            <button className="w-full text-white py-2 rounded mt-4 bg-secondary">
              view profile
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostPage
