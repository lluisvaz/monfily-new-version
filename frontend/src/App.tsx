import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/home";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useEffect } from "react";

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
      <Route path="/pt-br" component={Home} />
      <Route path="/pt-pt" component={Home} />
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
