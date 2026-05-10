import { Link } from 'react-router-dom'
import { Mail, LockKeyhole } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

function Login() {
  return (
    <main className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80"
          alt="Indian heritage travel route"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-xl text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-200">Traveloop India</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Plan every ghat, fort, beach, and hill stop.</h1>
        </div>
      </section>
      <section className="grid place-items-center p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-sky-600 text-xl font-black text-white">T</span>
            <h2 className="mt-6 text-2xl font-bold text-slate-950">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue building your next itinerary.</p>
          </div>
          <form className="mt-6 space-y-4">
            <Input label="Email" icon={Mail} type="email" placeholder="you@example.com" />
            <Input label="Password" icon={LockKeyhole} type="password" placeholder="********" />
            <Button className="w-full">Login</Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            New to Traveloop? <Link className="font-bold text-sky-700" to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
