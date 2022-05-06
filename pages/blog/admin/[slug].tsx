import { useState } from 'react'
import WithUsername from '../../../components/WithUsername'
import ImageUploader from '../../../components/blog/ImageUploader'
import { firestore, auth } from '../../../lib/firebase'
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import Link from 'next/link'

const AdminEditPost = () => {
  return (
    <section className="py-6">
      <WithUsername>
        <PostManager />
      </WithUsername>
    </section>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false)
  const router = useRouter()
  const slug =
    typeof router?.query?.slug === 'string'
      ? router?.query?.slug
      : router?.query?.slug[0]

  const postRef = doc(firestore, 'users', auth.currentUser.uid, 'posts', slug)
  const [post] = useDocumentDataOnce(postRef)

  return (
    <section className="py-6">
      {post && (
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-3">
              <h2 className="font-sans font-bold text-white mb-4 text-2xl capitalize">
                {post.title}
              </h2>

              <PostForm
                postRef={postRef}
                defaultValues={post}
                preview={preview}
                postContent={post?.content}
              />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-white mb-4">
                Tools:
              </h3>
              <button
                onClick={() => setPreview(!preview)}
                className="bg-primary text-white px-2 py-2 w-full rounded mb-4"
              >
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button className="bg-secondary text-white px-2 py-2 w-full mb-4 rounded">
                <Link href={`/blog/${post.username}/${post.slug}`}>
                  <a>Live view</a>
                </Link>
              </button>
              <DeletePostButton postRef={postRef} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function PostForm({ defaultValues, postRef, preview, postContent }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({ defaultValues, mode: 'onChange' })

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    })

    reset({ content, published })

    toast.success('Post updated successfully!')
  }

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}
      <div>
        <ImageUploader />
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-400"
        >
          Update Content:
        </label>
        <textarea
          name="content"
          {...register('content', {
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' },
          })}
          rows={16}
          className="block p-2.5 w-full my-4 text-sm  rounded-lg border focus:ring-primary focus:border-primary bg-primaryDark border-gray-600 placeholder-gray-300 text-white"
          placeholder={postContent ? postContent : 'Add content...'}
        ></textarea>

        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <fieldset>
          <input name="published" type="checkbox" {...register('published')} />
          <label className="text-white ml-3">Published</label>
        </fieldset>

        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="bg-white text-black px-4 py-2 rounded mt-4 font-bold hover:bg-gray-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

function DeletePostButton({ postRef }) {
  const router = useRouter()

  const deletePost = async () => {
    const doIt = confirm('are you sure!')
    if (doIt) {
      try {
        await deleteDoc(postRef)
        router.push('/admin')
        toast('post deleted ', { icon: '🗑️' })
      } catch (err) {
        toast.error('failed to delete post')
      }
    }
  }

  return (
    <button
      className="bg-red-600 text-white px-2 py-2 w-full rounded"
      onClick={deletePost}
    >
      Delete
    </button>
  )
}

export default AdminEditPost
