export type MetaPixelMarketKey = "PT" | "IT" | "ES" | "IL" | "SG" | "BR" | "GB" | "US";

type MetaFbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: MetaFbq;
  loaded?: boolean;
  version?: string;
};

type TrackMetaPurchaseOptions = {
  marketKey: MetaPixelMarketKey;
  eventId: string;
  value: number;
  currency: string;
};

type TrackMetaPurchaseResult = {
  fired: boolean;
  pixelIds: string[];
};

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
  }
}

const META_PIXEL_SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

const initializedPixelIds = new Set<string>();
let pixelScriptPromise: Promise<void> | null = null;

const PIXEL_IDS_BY_MARKET: Record<MetaPixelMarketKey, string | undefined> = {
  BR: import.meta.env.VITE_META_PIXEL_BR_IDS,
  PT: import.meta.env.VITE_META_PIXEL_PT_IDS,
  ES: import.meta.env.VITE_META_PIXEL_ES_IDS,
  IT: import.meta.env.VITE_META_PIXEL_IT_IDS,
  IL: import.meta.env.VITE_META_PIXEL_IL_IDS,
  SG: import.meta.env.VITE_META_PIXEL_SG_IDS,
  GB: [import.meta.env.VITE_META_PIXEL_GB_IDS, import.meta.env.VITE_META_PIXEL_UK_IDS].filter(Boolean).join(","),
  US: import.meta.env.VITE_META_PIXEL_US_IDS,
};

function parsePixelIds(value?: string) {
  return Array.from(
    new Set(
      (value || "")
        .split(/[,\s]+/)
        .map((pixelId) => pixelId.trim())
        .filter(Boolean)
    )
  );
}

function getPixelIdsForMarket(marketKey: MetaPixelMarketKey) {
  return parsePixelIds(PIXEL_IDS_BY_MARKET[marketKey]);
}

function installFbqStub() {
  if (window.fbq) return window.fbq;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
      return;
    }

    fbq.queue?.push(args);
  }) as MetaFbq;

  window.fbq = fbq;
  window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  return fbq;
}

function loadMetaPixelScript() {
  if (pixelScriptPromise) return pixelScriptPromise;

  pixelScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${META_PIXEL_SCRIPT_SRC}"]`);

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = META_PIXEL_SCRIPT_SRC;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", reject, { once: true });

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  });

  return pixelScriptPromise;
}

export function trackMetaPurchase({
  marketKey,
  eventId,
  value,
  currency,
}: TrackMetaPurchaseOptions): TrackMetaPurchaseResult {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { fired: false, pixelIds: [] };
  }

  const pixelIds = getPixelIdsForMarket(marketKey);
  if (pixelIds.length === 0) {
    return { fired: false, pixelIds: [] };
  }

  const fbq = installFbqStub();

  pixelIds.forEach((pixelId) => {
    if (!initializedPixelIds.has(pixelId)) {
      fbq("init", pixelId);
      initializedPixelIds.add(pixelId);
    }

    fbq(
      "trackSingle",
      pixelId,
      "Purchase",
      {
        value,
        currency,
        content_name: "Monfily landing page premium",
        content_category: "landing_page",
      },
      { eventID: eventId }
    );
  });

  loadMetaPixelScript().catch((error) => {
    console.error("Failed to load Meta Pixel script:", error);
  });

  return { fired: true, pixelIds };
}
