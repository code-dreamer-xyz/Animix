import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  Timestamp,
  startAfter,
} from 'firebase/firestore'
import { useState } from 'react'
import PostFeed from '../../components/blog/PostFeed'
import { firestore, postToJSON } from '../../lib/firebase'

// Max post to query per page
const LIMIT = 1

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  )
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON)

  return {
    props: { posts },
  }
}

const BlogHome = (props) => {
  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
    const lastPost = posts[posts.length - 1]

    const lastPostCursor =
      typeof lastPost.createdAt === 'number'
        ? Timestamp.fromMillis(lastPost.createdAt)
        : lastPost.createdAt

    const newPostsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(lastPostCursor),
      limit(LIMIT)
    )

    const newPosts = (await getDocs(newPostsQuery)).docs.map((doc) =>
      doc.data()
    )

    setPosts(posts.concat(newPosts))
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

  return (
    <section className="py-6">
      <div className="max-w-screen-lg mx-auto px-1">
        <PostFeed posts={posts} admin={false} />

        {!loading && !postsEnd && (
          <button onClick={getMorePosts}>Load more</button>
        )}

        {loading && <p className="text-white">loading..</p>}
        {postsEnd && <p className="text-white">you reached the end</p>}
      </div>
    </section>
  )
}

export default BlogHome
