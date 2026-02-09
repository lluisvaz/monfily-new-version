import { ArrowRight, Phone, Star, Wifi, Menu } from "iconoir-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const imageUrls = [
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726833/imagem1_gokahh.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726833/imagem2_c6lkic.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726833/imagem3_s0n4gs.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726834/imagem4_ayub82.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726834/imagem5_manctr.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726833/imagem6_wdflq9.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_200/v1763726834/imagem7_n4u7u6.jpg'
];

export function WebsiteMockupMobile() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const locale = language === 'pt-br' ? 'pt-BR' : language === 'pt-pt' ? 'pt-PT' : 'en-US';
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <>
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
      <div className="w-full h-full bg-white flex flex-col overflow-hidden" style={{ userSelect: 'none', pointerEvents: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', borderRadius: '40px' }}>
        {/* Status Bar */}
        <div className="px-4 py-1 flex items-center justify-between" style={{ backgroundColor: '#F0F0F0', paddingLeft: '20px', paddingRight: '20px' }}>
          <span className="text-[9px] font-semibold text-gray-900 leading-none">
            {formatTime(currentTime)}
          </span>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-gray-900" />
            {/* Battery Icon */}
            <svg className="w-3 h-3 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
              {/* Battery fill - 50% */}
              <rect x="4" y="9" width="7" height="6" rx="1" fill="#22c55e" stroke="none" />
              <line x1="18" y1="10" x2="20" y2="10" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <header className="px-2 py-1.5 flex items-center justify-between border-b border-gray-200" style={{ backgroundColor: '#F0F0F0' }}>
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-black rounded flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
            <span className="text-[10px] font-bold text-gray-900 leading-none">FORMIX</span>
          </div>
          {/* Hamburger Menu */}
          <Menu className="w-3 h-3 text-gray-900" />
        </header>

        {/* Hero Section */}
        <div className="flex-1 px-2 pt-5 pb-2 flex flex-col gap-1 overflow-y-auto" style={{ backgroundColor: '#F0F0F0' }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 w-fit" style={{ backgroundColor: '#1E2939' }}>
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-medium text-white leading-none">{t.mockup.badge}</span>
          </div>

          {/* Heading */}
          <h1
            className="text-xl text-gray-900"
            style={{
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              lineHeight: '0.9',
              letterSpacing: '-0.06em'
            }}
          >
            {t.mockup.heading.line1}<span className="text-gray-600">{t.mockup.heading.line2}</span>
          </h1>

          {/* Description */}
          <p className="text-[10px] text-gray-600 leading-tight">
            {t.mockup.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-1">
            <div className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-xl flex items-center justify-between">
              <span className="leading-none">{t.mockup.cta.viewPrices}</span>
              <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E2939' }}>
                <ArrowRight className="w-1.5 h-1.5 text-orange-500" />
              </div>
            </div>
            <div className="text-white text-[10px] px-2 py-1 rounded-xl flex items-center justify-between" style={{ backgroundColor: '#1E2939' }}>
              <span className="leading-none">{t.mockup.cta.scheduleNow}</span>
              <div className="w-3 h-3 rounded-full bg-orange-500 flex items-center justify-center">
                <Phone className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex -space-x-1.5">
              <div className="w-4 h-4 rounded-lg border border-[1px] shadow-sm overflow-hidden" style={{ transform: 'rotate(-3deg)', borderColor: '#1E2939' }}>
                <img
                  src="https://framerusercontent.com/images/E3vzjdpFuSWiVeurdyPGMrSWk.png?scale-down-to=64"
                  alt="Person 1"
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                />
              </div>
              <div className="w-4 h-4 rounded-lg border border-[1px] shadow-sm overflow-hidden" style={{ transform: 'rotate(2deg)', borderColor: '#1E2939' }}>
                <img
                  src="https://framerusercontent.com/images/jC7KwluILkhO0KHxk6qWEttOxhE.png?scale-down-to=64"
                  alt="Person 2"
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                />
              </div>
              <div className="w-4 h-4 rounded-lg border border-[1px] shadow-sm overflow-hidden" style={{ transform: 'rotate(-2deg)', borderColor: '#1E2939' }}>
                <img
                  src="https://framerusercontent.com/images/cFl24iPInxckRrL32eRgadp9ZJM.png?scale-down-to=64"
                  alt="Person 3"
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                />
              </div>
              <div className="w-4 h-4 rounded-lg border border-[1px] shadow-sm flex items-center justify-center overflow-hidden" style={{ transform: 'rotate(3deg)', borderColor: '#1E2939', backgroundColor: '#1E2939' }}>
                <span className="text-white text-[8px] font-bold leading-none">50+</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-1.5 h-1.5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className="text-[8px] text-gray-600 leading-none">{t.mockup.trust}</span>
            </div>
          </div>

          {/* Image Carousels - Horizontal */}
          <div className="flex flex-col gap-1 overflow-hidden mt-1">
            {/* Carousel going left */}
            <div className="relative flex flex-row gap-1 overflow-hidden" style={{ height: '60px' }}>
              {/* Left fade gradient */}
              <div
                className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #F0F0F0 0%, rgba(240,240,240,0.85) 40%, transparent 100%)' }}
              ></div>
              {/* Right fade gradient */}
              <div
                className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #F0F0F0 0%, rgba(240,240,240,0.85) 40%, transparent 100%)' }}
              ></div>
              <div
                className="flex flex-row gap-1"
                style={{
                  animation: 'scrollLeft 40s linear infinite'
                }}
              >
                {[...Array(7)].map((_, i) => (
                  <div key={`left-${i}`} className="w-20 h-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    <img
                      src={imageUrls[i]}
                      alt="Mockup de desenvolvimento de website responsivo e software personalizado para desktop e mobile"
                      className="w-full h-full object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[...Array(7)].map((_, i) => (
                  <div key={`left-dup-${i}`} className="w-20 h-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    <img
                      src={imageUrls[i]}
                      alt="Mockup de desenvolvimento de website responsivo e software personalizado para desktop e mobile"
                      className="w-full h-full object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel going right */}
            <div className="relative flex flex-row gap-1 overflow-hidden" style={{ height: '60px' }}>
              {/* Left fade gradient */}
              <div
                className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #F0F0F0 0%, rgba(240,240,240,0.85) 40%, transparent 100%)' }}
              ></div>
              {/* Right fade gradient */}
              <div
                className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #F0F0F0 0%, rgba(240,240,240,0.85) 40%, transparent 100%)' }}
              ></div>
              <div
                className="flex flex-row gap-1"
                style={{
                  animation: 'scrollRight 40s linear infinite'
                }}
              >
                {[...Array(7)].map((_, i) => (
                  <div key={`right-${i}`} className="w-20 h-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    <img
                      src={imageUrls[6 - i]}
                      alt="Mockup de desenvolvimento de website responsivo e software personalizado para desktop e mobile"
                      className="w-full h-full object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[...Array(7)].map((_, i) => (
                  <div key={`right-dup-${i}`} className="w-20 h-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    <img
                      src={imageUrls[6 - i]}
                      alt="Mockup de desenvolvimento de website responsivo e software personalizado para desktop e mobile"
                      className="w-full h-full object-cover"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

