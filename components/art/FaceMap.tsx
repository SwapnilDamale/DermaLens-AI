/** Abstract, faceless outline with illustrative assessment zones. */
export function FaceMap({ className = "" }: { className?: string }) {
  const zone = { fill: "#D65370", fillOpacity: 0.1, stroke: "#D65370", strokeWidth: 1.5, strokeDasharray: "4 4" } as const;
  const label = { fontSize: 12, fill: "#5A566B", fontFamily: "var(--font-sans), system-ui, sans-serif" } as const;
  return (
    <svg
      viewBox="0 0 400 360"
      className={className}
      role="img"
      aria-label="Abstract face outline showing five illustrative assessment zones: forehead, nose, left cheek, right cheek and chin"
    >
      <path
        d="M200 20c-62 0-100 48-100 120 0 40 8 76 26 110 18 34 44 62 74 62s56-28 74-62c18-34 26-70 26-110 0-72-38-120-100-120z"
        fill="#F6EEF3"
        stroke="#3D285E"
        strokeWidth="1.5"
      />
      <path d="M156 152q14-10 28 0M216 152q14-10 28 0M180 262q20 12 40 0" fill="none" stroke="#3D285E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="200" cy="92" rx="60" ry="24" {...zone} />
      <ellipse cx="200" cy="186" rx="15" ry="42" {...zone} />
      <ellipse cx="148" cy="210" rx="32" ry="36" {...zone} />
      <ellipse cx="252" cy="210" rx="32" ry="36" {...zone} />
      <ellipse cx="200" cy="300" rx="34" ry="18" {...zone} />
      <g stroke="#3D285E" strokeWidth="1" opacity="0.45">
        <path d="M144 84L98 52M116 210H84M284 210H316M236 300L292 318M214 176L300 146" fill="none" />
      </g>
      <g {...label}>
        <text x="94" y="50" textAnchor="end">Forehead</text>
        <text x="306" y="150">Nose</text>
        <text x="80" y="214" textAnchor="end">Left cheek</text>
        <text x="320" y="214">Right cheek</text>
        <text x="296" y="326">Chin</text>
      </g>
      <g fill="#D65370">
        <circle cx="200" cy="92" r="3.5" />
        <circle cx="200" cy="186" r="3.5" />
        <circle cx="148" cy="210" r="3.5" />
        <circle cx="252" cy="210" r="3.5" />
        <circle cx="200" cy="300" r="3.5" />
      </g>
    </svg>
  );
}
