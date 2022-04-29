import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { auth, storage } from '../../lib/firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ImageUploader = () => {
  const [uploading, setUpLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState(null)
  const [copied, setCopied] = useState(false)

  const uploadFile = async (e) => {
    const file = e.target.files[0]
    const extension = file.type.split('/')[1]
    //refrence to the storage bucket location
    const storageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    )

    setUpLoading(true)

    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const $progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress($progress)
      },
      (err) => toast.error('error accured while uploading image'),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL)
          setUpLoading(false)
        })
      }
    )
  }

  const onCopyClick = () => {
    setCopied(true)
    toast.success('image copied to clipboard !')
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div className=" mb-6">
      {uploading && <span>uploading...</span>}
      {uploading && <span> {progress} %</span>}
      {!uploading && (
        <>
          <div>
            <label className="block mb-4  text-sm font-medium text-gray-400">
              Upload image
            </label>
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
              className="block w-full text-sm border p-2  rounded cursor-pointer  text-gray-400 focus:outline-none bg-primaryDark border-gray-600 "
            />
          </div>
        </>
      )}
      {downloadURL && (
        <div className="mt-4">
          <span className="text-green-500">
            image uploaded successfylly copy link in your markdown
          </span>

          <div className="flex items-center">
            <input
              type="text"
              className="block p-2.5 w-full text-sm  rounded-l border-2 focus:ring-primary focus:border-primary bg-primaryDark border-gray-600 text-white"
              value={`![alt](${downloadURL})`}
            />
            <CopyToClipboard text={downloadURL} onCopy={onCopyClick}>
              <span
                className={`${
                  copied ? 'bg-gray-200' : 'bg-white'
                } font-poppins font-bold p-2.5  rounded-r cursor-pointer hover:bg-gray-300`}
              >
                {copied ? 'copied' : 'copy'}
              </span>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
