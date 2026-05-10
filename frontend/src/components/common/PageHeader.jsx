function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="relative mb-7 overflow-hidden rounded-lg border border-white/70 bg-white/80 p-5 shadow-xl shadow-orange-100/40 backdrop-blur md:p-6">
      <div className="absolute right-0 top-0 h-28 w-52 rounded-bl-full bg-gradient-to-br from-orange-100 via-teal-100 to-sky-100 opacity-80" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {eyebrow ? <p className="text-sm font-black uppercase tracking-wide text-orange-600">{eyebrow}</p> : null}
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h1>
          {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
        {action ? <div className="flex shrink-0 flex-wrap gap-3">{action}</div> : null}
      </div>
    </div>
  )
}

export default PageHeader
