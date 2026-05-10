import { Link } from 'react-router-dom'
import { Mail, LockKeyhole, User } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

function Signup() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-gradient-to-br from-orange-600 via-teal-700 to-sky-800 p-8 text-white">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-white font-black text-orange-600">T</span>
          <h1 className="mt-8 text-3xl font-black">Create your India travel planning workspace.</h1>
          <p className="mt-4 leading-7 text-sky-100">
            Build multi-city routes across India, invite friends, track rupee budgets, and keep every note in one calm place.
          </p>
          <div className="mt-8 rounded-lg bg-white/10 p-4">
            <p className="text-sm font-semibold">Demo setup</p>
            <p className="mt-1 text-sm text-sky-100">No backend required. All screens run from frontend mock data.</p>
          </div>
        </section>
        <section className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Sign up</h2>
          <form className="mt-6 grid gap-4">
            <Input label="Full name" icon={User} placeholder="Aarav Mehta" />
            <Input label="Email" icon={Mail} type="email" placeholder="you@example.com" />
            <Input label="Password" icon={LockKeyhole} type="password" placeholder="Create a password" />
            <Button>Create account</Button>
          </form>
          <p className="mt-6 text-sm text-slate-500">
            Already have an account? <Link className="font-bold text-sky-700" to="/login">Login</Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Signup
