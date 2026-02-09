import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/home";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useEffect } from "react";

function RedirectToLast() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const lastPath = localStorage.getItem("last_path") || "/";
    // Evita loop infinito se já estivermos no destino
    if (location !== lastPath) {
      setLocation(lastPath, { replace: true });
    }
  }, [location, setLocation]);

  return null;
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Lista de rotas válidas (baseado no que está no Switch abaixo)
    const validPaths = ["/", "/pt-br", "/pt-pt", "/en", "/es"];
    if (validPaths.includes(location)) {
      localStorage.setItem("last_path", location);
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/pt-br" component={Home} />
      <Route path="/pt-pt" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/es" component={Home} />
      <Route path="/" component={Home} />
      <Route component={RedirectToLast} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Intercepta cliques em links âncora e faz scroll sem atualizar a URL
    // Mas não interfere com links que têm handler customizado (marcados com data-custom-handler)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link && link.getAttribute('href')?.startsWith('#')) {
        // Não intercepta se o link tem um handler customizado
        if (link.getAttribute('data-custom-handler') === 'true') {
          return; // Deixa o onClick customizado funcionar
        }

        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();

          const id = href.substring(1);
          const element = document.getElementById(id);

          if (element) {
            // Se o Lenis estiver ativo, usamos a API dele
            const lenis = (window as any).lenis;
            if (lenis) {
              lenis.scrollTo(element, {
                duration: 1,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
              });
            } else {
              // Fallback para scroll nativo suave
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Atualiza a URL sem o hash usando replaceState
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
