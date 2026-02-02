import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/pt" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
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
            // Faz scroll suave até o elemento
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
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
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
