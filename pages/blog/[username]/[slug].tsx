import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import PostContent from '../../../components/blog/PostContent'
import {
  firestore,
  getUserWithUsername,
  postToJSON,
} from '../../../lib/firebase'

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

  return (
    <section className="py-6">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="grid grid-cols-5">
          <div className="col-span-4">
            <PostContent post={post} />
          </div>
          <div>hearts</div>
        </div>
      </div>
    </section>
  )
}

export default PostPage
