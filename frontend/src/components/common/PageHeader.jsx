function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-bold uppercase tracking-wide text-teal-600">{eyebrow}</p> : null}
        <h1 className="mt-1 text-2xl font-bold text-slate-950 md:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 gap-3">{action}</div> : null}
    </div>
  )
}

export default PageHeader
