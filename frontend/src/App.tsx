import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/home";
import LandingPage, { type MarketKey } from "@/pages/landingpage";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useEffect } from "react";
import { detectLocationData } from "@/lib/geo-location";

const LANDING_ROUTE_BY_MARKET: Record<MarketKey, string> = {
  BR: "/pt-br/landingpage",
  PT: "/pt-pt/landingpage",
  ES: "/es/landingpage",
  IT: "/it/landingpage",
  IL: "/he/landingpage",
  SG: "/sg/landingpage",
  GB: "/en-gb/landingpage",
  US: "/en-us/landingpage",
};

const MARKET_BY_COUNTRY: Record<string, MarketKey> = {
  BR: "BR",
  PT: "PT",
  ES: "ES",
  IT: "IT",
  IL: "IL",
  SG: "SG",
  GB: "GB",
  UK: "GB",
  US: "US",
};

function resolveMarket(country?: string | null): MarketKey {
  const upper = country?.toUpperCase();
  if (upper && MARKET_BY_COUNTRY[upper]) return MARKET_BY_COUNTRY[upper];
  return "US";
}

function LandingPageRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    let cancelled = false;

    detectLocationData()
      .then(({ country }) => {
        if (!cancelled) {
          setLocation(LANDING_ROUTE_BY_MARKET[resolveMarket(country)], { replace: true });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLocation(LANDING_ROUTE_BY_MARKET.US, { replace: true });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setLocation]);

  return null;
}

const LandingPageBR = () => <LandingPage fixedMarketKey="BR" />;
const LandingPagePT = () => <LandingPage fixedMarketKey="PT" />;
const LandingPageES = () => <LandingPage fixedMarketKey="ES" />;
const LandingPageIT = () => <LandingPage fixedMarketKey="IT" />;
const LandingPageIL = () => <LandingPage fixedMarketKey="IL" />;
const LandingPageSG = () => <LandingPage fixedMarketKey="SG" />;
const LandingPageGB = () => <LandingPage fixedMarketKey="GB" />;
const LandingPageUS = () => <LandingPage fixedMarketKey="US" />;

function RedirectToRoot() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/", { replace: true });
  }, [setLocation]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/pt-br/landingpage" component={LandingPageBR} />
      <Route path="/pt-pt/landingpage" component={LandingPagePT} />
      <Route path="/es/landingpage" component={LandingPageES} />
      <Route path="/it/landingpage" component={LandingPageIT} />
      <Route path="/he/landingpage" component={LandingPageIL} />
      <Route path="/sg/landingpage" component={LandingPageSG} />
      <Route path="/en-gb/landingpage" component={LandingPageGB} />
      <Route path="/en-us/landingpage" component={LandingPageUS} />
      <Route path="/en/landingpage" component={LandingPageRedirect} />
      <Route path="/landingpage" component={LandingPageRedirect} />
      <Route path="/pt-br" component={Home} />
      <Route path="/pt-pt" component={Home} />
      <Route path="/en-us" component={Home} />
      <Route path="/en-gb" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/es" component={Home} />
      <Route path="/it" component={Home} />
      <Route path="/sg" component={Home} />
      <Route path="/he" component={Home} />
      <Route path="/" component={Home} />
      <Route component={RedirectToRoot} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link && link.getAttribute('href')?.startsWith('#')) {
        if (link.getAttribute('data-custom-handler') === 'true') {
          return;
        }

        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();

          const id = href.substring(1);
          const element = document.getElementById(id);

          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            if (window.history.replaceState) {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <LoadingScreen />
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
