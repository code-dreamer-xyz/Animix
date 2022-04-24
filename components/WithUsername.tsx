import { useContext } from 'react'
import Login from '../pages/login'
import { UserContext } from '../lib/context'

const WithUsername = (props) => {
  const { username } = useContext(UserContext)

  return username ? props.children : <Login />
}

export default WithUsername
