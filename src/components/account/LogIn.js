import useForm from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

export default function LogIn() {
  const history = useHistory()
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formdata)
      console.log(data)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data)
    }
  }

  return (
    <section className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label>Email</label>
        <input
          placeholder="Email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
        />
        {error && <p className="form-error-detail">Incorrect Log In Details</p>}
        <button type="submit">Log In</button>
      </form>
    </section>
  )
}