import { Link } from 'react-router-dom'

type ToolCardProps = {
  to: string
  icon: string
  title: string
  description: string
  cta: string
}

export function ToolCard({ to, icon, title, description, cta }: ToolCardProps) {
  return (
    <Link
      to={to}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400 opacity-80" />

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition group-hover:scale-105 group-hover:bg-slate-900">
          <span className="transition group-hover:scale-110">{icon}</span>
        </div>

        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
          Free
        </span>
      </div>

      <h3 className="mb-2 text-lg font-bold leading-snug text-slate-950">
        {title}
      </h3>

      <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <span className="mt-auto inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-slate-800">
        {cta}
        <span className="ms-2 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  )
}