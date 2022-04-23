const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center my-6 flex-col">
      <img
        className="block w-12 h-12 mb-4 rounded-full"
        src={user.photoURL}
        alt="user"
      />

      <h1 className="text-lg text-white mb-2 font-poppins">
        {user.displayName}
      </h1>
      <p className="text-gray-300 mb-4">@{user.username}</p>
    </div>
  )
}

export default UserProfile
