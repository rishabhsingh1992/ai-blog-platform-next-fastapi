import Link from "next/link";

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
  icon,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-[2.5rem] border-2 border-dashed border-border/60 bg-surface/30 backdrop-blur-sm">
      {icon && (
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-surface to-border/20 border border-border text-muted shadow-inner">
          <div className="scale-[1.5]">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-2xl font-black tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-base text-muted max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-foreground px-10 py-4 text-sm font-black uppercase tracking-widest text-background transition-all hover:scale-105 hover:shadow-xl hover:shadow-foreground/10 active:scale-95"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
