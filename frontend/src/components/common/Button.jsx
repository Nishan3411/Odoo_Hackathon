import { classNames } from '../../utils/formatters'

const variants = {
  primary: 'bg-sky-600 text-white shadow-lg shadow-sky-200 hover:bg-sky-700',
  accent: 'bg-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-rose-500',
  secondary: 'border border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700',
  ghost: 'text-slate-600 hover:bg-sky-50 hover:text-sky-700',
}

function Button({ children, className = '', variant = 'primary', icon: Icon, ...props }) {
  return (
    <button
      className={classNames(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  )
}

export default Button
