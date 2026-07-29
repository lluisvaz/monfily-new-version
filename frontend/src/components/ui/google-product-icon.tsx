export type GoogleProduct =
  | "business-profile"
  | "maps"
  | "ads"
  | "search-console"
  | "analytics"
  | "local-services";

interface GoogleProductIconProps {
  product: GoogleProduct;
  className?: string;
}

const iconClass = "h-7 w-7 flex-none";

export function GoogleProductIcon({ product, className = iconClass }: GoogleProductIconProps) {
  if (product === "business-profile") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
        <rect x="4" y="10" width="24" height="18" rx="4" fill="#fff" />
        <path d="M5 8.5 8 3h4l-1.3 5.5Z" fill="#4285F4" />
        <path d="M10.7 8.5 12 3h4v5.5Z" fill="#EA4335" />
        <path d="M16 8.5V3h4l1.3 5.5Z" fill="#FBBC04" />
        <path d="M21.3 8.5 20 3h4l3 5.5Z" fill="#34A853" />
        <path d="M5 8.5h5.7v1.2a2.85 2.85 0 0 1-5.7 0Zm5.7 0H16v1.2a2.65 2.65 0 0 1-5.3 0Zm5.3 0h5.3v1.2a2.65 2.65 0 0 1-5.3 0Zm5.3 0H27v1.2a2.85 2.85 0 0 1-5.7 0Z" fill="#fff" fillOpacity=".28" />
        <rect x="9" y="16" width="6" height="12" rx="1.5" fill="#4285F4" />
        <rect x="18" y="16" width="7" height="6" rx="1.5" fill="#DCE8FD" />
      </svg>
    );
  }

  if (product === "maps") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
        <path d="M16 2.5A10.5 10.5 0 0 0 5.5 13c0 7.8 10.5 16.5 10.5 16.5S26.5 20.8 26.5 13A10.5 10.5 0 0 0 16 2.5Z" fill="#EA4335" />
        <path d="M8.7 6.4A10.45 10.45 0 0 0 5.5 13c0 2.2.84 4.6 2.05 6.85L14 13.4Z" fill="#4285F4" />
        <path d="m7.55 19.85 8.45 9.65s4.16-3.45 7.2-7.9L16 14.4Z" fill="#34A853" />
        <path d="M23.2 21.6c1.92-2.82 3.3-5.9 3.3-8.6 0-1.1-.17-2.15-.48-3.14L16 14.4Z" fill="#FBBC04" />
        <circle cx="16" cy="13" r="4.2" fill="#fff" />
      </svg>
    );
  }

  if (product === "ads") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
        <path d="M14.6 4.2a4.1 4.1 0 0 1 7.1 0l8.05 13.95a4.1 4.1 0 0 1-7.1 4.1Z" fill="#4285F4" />
        <path d="M17.4 4.2a4.1 4.1 0 0 0-7.1 0L2.25 18.15a4.1 4.1 0 0 0 7.1 4.1Z" fill="#34A853" />
        <circle cx="6" cy="22" r="5" fill="#FBBC04" />
      </svg>
    );
  }

  if (product === "search-console") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
        <rect x="3" y="7" width="26" height="21" rx="3" fill="#4285F4" />
        <path d="M11 7V5.2A2.2 2.2 0 0 1 13.2 3h5.6A2.2 2.2 0 0 1 21 5.2V7" fill="none" stroke="#8AB4F8" strokeWidth="2.5" />
        <rect x="3" y="10" width="26" height="4" fill="#8AB4F8" />
        <path d="m9 23 4-4 3 2 6-6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
        <circle cx="22" cy="15" r="1.6" fill="#FBBC04" />
      </svg>
    );
  }

  if (product === "analytics") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
        <rect x="4" y="19" width="6" height="9" rx="3" fill="#F9AB00" />
        <rect x="13" y="11" width="6" height="17" rx="3" fill="#E37400" />
        <rect x="22" y="3" width="6" height="25" rx="3" fill="#F9AB00" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
      <path d="M16 2.5 27 6v8.2c0 7.2-4.6 12.4-11 15.3C9.6 26.6 5 21.4 5 14.2V6Z" fill="#4285F4" />
      <path d="M16 2.5 27 6v3H5V6Z" fill="#EA4335" />
      <path d="M5 9h22v3H5Z" fill="#FBBC04" />
      <path d="M5 12h22v2.2c0 .28 0 .55-.02.8H5.02A12.7 12.7 0 0 1 5 14.2Z" fill="#34A853" />
      <path d="m11.2 19 3.1 3.1 6.8-7" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
    </svg>
  );
}
