import { ArrowRight, Phone, Star } from "lucide-react";

const videoUrls = [
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591100/video1_uuhrry.mp4',
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591114/video2_dwyo61.mp4',
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591337/video3_mdyjag.mp4',
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591345/video4_pttj0v.mp4',
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591323/video5_b98qhu.mp4',
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591295/video6_yubp62.mp4',
  'https://res.cloudinary.com/dopp0v9eq/video/upload/v1763591303/video7_vxjpxl.mp4'
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
        maxWidth: '120%'
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
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors leading-none">Serviços</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors leading-none">Benefícios</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors leading-none">Projetos</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors leading-none">Preços</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors leading-none">Clientes</a>
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded-3xl flex items-center gap-2 transition-colors">
              <span className="leading-none">Ver Preços</span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E2939' }}>
                <ArrowRight className="w-3 h-3 text-orange-500" />
              </div>
            </button>
            <button className="text-white text-sm px-3 py-2 rounded-3xl flex items-center gap-2 transition-colors" style={{ backgroundColor: '#1E2939' }}>
              <span className="leading-none">Agendar Agora</span>
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
              </div>
              <span className="text-sm font-semibold text-gray-700 leading-none">50+</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                ))}
              </div>
              <span className="text-sm text-gray-600 leading-none">Confiado Por Mais de 50 Empresas</span>
            </div>
          </div>
        </div>

        {/* Right Content - Video Carousels */}
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
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={videoUrls[i]} type="video/mp4" />
                  </video>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[...Array(7)].map((_, i) => (
                <div key={`up-dup-${i}`} className="w-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0" style={{ height: '150px' }}>
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={videoUrls[i]} type="video/mp4" />
                  </video>
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
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={videoUrls[6 - i]} type="video/mp4" />
                  </video>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[...Array(7)].map((_, i) => (
                <div key={`down-dup-${i}`} className="w-full rounded-lg overflow-hidden bg-gray-800 flex-shrink-0" style={{ height: '150px' }}>
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={videoUrls[6 - i]} type="video/mp4" />
                  </video>
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

