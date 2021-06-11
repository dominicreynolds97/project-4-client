import useForm from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { useHistory } from 'react-router-dom'

export default function LogIn() {
  const history = useHistory()
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      console.log(err)
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
        <button type="submit">Log In</button>
      </form>
    </section>
  )
}