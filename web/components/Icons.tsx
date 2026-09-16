type P = { size?: number };

const svg = (size: number, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const DownloadIcon = ({ size = 16 }: P) =>
  svg(size, <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>);

export const ExternalIcon = ({ size = 16 }: P) =>
  svg(size, <><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>);

export const BackIcon = ({ size = 16 }: P) => svg(size, <path d="m15 18-6-6 6-6" />);

export const SearchIcon = ({ size = 16 }: P) =>
  svg(size, <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);

export const SwapIcon = ({ size = 16 }: P) =>
  svg(size, <><path d="M7 4 3 8l4 4" /><path d="M3 8h13" /><path d="m17 20 4-4-4-4" /><path d="M21 16H8" /></>);
