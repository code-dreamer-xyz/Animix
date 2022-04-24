// import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post?.createdAt)
      : post?.createdAt.toDate()

  return (
    <div>
      {/* <span className="text-gray-300">{createdAt}</span> */}
      <h1 className="font-bold font-sans text-lg text-white">{post?.title}</h1>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  )
}
