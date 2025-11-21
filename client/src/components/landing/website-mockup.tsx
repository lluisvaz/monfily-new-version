import { ArrowRight, Phone, Star } from "lucide-react";

const imageUrls = [
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726833/imagem1_gokahh.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726833/imagem2_c6lkic.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726833/imagem3_s0n4gs.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726834/imagem4_ayub82.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726834/imagem5_manctr.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726833/imagem6_wdflq9.jpg',
  'https://res.cloudinary.com/dopp0v9eq/image/upload/v1763726834/imagem7_n4u7u6.jpg'
];

export function WebsiteMockup() {
  return (
    <>
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    <div className="h-full rounded-2xl border-4 overflow-hidden flex flex-col px-6 ml-24"
      style={{
        backgroundColor: '#F0F0F0',
        borderColor: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        width: '120%',
        maxWidth: '120%',
        userSelect: 'none',
        pointerEvents: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between border-l border-r border-gray-300" style={{ backgroundColor: '#F0F0F0' }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-black rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-base font-bold text-gray-900 leading-none">FORMIX</span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-4 ml-auto">
          <span className="text-sm text-gray-600 leading-none">Serviços</span>
          <span className="text-sm text-gray-600 leading-none">Benefícios</span>
          <span className="text-sm text-gray-600 leading-none">Projetos</span>
          <span className="text-sm text-gray-600 leading-none">Preços</span>
          <span className="text-sm text-gray-600 leading-none">Clientes</span>
        </nav>
      </header>
      <div className="border-b border-gray-300" style={{ marginLeft: '-3.5rem', marginRight: '-3.5rem', width: 'calc(100% + 7rem)' }}></div>

      {/* Hero Section */}
      <div className="flex-1 px-8 py-8 flex items-center gap-6 border-l border-r border-gray-300 relative overflow-hidden" style={{ backgroundColor: '#F0F0F0', maxHeight: '500px', minHeight: '400px' }}>
        {/* Left Content */}
        <div className="flex flex-col justify-center z-10 flex-shrink-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 w-fit mb-5" style={{ backgroundColor: '#1E2939' }}>
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white leading-none">Disponível Para Projetos</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-none max-w-[320px]">
            Parceiro de Design de Classe Mundial <span className="text-gray-600">Para Startups de IA</span>
          </h1>

          {/* Description */}
          <p className="text-base text-gray-600 mb-7 max-w-[340px] leading-none">
            Soluções de design rápidas, confiáveis e escaláveis adaptadas para sua startup em crescimento.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-2 mb-7">
            <div className="bg-orange-500 text-white text-sm px-3 py-2 rounded-3xl flex items-center gap-2">
              <span className="leading-none">Ver Preços</span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E2939' }}>
                <ArrowRight className="w-3 h-3 text-orange-500" />
              </div>
            </div>
            <div className="text-white text-sm px-3 py-2 rounded-3xl flex items-center gap-2" style={{ backgroundColor: '#1E2939' }}>
              <span className="leading-none">Agendar Agora</span>
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-lg border-2 shadow-sm overflow-hidden" style={{ transform: 'rotate(-3deg)', borderColor: '#1E2939' }}>
                <img 
                  src="https://framerusercontent.com/images/E3vzjdpFuSWiVeurdyPGMrSWk.png?scale-down-to=512&width=1200&height=992" 
                  alt="Person 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-lg border-2 shadow-sm overflow-hidden" style={{ transform: 'rotate(2deg)', borderColor: '#1E2939' }}>
                <img 
                  src="https://framerusercontent.com/images/jC7KwluILkhO0KHxk6qWEttOxhE.png?scale-down-to=512&width=1200&height=1200" 
                  alt="Person 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-lg border-2 shadow-sm overflow-hidden" style={{ transform: 'rotate(-2deg)', borderColor: '#1E2939' }}>
                <img 
                  src="https://framerusercontent.com/images/cFl24iPInxckRrL32eRgadp9ZJM.png?scale-down-to=512&width=1200&height=1200" 
                  alt="Person 3" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-lg border-2 shadow-sm flex items-center justify-center overflow-hidden" style={{ transform: 'rotate(3deg)', borderColor: '#1E2939', backgroundColor: '#1E2939' }}>
                <span className="text-white text-xs font-bold leading-none z-10">50+</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className="text-xs text-gray-600 leading-none">Confiado Por Mais de 50 Empresas</span>
            </div>
          </div>
        </div>

        {/* Right Content - Image Carousels */}
        <div className="absolute right-8 top-0 bottom-0 flex gap-1.5 overflow-hidden" style={{ width: '240px' }}>
          {/* Carousel going up */}
          <div className="flex-1 flex flex-col gap-1 overflow-hidden h-full">
            <div 
              className="flex flex-col gap-1"
              style={{
                animation: 'scrollUp 40s linear infinite'
              }}
            >
              {[...Array(7)].map((_, i) => (
                <div key={`up-${i}`} className="w-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0" style={{ height: '150px' }}>
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
                <div key={`up-dup-${i}`} className="w-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0" style={{ height: '150px' }}>
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

          {/* Carousel going down */}
          <div className="flex-1 flex flex-col gap-1 overflow-hidden h-full">
            <div 
              className="flex flex-col gap-1"
              style={{
                animation: 'scrollDown 40s linear infinite'
              }}
            >
              {[...Array(7)].map((_, i) => (
                <div key={`down-${i}`} className="w-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0" style={{ height: '150px' }}>
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
                <div key={`down-dup-${i}`} className="w-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0" style={{ height: '150px' }}>
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

