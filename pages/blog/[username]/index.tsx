import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  where,
} from 'firebase/firestore'
import PostFeed from '../../../components/blog/PostFeed'
import UserProfile from '../../../components/blog/UserProfile'
import {
  firestore,
  getUserWithUsername,
  postToJSON,
} from '../../../lib/firebase'
import { query as firebaseQuery } from 'firebase/firestore'

export async function getServerSideProps({ query }) {
  const { username } = query

  const userDoc = await getUserWithUsername(username)

  let user = null
  let posts = null

  if (userDoc) {
    user = userDoc.data()
    const postsQuery = firebaseQuery(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    )
    posts = (await getDocs(postsQuery)).docs.map(postToJSON)
  }

  return {
    props: { user, posts },
  }
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <section className="py-8">
      <UserProfile user={user} />
      <div className="max-w-2xl mx-auto px-1">
        <h2 className="text-white font-sans font-bold text-lg mb-6">
          All Posts:
        </h2>
      </div>
      <PostFeed posts={posts} admin={false} />
    </section>
  )
}

export default UserProfilePage
