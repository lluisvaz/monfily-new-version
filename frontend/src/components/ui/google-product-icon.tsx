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

const productIconSources: Record<GoogleProduct, string> = {
  "business-profile": "/google-products/business-profile.png",
  maps: "/google-products/maps.svg",
  ads: "/google-products/ads.svg",
  "search-console": "/google-products/search-console.svg",
  analytics: "/google-products/analytics.svg",
  "local-services": "/google-products/local-services.svg",
};

export function GoogleProductIcon({ product, className = iconClass }: GoogleProductIconProps) {
  return (
    <img
      src={productIconSources[product]}
      alt=""
      aria-hidden="true"
      className={`${className} object-contain`}
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}
