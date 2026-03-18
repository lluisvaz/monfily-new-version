import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { isReady } = useLanguage();

  useEffect(() => {
    // Bloqueia o scroll enquanto o loading está visível
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      // Pequeno delay para garantir que o layout renderizou
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = '';
        }, 300); // Tempo da transição de opacidade
      }, 200); 
      return () => clearTimeout(timer);
    }
  }, [isReady]);

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
          transition: opacity 0.3s ease-in-out;
        }

        .loading-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }


        .spinner {
          width: 28px;
          height: 28px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #306ED7;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      <div className={`loading-overlay ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    </>
  );
}
