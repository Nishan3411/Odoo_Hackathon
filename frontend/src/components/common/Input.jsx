function Input({ label, icon: Icon, className = '', error, helper, ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span> : null}
      <span className="relative block">
        {Icon ? <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /> : null}
        <input
          className={`min-h-11 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${error ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'} ${Icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </span>
      {error ? <span className="mt-2 block text-xs font-semibold text-rose-600">{error}</span> : null}
      {!error && helper ? <span className="mt-2 block text-xs text-slate-500">{helper}</span> : null}
    </label>
  )
}

export default Input
