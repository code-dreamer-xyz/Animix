// import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post?.createdAt)
      : post?.createdAt.toDate()

  return (
    <div>
      <span className="text-gray-300">{createdAt.toDateString()}</span>
      <h1 className="font-bold font-poppins text-2xl text-white capitalize mb-4">
        {post?.title}
      </h1>
      <ReactMarkdown className="text-gray-300">{post?.content}</ReactMarkdown>
    </div>
  )
}
