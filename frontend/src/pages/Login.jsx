import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { hasErrors, validateLogin } from '../utils/authValidation'
import authService from '../services/authService'
import { getDashboardPath } from '../utils/roleRedirect'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) return

    try {
      const { user } = await authService.login(values)
      const dashboardPath = getDashboardPath(user.authRole || user.role?.toLowerCase() || 'traveler')
      setStatus(`Welcome back, ${user.name}. Redirecting...`)
      window.setTimeout(() => navigate(dashboardPath), 450)
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || error.message || 'Login failed. Please try again.'
      setStatus(message)
    }
  }

  return (
    <main className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1500&q=85"
          alt="Indian heritage travel route"
          className="h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
        <Link to="/" className="absolute left-10 top-8 flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-orange-500 via-teal-500 to-sky-600 text-xl font-black">T</span>
          <span className="text-lg font-black">Traveloop</span>
        </Link>
        <div className="absolute bottom-10 left-10 max-w-2xl text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-200">Secure travel workspace</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Return to your India itinerary command center.</h1>
          <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
            {['Budget guarded', 'Routes saved', 'Share ready'].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-3 text-sm font-bold backdrop-blur">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid place-items-center p-6">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-2xl">
          <Link to="/" className="mb-7 inline-flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-orange-500 via-teal-500 to-sky-600 font-black text-white">T</span>
            <span className="font-black text-slate-950">Traveloop</span>
          </Link>
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-sky-600 text-xl font-black text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-3xl font-black text-slate-950">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Use any valid email and an 8+ character password for this frontend demo.</p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={updateField('email')}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              icon={LockKeyhole}
              type="password"
              placeholder="********"
              value={values.password}
              onChange={updateField('password')}
              error={errors.password}
              autoComplete="current-password"
            />
            {status ? <p className="rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700">{status}</p> : null}
            <Button className="w-full" icon={ArrowRight} type="submit">Login</Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to Traveloop? <Link className="font-bold text-sky-700 hover:text-orange-600" to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
