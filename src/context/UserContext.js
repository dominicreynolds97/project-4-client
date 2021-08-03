import { createContext, useState, useEffect } from 'react'
import { getSingleUser } from '../lib/api'
import { getPayload, isAuthenticated } from '../lib/auth'

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated())
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (loggedIn) {
      const getData = async () => {
        const { data } = await getSingleUser(getPayload().sub)
        setUser(data)
      }
      getData()
    } else setUser(null)
  }, [loggedIn])

  const checkLoggedIn = () => {
    setLoggedIn(isAuthenticated)
  }

  return (
    <UserContext.Provider value={{ user, checkLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  )
}