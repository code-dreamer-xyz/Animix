function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="text-gray-200">Checking...</p>
  } else if (isValid) {
    return <p className="text-green-500">{username} is available!</p>
  } else if (username && !isValid) {
    return <p className="text-red-500">That username is taken!</p>
  } else {
    return <p></p>
  }
}

export default UsernameMessage
