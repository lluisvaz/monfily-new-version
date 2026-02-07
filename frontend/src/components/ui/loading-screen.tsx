import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { isReady } = useLanguage();

  useEffect(() => {
    // Bloqueia o scroll enquanto o loading está visível
    document.body.style.overflow = 'hidden';

    const images = Array.from(document.querySelectorAll('img'));
    const totalResources = images.length + 1; // Imagens + Window Load
    let loadedResources = 0;

    const updateProgress = () => {
      loadedResources++;
      const newProgress = Math.max(5, Math.min((loadedResources / totalResources) * 100, 100));
      setProgress(newProgress);
    };

    // Incrementa progresso com imagens
    if (images.length === 0) {
      updateProgress();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          updateProgress();
        } else {
          img.addEventListener('load', updateProgress);
          img.addEventListener('error', updateProgress);
        }
      });
    }

    // Incrementa progresso com window load
    const handleWindowLoad = () => {
      setProgress(100);
    };

    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // Timer de fallback para garantir que a tela suma mesmo se algo travar
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
    }, 5000);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      clearTimeout(fallbackTimer);
      images.forEach((img) => {
        img.removeEventListener('load', updateProgress);
        img.removeEventListener('error', updateProgress);
      });
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && isReady) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = '';
        }, 500); // Tempo da transição de opacidade
      }, 500); // Delay após chegar em 100%
      return () => clearTimeout(timer);
    }
  }, [progress, isReady]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          transition: opacity 0.5s ease-in-out;
        }

        .loading-container {
          text-align: center;
          position: relative;
          padding: 40px; 
        }

        .project-logo {
          width: 60px;
          height: auto;
          margin: -15px auto 25px auto;
          display: block;
          position: relative;
          z-index: 2;
        }

        /* O trilho cinza */
        .progress-track {
          width: 200px;
          height: 4px;
          background-color: #f0f0f0; /* Cinza bem claro */
          border-radius: 4px;
          position: relative;
          margin: 0 auto;
        }

        /* A barra azul */
        .progress-bar {
          height: 100%;
          background-color: #306ED7;
          border-radius: 4px;
          position: relative;
          z-index: 1;
          transition: width 0.4s cubic-bezier(0.1, 0.7, 1.0, 0.1);
        }

        /* O brilho sutil na ponta */
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          width: 4px; 
          height: 4px;
          background: transparent;
          transform: translateY(-50%);
          border-radius: 50%;
          
          box-shadow: 
            0 0 15px 5px rgba(0, 153, 255, 0.3), 
            0 0 40px 20px rgba(0, 153, 255, 0.08); 
          
          z-index: -1;
        }

        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      <div className={`loading-overlay ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="loading-container">
          <img
            src="https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_120/v1763574787/monfily-black-nobg_risk6t.png"
            alt="Monfily"
            className="project-logo"
            draggable="false"
          />

          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
