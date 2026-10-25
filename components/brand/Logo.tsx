export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="17.5" fill="none" stroke="#3D285E" strokeWidth="2.5" />
      <path d="M20 8.5a11.5 11.5 0 0 1 0 23" fill="none" stroke="#D65370" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3.4" fill="#D65370" />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const word = tone === "light" ? "text-white" : "text-plum";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {tone === "light" ? (
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true" focusable="false">
          <circle cx="20" cy="20" r="17.5" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M20 8.5a11.5 11.5 0 0 1 0 23" fill="none" stroke="#D65370" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3.4" fill="#D65370" />
        </svg>
      ) : (
        <LogoMark />
      )}
      <span className={`font-display text-[1.35rem] font-normal leading-none tracking-tight ${word}`}>
        DermaLens<span className="ml-1 text-rose">AI</span>
      </span>
    </span>
  );
}
