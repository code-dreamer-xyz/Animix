import { firestore } from '../../lib/firebase'
import toast from 'react-hot-toast'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../lib/context'
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import UsernameMessage from './UsernameMessage'
import debounce from 'lodash.debounce'

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  const onChange = (e) => {
    const val = e.target.value.toLowerCase()
    const usernameRegex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (usernameRegex.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        try {
          const isUsernameExists = await getDoc(
            doc(firestore, 'usernames', username)
          )
          setIsValid(!isUsernameExists.exists())
          setLoading(false)
        } catch (error) {
          toast.error('an error accured')
        }
      }
    }, 500),
    []
  )

  const onsubmit = async (e) => {
    e.preventDefault()

    const userDoc = doc(firestore, 'users', user.uid)
    const usernameDoc = doc(firestore, 'usernames', formValue)

    const batch = writeBatch(firestore)

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    })
    batch.set(usernameDoc, { uid: user.uid })

    try {
      await batch.commit()
    } catch (error) {
      toast.error('error accured while setting username')
      console.log(error.message)
    }
  }

  return (
    !username && (
      <div className="bg-primaryDark rounded-md  w-96 max-w-full p-6 mx-auto">
        <form onSubmit={onsubmit} className="flex flex-col items-center">
          <div className="text-center w-full mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Enter a username
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formValue}
              onChange={onChange}
              className=" border focus:border-primary focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded p-2"
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-2 py-1 rounded"
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </div>
    )
  )
}

export default UsernameForm
