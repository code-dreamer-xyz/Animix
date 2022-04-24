import Link from 'next/link'

const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null
}

const PostItem = ({ post, admin = false }) => {
  return (
    <div className="max-w-screen-lg px-8 py-4 mx-auto mb-6 bg-primaryDark rounded-lg shadow-md ">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-300">Jan 15, 2022</span>
        <span className="text-white">❤️ {post.heartCount} </span>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.username}/${post.slug}`}>
          <a className="text-lg font-bold  text-white hover:text-gray-200 hover:underline">
            {post.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-50">{post.content}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Link href={`/blog/${post.username}/${post.slug}`}>
          <a className="text-primary hover:underline">Read more ⟶</a>
        </Link>
        <div className="flex items-center">
          <Link href={`/blog/${post.username}`}>
            <a className="font-bold text-gray-200 cursor-pointer dark:text-gray-200">
              By @{post.username}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostFeed
