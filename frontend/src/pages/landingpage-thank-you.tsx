import { useEffect } from "react";
import { SectionLayout } from "@/components/landing/section-layout";

function getSafeRedirectUrl() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  return redirect?.startsWith("https://wa.me/") ? redirect : "/";
}

export default function LandingPageThankYou() {
  useEffect(() => {
    const redirectUrl = getSafeRedirectUrl();
    const timeout = window.setTimeout(() => {
      window.location.assign(redirectUrl);
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="elevate-page" aria-label="Obrigado Monfily" lang="pt-BR" dir="ltr">
      <SectionLayout showStripes={false} className="elevate-page__frame" containerClassName="elevate-page__section">
        <div className="elevate-page__inner">
          <span className="elevate-line-marker elevate-line-marker--divider-top" aria-hidden="true" />
          <header className="elevate-hero">
            <img
              src="https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_180/v1763574787/monfily-black-nobg_risk6t.png"
              alt="Monfily"
              className="elevate-hero__mark elevate-hero__mark--monfily"
              draggable={false}
            />
            <p className="elevate-hero__eyebrow">OBRIGADO</p>
            <h1 className="elevate-hero__title">
              <span className="elevate-hero__title-main">Recebemos seu pedido</span>
            </h1>
            <p className="elevate-hero__subtitle">
              Vamos abrir o WhatsApp nesta mesma aba para continuar o atendimento.
            </p>
          </header>

          <section className="elevate-card" aria-labelledby="thank-you-title">
            <h2 id="thank-you-title" className="elevate-card__question">
              Sua pagina ja esta na fila de preparacao.
            </h2>
            <p className="elevate-card__helper">
              Em ate 24 horas voce recebe uma versao pronta para visualizar e sugerir melhorias.
            </p>
          </section>
        </div>
      </SectionLayout>
    </main>
  );
}
