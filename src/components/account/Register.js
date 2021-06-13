import useForm from '../../hooks/useForm'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'

export default function Register() {
  const history = useHistory()
  const { formdata, formErrors, setFormErrors, handleChange } = useForm({
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
      setFormErrors(err.response.data)
    }
  }

  return (
    <section className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>Username</label>
        <input
          className={formErrors.username && 'form-error'}
          placeholder="Username"
          name="username"
          value={formdata.username}
          onChange={handleChange}
        />
        {formErrors.username && <p className="form-error-detail">{formErrors.username[0]}</p>}
        <label>Email</label>
        <input
          className={formErrors.email && 'form-error'}
          placeholder="Email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
        />
        {formErrors.email && <p className="form-error-detail">{formErrors.email[0]}</p>}
        <label>Password</label>
        <input
          className={formErrors.password && 'form-error'}
          type="password"
          placeholder="Password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
        />
        {formErrors.password && formErrors.password.map(error => (
          <p key={error} className="form-error-detail">{error}</p>
        ))}
        <label>Password Confirmation</label>
        <input
          className={`${formErrors.passwordConfirmation && 'form-error'}`}
          type="password"
          placeholder="Password Confirmation"
          name="passwordConfirmation"
          value={formdata.passwordConfirmation}
          onChange={handleChange}
        />
        {formErrors.passwordConfirmation && <p className="form-error-detail">{formErrors.passwordConfirmation[0]}</p>}
        <button type="submit">Register</button>
      </form>
    </section>
  )
}