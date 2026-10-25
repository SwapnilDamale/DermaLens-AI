import type { ProductKind } from "@/lib/data";

/**
 * Simple vector product illustrations. These stand in for photography
 * until licensed product imagery is supplied. They are decorative.
 */
export function ProductArt({ kind, className = "" }: { kind: ProductKind; className?: string }) {
  const stroke = "#3D285E";
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="100" cy="214" rx="46" ry="6" fill="#3D285E" opacity="0.12" />
      {kind === "serum" && (
        <g>
          <rect x="94" y="30" width="12" height="38" rx="6" fill={stroke} />
          <rect x="88" y="64" width="24" height="18" rx="3" fill="#523779" />
          <rect x="68" y="80" width="64" height="130" rx="12" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <rect x="76" y="118" width="48" height="58" rx="4" fill="#F9E0E7" />
          <path d="M84 134h32M84 144h24M84 154h28" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </g>
      )}
      {kind === "cleanser" && (
        <g>
          <path d="M72 34h56l4 164a8 8 0 0 1-8 8H76a8 8 0 0 1-8-8z" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <rect x="70" y="28" width="60" height="10" rx="3" fill={stroke} />
          <rect x="78" y="196" width="44" height="14" rx="4" fill="#523779" />
          <rect x="80" y="84" width="40" height="64" rx="4" fill="#F9E0E7" />
          <path d="M88 102h24M88 112h18M88 122h22" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </g>
      )}
      {kind === "moisturiser" && (
        <g>
          <rect x="52" y="112" width="96" height="30" rx="7" fill={stroke} />
          <rect x="56" y="140" width="88" height="68" rx="12" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <rect x="68" y="154" width="64" height="40" rx="4" fill="#F9E0E7" />
          <path d="M78 168h44M78 178h30" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </g>
      )}
      {kind === "sunscreen" && (
        <g>
          <rect x="82" y="40" width="36" height="28" rx="5" fill={stroke} />
          <path d="M72 68h56l-2 130H74z" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <rect x="70" y="198" width="60" height="10" rx="3" fill="#523779" />
          <rect x="80" y="100" width="40" height="60" rx="4" fill="#F9E0E7" />
          <circle cx="100" cy="122" r="8" fill="none" stroke={stroke} strokeWidth="2" opacity="0.6" />
          <path d="M84 146h32" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </g>
      )}
      {kind === "toner" && (
        <g>
          <rect x="94" y="34" width="14" height="42" rx="4" fill={stroke} />
          <rect x="94" y="28" width="38" height="12" rx="5" fill="#523779" />
          <rect x="80" y="74" width="40" height="14" rx="4" fill="#523779" />
          <rect x="66" y="86" width="68" height="124" rx="16" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <rect x="76" y="124" width="48" height="52" rx="4" fill="#F9E0E7" />
          <path d="M84 140h32M84 150h22M84 160h28" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        </g>
      )}
    </svg>
  );
}
