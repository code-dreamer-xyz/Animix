import Link from 'next/link'
import { HeartOutlined } from '@ant-design/icons'
import { slideUpVariants } from '../../helpers/animation'
import { motion } from 'framer-motion'

const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null
}

const PostItem = ({ post, admin = false }) => {
  return (
    <motion.div
      variants={slideUpVariants}
      className="max-w-screen-lg px-8 py-4 mx-auto mb-6 bg-primaryDark rounded-lg shadow-md "
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-300">Jan 15, 2022</span>
        <p className="text-gray-400 flex items-center space-x-1">
          <HeartOutlined /> <span>{post.heartCount}</span>
        </p>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.username}/${post.slug}`}>
          <a className="text-lg font-bold  text-white hover:text-gray-200 hover:underline">
            {post.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-50">{post.content}</p>
      </div>
      <div className="flex items-center justify-between my-4">
        <Link href={`/blog/${post.username}/${post.slug}`}>
          <a className="text-primary hover:underline">Read more ⟶</a>
        </Link>
        <div className="flex items-center space-x-3">
          <Link href={`/blog/${post.username}`}>
            <a className=" font-bold text-gray-200 cursor-pointer hover:text-secondary">
              By @{post.username}
            </a>
          </Link>
          {admin && (
            <button className="bg-white text-black font-bold px-2.5 py-1.5 rounded">
              <Link href={`/blog/admin/${post.slug}`}>
                <a>Edit</a>
              </Link>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PostFeed
