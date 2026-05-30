export type MetaPixelMarketKey = "PT" | "IT" | "ES" | "IL" | "SG" | "BR" | "GB" | "US";

type MetaFbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: MetaFbq;
  loaded?: boolean;
  version?: string;
};

type TrackMetaLeadOptions = {
  marketKey: MetaPixelMarketKey;
  eventId: string;
  value?: number;
  currency?: string;
};

type TrackMetaEventResult = {
  fired: boolean;
  pixelIds: string[];
};

type InitializedMetaPixel = TrackMetaEventResult & {
  fbq?: MetaFbq;
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

const UNIVERSAL_PIXEL_IDS = import.meta.env.VITE_META_PIXEL_BR_IDS;

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

function getUniversalPixelIds() {
  return parsePixelIds(UNIVERSAL_PIXEL_IDS);
}

function installFbqStub() {
  if (window.fbq) return window.fbq;

  const fbq = (function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
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

function initializePixelIds(_marketKey: MetaPixelMarketKey): InitializedMetaPixel {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { fired: false, pixelIds: [] };
  }

  const pixelIds = getUniversalPixelIds();
  if (pixelIds.length === 0) {
    return { fired: false, pixelIds: [] };
  }

  const fbq = installFbqStub();

  pixelIds.forEach((pixelId) => {
    if (!initializedPixelIds.has(pixelId)) {
      fbq("init", pixelId);
      initializedPixelIds.add(pixelId);
    }
  });

  loadMetaPixelScript().catch((error) => {
    console.error("Failed to load Meta Pixel script:", error);
  });

  return { fired: true, pixelIds, fbq };
}

export function initializeMetaPixel(marketKey: MetaPixelMarketKey): TrackMetaEventResult {
  const { fired, pixelIds } = initializePixelIds(marketKey);
  return { fired, pixelIds };
}

function fireMetaEvent(
  marketKey: MetaPixelMarketKey,
  eventName: string,
  params: Record<string, unknown>,
  eventId: string
): TrackMetaEventResult {
  const { fired, pixelIds, fbq } = initializePixelIds(marketKey);
  if (!fired || !fbq) {
    return { fired: false, pixelIds };
  }

  pixelIds.forEach((pixelId) => {
    fbq("trackSingle", pixelId, eventName, params, { eventID: eventId });
  });

  return { fired: true, pixelIds };
}

export function trackMetaPageView(marketKey: MetaPixelMarketKey): TrackMetaEventResult {
  const { fired, pixelIds, fbq } = initializePixelIds(marketKey);
  if (!fired || !fbq) {
    return { fired: false, pixelIds };
  }

  fbq("track", "PageView");
  pixelIds.forEach((pixelId) => {
    const marker = `meta-pageview-${pixelId}`;
    if (document.querySelector(`img[data-meta-pixel-pageview="${marker}"]`)) return;

    const image = document.createElement("img");
    image.dataset.metaPixelPageview = marker;
    image.height = 1;
    image.width = 1;
    image.alt = "";
    image.style.display = "none";
    image.src = `https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1`;
    document.body.appendChild(image);
  });

  return { fired: true, pixelIds };
}

export function trackMetaLandingLead({
  marketKey,
  eventId,
  value,
  currency,
}: TrackMetaLeadOptions): TrackMetaEventResult {
  return fireMetaEvent(
    marketKey,
    "Lead",
    {
      ...(typeof value === "number" ? { value } : {}),
      ...(currency ? { currency } : {}),
      content_name: "Monfily landing page WhatsApp lead",
      content_category: "landing_page",
      lead_type: "whatsapp_form_submit",
    },
    eventId
  );
}
