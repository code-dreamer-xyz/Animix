import { useContext } from 'react'
import Login from '../pages/login'
import { UserContext } from '../lib/context'

const WithUsername = (props) => {
  const { user, username } = useContext(UserContext)

  return user && username ? props.children : <Login />
}

export default WithUsername
