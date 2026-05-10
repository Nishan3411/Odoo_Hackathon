import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, LockKeyhole, Mail, MapPinned, User } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { hasErrors, validateSignup } from '../utils/authValidation'

function Signup() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const updateField = (field) => (event) => {
    const value = field === 'terms' ? event.target.checked : event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateSignup(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) return

    setStatus('Account created for demo. Opening dashboard...')
    window.setTimeout(() => navigate('/dashboard'), 450)
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-2xl lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative overflow-hidden bg-slate-950 p-8 text-white">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85"
            alt="Jaipur palace corridor"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-slate-950/70 to-teal-950/85" />
          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-white font-black text-orange-600">T</span>
              <span className="text-lg font-black">Traveloop</span>
            </Link>
            <h1 className="mt-10 text-4xl font-black leading-tight">Create your India travel planning workspace.</h1>
            <p className="mt-4 max-w-md leading-7 text-sky-100">
              Build multi-city routes across India, invite friends, track rupee budgets, and publish share-ready itineraries.
            </p>
            <div className="mt-8 space-y-3">
              {['Golden Triangle routes', 'Kerala monsoon trails', 'Himalayan workations'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 p-3 text-sm font-semibold backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 text-orange-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-wide text-orange-600">Start free</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Sign up</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Frontend-only validation is active. Successful signup opens the dashboard.</p>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Full name"
              icon={User}
              placeholder="Aarav Mehta"
              value={values.name}
              onChange={updateField('name')}
              error={errors.name}
              autoComplete="name"
            />
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
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Password"
                icon={LockKeyhole}
                type="password"
                placeholder="Minimum 8 characters"
                value={values.password}
                onChange={updateField('password')}
                error={errors.password}
                autoComplete="new-password"
              />
              <Input
                label="Confirm password"
                icon={LockKeyhole}
                type="password"
                placeholder="Repeat password"
                value={values.confirmPassword}
                onChange={updateField('confirmPassword')}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />
            </div>
            <Input label="Home base" icon={MapPinned} placeholder="Bengaluru" helper="Optional for this demo" />

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={values.terms}
                onChange={updateField('terms')}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
              />
              <span className="text-sm leading-6 text-slate-600">
                I agree to use Traveloop as a frontend demo workspace for itinerary planning.
                {errors.terms ? <span className="block font-semibold text-rose-600">{errors.terms}</span> : null}
              </span>
            </label>

            {status ? <p className="rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700">{status}</p> : null}
            <Button type="submit">Create account</Button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already have an account? <Link className="font-bold text-sky-700 hover:text-orange-600" to="/login">Login</Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Signup
