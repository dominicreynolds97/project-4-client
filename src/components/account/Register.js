import useForm from '../../hooks/useForm'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'

export default function Register() {
  const history = useHistory()
  const { formdata, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    passwordconfirmation: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formdata)
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>Username</label>
        <input
          placeholder="Username"
          name="username"
          value={formdata.username}
          onChange={handleChange}
        />
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
        <label>Password Confirmation</label>
        <input
          type="password"
          placeholder="Password Confirmation"
          name="passwordConfirmation"
          value={formdata.passwordConfirmation}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </section>
  )
}