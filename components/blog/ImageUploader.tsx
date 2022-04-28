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
            {/* <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex text-sm items-center text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-secondary p-2 focus-within:outline-none "
                  >
                    <span>Choose a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={uploadFile}
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                  </label>
                  <p className="pl-3">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
              </div>
            </div> */}
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
          {/* <input type="text"  /> */}

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
