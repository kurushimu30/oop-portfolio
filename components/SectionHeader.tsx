interface SectionHeaderProps {
  tag: string
  title: string
  accent?: string
  subtitle?: string
}

export default function SectionHeader({ tag, title, accent, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <p className="font-mono-code text-xs tracking-widest uppercase text-indigo-400 mb-3">{tag}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
        {title}{' '}
        {accent && (
          <span className="font-mono-code text-indigo-400">&#123;{accent}&#125;</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-[#8b92a8] mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
