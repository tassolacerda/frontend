import { Link } from 'react-router-dom';
import { Shield, BarChart3, Wallet, CheckCircle, Menu, X } from 'lucide-react';
import { BentoCard } from '@/components/ui/bento-grid';
import EcosystemCard from '@/components/EcosystemCard';
import ResponsiveContainer from '@/components/ResponsiveContainer';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const animationRef = useRef<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showTopBar, setShowTopBar] = useState(true);

  // Handle scroll to show/hide top bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth momentum scroll
  useEffect(() => {
    const animate = () => {
      if (Math.abs(momentum) > 0.1 && carouselRef.current && !isDragging) {
        carouselRef.current.scrollLeft += momentum;
        setMomentum(momentum * 0.92); // Smooth deceleration
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setMomentum(0);
      }
    };

    if (momentum !== 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [momentum, isDragging]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setMomentum(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    setMomentum(-walk * 0.08); // Set momentum for smooth deceleration
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const properties = [
    {
      id: 0,
      image: '/placeholder-property.jpg',
      title: 'Venda de apartamento, de 79 m² com 2 quartos, 2 banheiros e 1 vaga na garagem em Parque da Mooca.',
      price: 'R$ 2.841.000',
      condo: 'R$ 1.500 Condo + IPTU',
      details: ['130 m²', '2 quartos', '2 vagas'],
      location: ['Rua Sul, Brooklin', 'São Paulo']
    },
    {
      id: 1,
      image: '/placeholder-property.jpg',
      title: 'Venda de cobertura, de 150 m² com 3 quartos, 3 banheiros e 2 vagas na garagem em Vila Mariana.',
      price: 'R$ 3.200.000',
      condo: 'R$ 2.100 Condo + IPTU',
      details: ['150 m²', '3 quartos', '3 vagas'],
      location: ['Av. Paulista, Bela Vista', 'São Paulo']
    },
    {
      id: 2,
      image: '/placeholder-property.jpg',
      title: 'Venda de casa, de 200 m² com 4 quartos, 4 banheiros e 3 vagas na garagem em Alto de Pinheiros.',
      price: 'R$ 4.500.000',
      condo: 'R$ 800 Condo + IPTU',
      details: ['200 m²', '4 quartos', '3 vagas'],
      location: ['Rua dos Pinheiros, Pinheiros', 'São Paulo']
    },
    {
      id: 3,
      image: '/placeholder-property.jpg',
      title: 'Venda de loft, de 65 m² com 1 quarto, 1 banheiro e 1 vaga na garagem em Itaim Bibi.',
      price: 'R$ 1.850.000',
      condo: 'R$ 1.200 Condo + IPTU',
      details: ['65 m²', '1 quarto', '1 vaga'],
      location: ['Av. Brigadeiro Faria Lima, Itaim', 'São Paulo']
    },
    {
      id: 4,
      image: '/placeholder-property.jpg',
      title: 'Venda de apartamento, de 95 m² com 2 quartos, 2 banheiros e 2 vagas na garagem em Moema.',
      price: 'R$ 2.100.000',
      condo: 'R$ 1.800 Condo + IPTU',
      details: ['95 m²', '2 quartos', '2 vagas'],
      location: ['Rua Tuim, Moema', 'São Paulo']
    },
    {
      id: 5,
      image: '/placeholder-property.jpg',
      title: 'Venda de cobertura duplex, de 180 m² com 4 quartos, 3 banheiros e 3 vagas.',
      price: 'R$ 3.800.000',
      condo: 'R$ 2.500 Condo + IPTU',
      details: ['180 m²', '4 quartos', '3 vagas'],
      location: ['Av. Paulista, Jardins', 'São Paulo']
    },
    {
      id: 6,
      image: '/placeholder-property.jpg',
      title: 'Venda de apartamento, de 110 m² com 3 quartos, 2 banheiros e 2 vagas na garagem em Perdizes.',
      price: 'R$ 2.650.000',
      condo: 'R$ 1.600 Condo + IPTU',
      details: ['110 m²', '3 quartos', '2 vagas'],
      location: ['Rua Monte Alegre, Perdizes', 'São Paulo']
    },
    {
      id: 7,
      image: '/placeholder-property.jpg',
      title: 'Venda de studio, de 45 m² com 1 quarto, 1 banheiro e 1 vaga na garagem em Vila Madalena.',
      price: 'R$ 1.200.000',
      condo: 'R$ 900 Condo + IPTU',
      details: ['45 m²', '1 quarto', '1 vaga'],
      location: ['Rua Harmonia, Vila Madalena', 'São Paulo']
    },
    {
      id: 8,
      image: '/placeholder-property.jpg',
      title: 'Venda de apartamento, de 165 m² com 3 quartos, 3 banheiros e 3 vagas na garagem em Higienópolis.',
      price: 'R$ 3.500.000',
      condo: 'R$ 2.200 Condo + IPTU',
      details: ['165 m²', '3 quartos', '3 vagas'],
      location: ['Av. Higienópolis, Higienópolis', 'São Paulo']
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Top black bar - full width */}
      <div
        className={`fixed top-0 left-0 right-0 w-full h-6 md:h-8 lg:h-10 bg-black z-40 transition-transform duration-300 ${
          showTopBar ? 'translate-y-0' : '-translate-y-full'
        }`}
      ></div>

      {/* Navbar */}
      <nav
        className={`fixed left-0 right-0 w-full bg-black z-50 transition-all duration-300 ${
          showTopBar ? 'top-6 md:top-8 lg:top-10' : 'top-0'
        }`}
      >
        <div className="max-w-[1782px] mx-auto">
        <ResponsiveContainer>
          <div className="flex items-center py-4 md:py-5">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/LogoPrismaWhite.svg" alt="Prisma" style={{ width: '122px', height: '25px' }} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-[21px] ml-[72px]">
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-white hover:text-gray-300 transition-colors text-base font-normal"
              >
                Sobre nós
              </button>
              <button
                onClick={() => scrollToSection('beneficios')}
                className="text-white hover:text-gray-300 transition-colors text-base font-normal"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection('oque')}
                className="text-white hover:text-gray-300 transition-colors text-base font-normal"
              >
                O que é a Prisma
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-white hover:text-gray-300 transition-colors text-base font-normal"
              >
                Contato
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-auto p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black py-4">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="text-white hover:text-gray-300 transition-colors font-medium py-3 px-4 text-left hover:bg-gray-900"
                >
                  Sobre nós
                </button>
                <button
                  onClick={() => scrollToSection('beneficios')}
                  className="text-white hover:text-gray-300 transition-colors font-medium py-3 px-4 text-left hover:bg-gray-900"
                >
                  Benefícios
                </button>
                <button
                  onClick={() => scrollToSection('oque')}
                  className="text-white hover:text-gray-300 transition-colors font-medium py-3 px-4 text-left hover:bg-gray-900"
                >
                  O que é a Prisma
                </button>
                <button
                  onClick={() => scrollToSection('contato')}
                  className="text-white hover:text-gray-300 transition-colors font-medium py-3 px-4 text-left hover:bg-gray-900"
                >
                  Contato
                </button>
              </div>
            </div>
          )}
        </ResponsiveContainer>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black text-white pt-32 md:pt-48 lg:pt-56 pb-16 md:pb-20 lg:pb-24 relative overflow-hidden z-20" style={{ height: '900px' }}>
        <div className="max-w-[1782px] mx-auto relative h-full">
          <ResponsiveContainer className="h-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start h-full">
              {/* Left Column - Text */}
              <div className="pt-4 md:pt-12 lg:pt-40">
                <h1
                  className="font-bold mb-4 md:mb-8 whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 72px)',
                    lineHeight: 'clamp(2.4rem, 6vw, 86px)',
                    fontFamily: "'SF Pro Display', -apple-system, sans-serif"
                  }}
                >
                  O futuro do mercado<br />imobiliário, hoje
                </h1>
                <p
                  className="mb-8 md:mb-12 whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 32px)',
                    lineHeight: 'clamp(1.2rem, 3vw, 38px)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                    fontWeight: 510
                  }}
                >
                  Mudando o mercado imobiliário<br />de uma forma acessível para todos.
                </p>

                {/* Button */}
                <Link
                  to="/register"
                  className="inline-flex flex-row justify-center items-center bg-white text-black font-bold rounded-lg whitespace-nowrap"
                  style={{
                    padding: '16px 24px',
                    gap: '16px',
                    width: '209px',
                    height: '58px',
                    fontSize: '22px',
                    lineHeight: '26px',
                    fontFamily: "'SF Pro Display', -apple-system, sans-serif"
                  }}
                >
                  Começar agora
                </Link>
              </div>
            </div>
          </ResponsiveContainer>

          {/* Right Column - Image - FORA DO CONTAINER */}
          <img
            src="/Heroitem.png"
            alt="Tokenização de Imóveis"
            className="absolute object-contain left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-20 bottom-[-60px] md:bottom-[-180px] lg:bottom-[-300px]"
            style={{
              height: 'clamp(450px, calc(450px + (100vw - 768px) * 1.0), 1000px)',
              width: 'auto',
              
            }}
          />
        </div>
      </section>

      {/* Tokenização Section */}
      <section className="py-16 md:py-20 lg:py-24 lg:pt-32" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-[1782px] mx-auto">
        <ResponsiveContainer>
          {/* Mobile/Tablet: Stack vertical */}
          <div className="lg:hidden relative min-h-[600px] md:min-h-[500px]">
            <div className="max-w-content-sm relative z-10">
              <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">
                Tokenização
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 md:mb-5 leading-tight">
                O que é tokenização<br />Imobiliária?
              </h2>
              <p className="text-base md:text-xl text-gray-700 mb-6 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(245,245,245,0.9), 0 0 1px rgba(245,245,245,0.6)' }}>
                Tokenizar é transformar um imóvel em "cotas digitais" (tokens) que representam a
                propriedade econômica/jurídica daquele imóvel. Quem tem os tokens é dono da sua
                fração com direitos a renda, voto e venda conforme definido nos contratos.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-colors font-semibold text-sm md:text-base group"
              >
                Comece a tokenizar
                <img
                  src="/icons/arrow-right.svg"
                  alt="Arrow"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Grid mobile - posicionado absolutamente embaixo */}
            <div className="absolute -top-[380px] md:-top-[350px] left-1/2 -translate-x-1/2 w-full flex justify-center -z-8">
              <div
                style={{
                  maskImage: 'radial-gradient(ellipse 200px 180px at center 50%, black 50%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 200px 180px at center 50%, black 50%, transparent 100%)',
                }}
                className="md:[mask-image:radial-gradient(ellipse_280px_240px_at_center_50%,black_45%,transparent_100%)]"
              >
                <div className="grid grid-cols-3 grid-rows-3 gap-x-6 md:gap-x-6 gap-y-0 scale-[0.35] md:scale-100" style={{ width: '1400px' }}>
                  {properties.slice(0, 9).map((property, index) => {
                    const column = index % 3;
                    const shiftClass = column === 0 ? 'mt-6 md:mt-8' : column === 2 ? '-mt-6 md:-mt-8' : '';
                    const row = Math.floor(index / 3);
                    const isCenterCard = column === 1 && row === 1;
                    const shadowClass = isCenterCard ? 'shadow-2xl' : '';

                    return (
                      <div key={property.id} className={`transition-all duration-300 ${shiftClass}`} style={{ minWidth: '400px' }}>
                        <div
                          className={`bg-white ${shadowClass}`}
                          style={{
                            borderRadius: '4px',
                            padding: '0px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                          }}
                        >
                          {/* Image Container */}
                          <div className="relative p-4">
                            <img
                              src="/Imovel.png"
                              alt={property.title}
                              className="object-cover w-full"
                              style={{ aspectRatio: '379/267', borderRadius: '16px' }}
                            />
                            <div
                              className="absolute bg-white text-black"
                              style={{
                                top: '20px',
                                left: '20px',
                                padding: '8px 12px',
                                borderRadius: '23px',
                                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                fontWeight: 590,
                                fontSize: '14px',
                                lineHeight: '17px'
                              }}
                            >
                              Anúncio Novo
                            </div>
                            <div
                              className="absolute flex items-center"
                              style={{
                                bottom: '28px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                gap: '6px'
                              }}
                            >
                              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFFFFF' }}></div>
                              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(231, 231, 231, 0.5)' }}></div>
                              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(231, 231, 231, 0.5)' }}></div>
                            </div>
                          </div>

                          {/* Content Container */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '32px',
                              padding: '0px 16px 16px 16px'
                            }}
                          >
                            {/* Description */}
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '17px',
                                color: 'rgba(0, 0, 0, 0.5)',
                                margin: 0
                              }}
                            >
                              {property.title}
                            </p>

                            {/* Price and Details Container */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                              }}
                            >
                              {/* Left Column - Price */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '32px'
                                }}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <p
                                    style={{
                                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                      fontWeight: 590,
                                      fontSize: '24px',
                                      lineHeight: '29px',
                                      color: '#000000',
                                      margin: 0
                                    }}
                                  >
                                    {property.price}
                                  </p>
                                  <p
                                    style={{
                                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                      fontWeight: 590,
                                      fontSize: '16px',
                                      lineHeight: '19px',
                                      color: 'rgba(0, 0, 0, 0.5)',
                                      margin: 0
                                    }}
                                  >
                                    {property.condo}
                                  </p>
                                </div>

                                {/* Details below price */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      gap: '8px'
                                    }}
                                  >
                                    {property.details.map((detail, i) => (
                                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span
                                          style={{
                                            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                            fontWeight: 590,
                                            fontSize: '14px',
                                            lineHeight: '17px',
                                            color: '#000000'
                                          }}
                                        >
                                          {detail}
                                        </span>
                                        {i < property.details.length - 1 && (
                                          <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: '#000000' }}></div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      gap: '8px'
                                    }}
                                  >
                                    {property.location.map((loc, i) => (
                                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span
                                          style={{
                                            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                            fontWeight: 590,
                                            fontSize: '16px',
                                            lineHeight: '19px',
                                            color: 'rgba(0, 0, 0, 0.5)'
                                          }}
                                        >
                                          {loc}
                                        </span>
                                        {i < property.location.length - 1 && (
                                          <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: '#7B7B7B' }}></div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Right Column - Heart Icon */}
                              <button
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                <img src="/icons/heart.svg" alt="Favoritar" style={{ width: '32px', height: '32px' }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Layout com posição absoluta como antes */}
          <div className="hidden lg:block relative min-h-[700px]">
            {/* Left - Content */}
            <div className="relative z-10 mt-8" style={{ maxWidth: '604px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  fontWeight: 510,
                  fontSize: '16px',
                  lineHeight: '19px',
                  color: '#000000'
                }}
              >
                Tokenização
              </p>
              <h2
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  fontWeight: 590,
                  fontSize: '44px',
                  lineHeight: '53px',
                  color: '#000000'
                }}
              >
                O que é tokenização<br />Imobiliária?
              </h2>
              <p
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  fontWeight: 510,
                  fontSize: '22px',
                  lineHeight: '26px',
                  color: 'rgba(0, 0, 0, 0.5)',
                  textShadow: '0 1px 2px rgba(245,245,245,0.9), 0 0 1px rgba(245,245,245,0.6)'
                }}
              >
                Tokenizar é transformar um imóvel em "cotas digitais" (tokens) que representam a
                propriedade econômica/jurídica daquele imóvel. Quem tem os tokens é dono da sua
                fração com direitos a renda, voto e venda conforme definido nos contratos.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center transition-colors group"
                style={{
                  gap: '8px',
                  width: '168px',
                  height: '24px'
                }}
              >
                <span
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                    fontWeight: 590,
                    fontSize: '14px',
                    lineHeight: '17px',
                    color: '#000000'
                  }}
                >
                  Comece a tokenizar
                </span>
                <img
                  src="/icons/arrow-right.svg"
                  alt="Arrow"
                  style={{ width: '24px', height: '24px' }}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Right - GRID with Spotlight Effect (Positioned Absolutely) */}
            <div
              className="absolute right-0 lg:right-[-350px] xl:right-[-152px] 2xl:right-[-252px]"
              style={{
                width: 'clamp(720px, calc(720px + (100vw - 1024px) * 0.6), 1200px)',
                height: 'auto',
                top: 'clamp(-500px, calc(-500px + (100vw - 1024px) * 0.08), -100px)',
                  maskImage: 'radial-gradient(circle calc(400px + (max(0px, 1400px - 100vw) * 0.15)) at center 50%, black 30%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle calc(400px + (max(0px, 1400px - 100vw) * 0.15)) at center 50%, black 30%, transparent 100%)',
              }}
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-0">
                {properties.slice(0, 9).map((property, index) => {
                  const column = index % 3;
                  const row = Math.floor(index / 3);
                  const shiftClass = column === 0 ? 'mt-12' : column === 2 ? '-mt-12' : '';
                  const isCenterCard = column === 1 && row === 1;
                  const shadowClass = isCenterCard ? 'shadow-2xl' : '';

                  return (
                    <div key={property.id} className={`transition-all duration-300 ${shiftClass}`}>
                      <div
                        className={`bg-white ${shadowClass}`}
                        style={{
                          borderRadius: '4px',
                          padding: '0px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px'
                        }}
                      >
                        {/* Image Container */}
                        <div className="relative p-4">
                          <img
                            src="/Imovel.png"
                            alt={property.title}
                            className="object-cover w-full aspect-[379/267]"
                            style={{ borderRadius: '16px' }}
                          />
                          <div
                            className="absolute bg-white text-black"
                            style={{
                              top: '20px',
                              left: '20px',
                              padding: '8px 12px',
                              borderRadius: '23px',
                              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                              fontWeight: 590,
                              fontSize: '14px',
                              lineHeight: '17px'
                            }}
                          >
                            Anúncio Novo
                          </div>
                          <div
                            className="absolute flex items-center"
                            style={{
                              bottom: '28px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              gap: '6px'
                            }}
                          >
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFFFFF' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(231, 231, 231, 0.5)' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(231, 231, 231, 0.5)' }}></div>
                          </div>
                        </div>

                        {/* Content Container */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '32px',
                            padding: '0px 16px 16px 16px'
                          }}
                        >
                          {/* Description */}
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '17px',
                              color: 'rgba(0, 0, 0, 0.5)',
                              margin: 0
                            }}
                          >
                            {property.title}
                          </p>

                          {/* Price and Details Container */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start'
                            }}
                          >
                            {/* Left Column - Price */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '32px'
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p
                                  style={{
                                    fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                    fontWeight: 590,
                                    fontSize: '24px',
                                    lineHeight: '29px',
                                    color: '#000000',
                                    margin: 0
                                  }}
                                >
                                  {property.price}
                                </p>
                                <p
                                  style={{
                                    fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                    fontWeight: 590,
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                    color: 'rgba(0, 0, 0, 0.5)',
                                    margin: 0
                                  }}
                                >
                                  {property.condo}
                                </p>
                              </div>

                              {/* Details below price */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}
                                >
                                  {property.details.map((detail, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span
                                        style={{
                                          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                          fontWeight: 590,
                                          fontSize: '14px',
                                          lineHeight: '17px',
                                          color: '#000000'
                                        }}
                                      >
                                        {detail}
                                      </span>
                                      {i < property.details.length - 1 && (
                                        <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: '#000000' }}></div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}
                                >
                                  {property.location.map((loc, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span
                                        style={{
                                          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                                          fontWeight: 590,
                                          fontSize: '16px',
                                          lineHeight: '19px',
                                          color: 'rgba(0, 0, 0, 0.5)'
                                        }}
                                      >
                                        {loc}
                                      </span>
                                      {i < property.location.length - 1 && (
                                        <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: '#7B7B7B' }}></div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Heart Icon */}
                            <button
                              style={{
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0
                              }}
                            >
                              <img src="/icons/heart.svg" alt="Favoritar" style={{ width: '32px', height: '32px' }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ResponsiveContainer>
        </div>
      </section>

      {/* Ecossistema Completo */}
      <section className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-[1782px] mx-auto">
        {/* Content - dentro do ResponsiveContainer */}
        <ResponsiveContainer>
          <div className="mb-8 md:mb-12" style={{ maxWidth: '708px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontWeight: 510,
                fontSize: '16px',
                lineHeight: '19px',
                color: '#000000'
              }}
            >
              Incorporadora
            </p>
            <h2
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontWeight: 590,
                fontSize: '44px',
                lineHeight: '53px',
                color: '#000000'
              }}
            >
              Um Ecossistema Completo para o seu Patrimônio Digital.
            </h2>
            <p
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontWeight: 510,
                fontSize: '22px',
                lineHeight: '26px',
                color: 'rgba(0, 0, 0, 0.5)',
                maxWidth: '661px'
              }}
            >
              Não somos apenas uma plataforma de tokenização. Somos o ambiente onde seu imóvel digital nasce, vive e gera valor.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center transition-colors group"
              style={{
                gap: '8px',
                width: '168px',
                height: '24px'
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  fontWeight: 590,
                  fontSize: '14px',
                  lineHeight: '17px',
                  color: '#000000'
                }}
              >
                Comece a tokenizar
              </span>
              <img
                src="/icons/arrow-right.svg"
                alt="Arrow"
                style={{ width: '24px', height: '24px' }}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Carrossel - acima de 1700px fica dentro do ResponsiveContainer */}
          <div className="hidden 2xl:block relative">
            <div className="flex gap-4 md:gap-6 lg:gap-8">
              <div className="flex-shrink-0 w-[350px] md:w-[380px] h-auto">
                <EcosystemCard
                  icon={Shield}
                  category="Segurança"
                  title="Tokenização e Custódia Segura"
                  description='Criação do "RG digital" na blockchain. Gestão em sua carteira digital exclusiva com controle total (Self-custody).'
                  image="/image-1.png"
                  iconImage='/icons/security.svg'
                />
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[380px] h-auto">
                <EcosystemCard
                  icon={BarChart3}
                  category="Compra e venda"
                  title="Marketplace Exclusivo"
                  description="Negociação fechada e líquida. Compra/venda de tokens rápida, simples e segura. Mais liquidez e oportunidades."
                  image="/image-2.png"
                  iconImage="/icons/moneys.svg"
                />
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[380px] h-auto">
                <EcosystemCard
                  icon={Wallet}
                  category="Aplicativo"
                  title="Gestão Centralizada do Imóvel"
                  description="Centralização via app: IPTU, condomínio e aluguéis. Gestão simplificada e adimplência garantida."
                  image="/image-3.png"
                  iconImage='/icons/mobile.svg'
                />
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[380px] h-auto">
                <EcosystemCard
                  icon={CheckCircle}
                  category="Segurança"
                  title="Modelo Jurídico Robusto:"
                  description="Compliance com o registro brasileiro. Token atrelado à matrícula em cartório. Máxima segurança jurídica."
                  image="/image-4.png"
                />
              </div>
            </div>
          </div>
        </ResponsiveContainer>

        {/* Carrossel - abaixo de 1700px fica fora do ResponsiveContainer */}
        <div className="2xl:hidden relative">
          {/* Shadow gradient à direita para indicar mais conteúdo */}
          {showRightArrow && (
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10 bg-gradient-to-l from-[#F5F5F5] to-transparent"></div>
          )}

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'auto'
            }}
          >
            <div className="flex gap-4 md:gap-6 lg:gap-8 snap-x snap-mandatory pl-6 md:pl-12 lg:pl-24 pr-6 md:pr-12 lg:pr-24">
              <div className="flex-shrink-0 w-[350px] md:w-[380px] snap-start h-auto">
                <EcosystemCard
                  icon={Shield}
                  category="Segurança"
                  title="Tokenização e Custódia Segura"
                  description='Criação do "RG digital" na blockchain. Gestão em sua carteira digital exclusiva com controle total (Self-custody).'
                  image="/image-1.png"
                  iconImage='/icons/security.svg'
                />
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[380px] snap-start h-auto">
                <EcosystemCard
                  icon={BarChart3}
                  category="Compra e venda"
                  title="Marketplace Exclusivo"
                  description="Negociação fechada e líquida. Compra/venda de tokens rápida, simples e segura. Mais liquidez e oportunidades."
                  image="/image-2.png"
                  iconImage="/icons/moneys.svg"
                />
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[380px] snap-start h-auto">
                <EcosystemCard
                  icon={Wallet}
                  category="Aplicativo"
                  title="Gestão Centralizada do Imóvel"
                  description="Centralização via app: IPTU, condomínio e aluguéis. Gestão simplificada e adimplência garantida."
                  image="/image-3.png"
                  iconImage='/icons/mobile.svg'
                />
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[380px] snap-start h-auto">
                <EcosystemCard
                  icon={CheckCircle}
                  category="Segurança"
                  title="Modelo Jurídico Robusto:"
                  description="Compliance com o registro brasileiro. Token atrelado à matrícula em cartório. Máxima segurança jurídica."
                  image="/image-4.png"
                  iconImage='/icons/radar.svg'
                />
              </div>
              {/* Espaçador final */}
              <div className="flex-shrink-0 w-4 md:w-8 lg:w-12"></div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Benefícios da Tokenização - Bento Grid */}
      <section id="beneficios-tokenizacao" className="py-16 md:py-20 lg:py-24 relative z-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-[1782px] mx-auto">
        <ResponsiveContainer maxWidth="content-lg">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
            <p className="text-xs md:text-sm font-semibold text-black text-center">
              Incorporadora
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center">
              Benefícios da tokenização
            </h2>
            <p className="text-base md:text-xl text-gray-600 text-center max-w-2xl">
              Conheça mais sobre os benefícios da tokenização imobiliária.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-colors font-semibold text-sm md:text-base group"
            >
              Comece a tokenizar
              <img
                src="/icons/arrow-right.svg"
                alt="Arrow"
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Bento Grid - Responsivo */}
          <div className="grid grid-cols-1 lg:flex lg:flex-row gap-4 lg:gap-8">
            {/* Coluna 1: Menos taxas (260px) + Use imóvel como garantia (528px) - 686px width */}
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-[686px]">
              <BentoCard
                name="Menos taxas, mais economia."
                className="h-[260px] w-full"
                description="Com a Prisma, reduza drasticamente custos de cartório e ITBI. Uma transação de R$20 mil em taxas pode custar apenas uma fração disso."
                illustration="/group-1.png"
                imagePosition="top"
                imageSize={{ width: 333, height: 190 }}
                customPadding="p-0"
                textMarginTop="-mt-10"
                imageMarginTop="-mt-4"
              />
              <BentoCard
                name="Use seu imóvel como garantia, sem travá-lo."
                className="h-[528px] w-full"
                description="Ofereça só uma parte do imóvel como garantia e mantenha o restante livre. Crédito rápido, barato e inteligente."
                illustration="/group-2.png"
                imageSize={{ width: 367, height: 273 }}
              />
            </div>

            {/* Coluna 2: Compre ou venda (528px) + 90 segundos (260px) - 400px width */}
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-[400px]">
              <BentoCard
                name="Compre ou venda apenas o que precisar."
                className="h-[528px] w-full"
                description="Invista a partir de R$5.000 ou venda frações do seu patrimônio. A Prisma torna imóveis acessíveis e líquidos."
                illustration="/group-3.png"
                backgroundText={"RMwJwEfjhzORXhN7wNhywrfT4jNfozqtAXHdpMSvZDDmHUM4x7rp0nuDL\ndjFO7HRk20mk1XLNkoK3S2ejFNhq3N8fHwnSJOTrS5QZA8gALfSixn1IC\nRrRsbIhpABUAOuqXokfs19AcdBiD3jTf224wagEpYv7hqDFKbjTZ6Yydz\n0tKfMDZI11ZuT1GyR1aD6DCHmK07GSfLPaxiT3K5e26NbGNxTS0BzncUQ\nvCOljoqTyMBhJ4bDqoVj2Uc40g4hAnrsX6Sr3b"}
                backgroundTextOpacity={0.12}
                backgroundTextStyle={{
                  position: 'absolute',
                  width: '100%',
                  left: '0',
                  bottom: '150px',
                  fontFamily: 'Menlo',
                  fontWeight: 400,
                  fontSize: '9.8px',
                  lineHeight: '14px',
                  textAlign: 'center',
                  letterSpacing: '1px',
                  color: 'rgba(55, 55, 60, 1)',
                }}
              />
              <BentoCard
                name="De 90 dias para 90 segundos."
                className="h-auto max-h-[270px] w-full"
                description="Transfira a titularidade do imóvel quase instantaneamente, com total segurança jurídica."
                illustration="/group-6.png"
                imagePosition="top"
                customPadding="p-0"
                textMarginTop='-mt-28'
              />
            </div>

            {/* Coluna 3: Royalty (topo) + Crowdfunding (embaixo) - 626px width */}
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-[626px]">
              <BentoCard
                name="Royalty vitalício para parceiros."
                className="h-auto max-h-[260px] w-full"
                description="Incorporadoras e imobiliárias ganham porcentagens em todas as futuras transações do imóvel tokenizado."
                illustration="/group-4.png"
                imagePosition="top"
                imageSize={{ width: 305, height: 143 }}
                customPadding="p-0"
                textMarginTop="mt-2"
                imageMarginTop="-mt-4"
              />
              <BentoCard
                name="Crowdfunding Simplificado"
                className="h-[528px] w-full"
                description="Financie projetos com múltiplos investidores, menos custos e total segurança."
                illustration="/group-5.png"
                imageSize={{ width: 375, height: 336 }}
              />
            </div>
          </div>
        </ResponsiveContainer>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section id="faq" className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F5F5F5', paddingBottom: '8.75rem' }}>
        <div className="max-w-[1782px] mx-auto">
        <div className="max-w-[895px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 md:mb-16 lg:mb-[72px]">
            <p className="text-base font-medium text-black">
              Perguntas Frequentes
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] lg:leading-[53px] font-semibold text-black text-center">
              Tire suas dúvidas
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="flex flex-col gap-8">
            {/* FAQ Item 1 */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                className="flex justify-between items-start py-4 group w-full"
              >
                <span className="text-lg md:text-xl lg:text-[22px] lg:leading-[26px] font-medium text-left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  A tokenização de imóveis é segura e tem validade jurídica?
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 transform transition-transform ${openFaq === 0 ? 'rotate-0' : 'rotate-180'}`}>
                  <path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.07999 15.05" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === 0 && (
                <div className="pb-4 text-base md:text-lg" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  Sim, é segura e juridicamente válida. A Prisma não substitui o sistema de cartórios, mas trabalha em conjunto com ele. Todo imóvel tokenizado em nossa plataforma tem seu "espelho digital" (o token) atrelado à matrícula oficial do imóvel por meio de um registro em cartório. Isso cria um vínculo inquestionável entre o ativo físico e o digital, garantindo que quem detém o token tem os direitos sobre o imóvel, conforme definido nos contratos. Nossa operação segue as melhores práticas e estruturas legais validadas no Brasil.​
                </div>
              )}
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
            </div>

            {/* FAQ Item 2 */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="flex justify-between items-start py-4 group w-full"
              >
                <span className="text-lg md:text-xl lg:text-[22px] lg:leading-[26px] font-medium text-left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  Como a Prisma garante a segurança da tecnologia?
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 transform transition-transform ${openFaq === 1 ? 'rotate-0' : 'rotate-180'}`}>
                  <path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.07999 15.05" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="pb-4 text-base md:text-lg" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  A segurança é nosso pilar. Utilizamos a tecnologia blockchain, a mesma por trás das maiores criptomoedas do mundo, que garante imutabilidade e transparência em todas as transações. Nossos contratos inteligentes (smart contracts) passam por rigorosas auditorias de segurança independentes antes de serem implementados. Além disso, sua carteira digital na Prisma é protegida com as mais modernas tecnologias de custódia e criptografia.
                </div>
              )}
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
            </div>

            {/* FAQ Item 3 */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="flex justify-between items-start py-4 group w-full"
              >
                <span className="text-lg md:text-xl lg:text-[22px] lg:leading-[26px] font-medium text-left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  Preciso entender de criptomoedas para usar a Prisma?
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 transform transition-transform ${openFaq === 2 ? 'rotate-0' : 'rotate-180'}`}>
                  <path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.07999 15.05" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="pb-4 text-base md:text-lg" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  Não. Nossa plataforma foi desenhada para ser intuitiva e amigável, abstraindo toda a complexidade técnica. Você negociará imóveis e frações de forma tão simples quanto usar um aplicativo de banco digital. A tecnologia blockchain funciona nos bastidores para garantir a segurança, mas sua experiência será focada no mercado imobiliário.
                </div>
              )}
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
            </div>

            {/* FAQ Item 4 */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="flex justify-between items-start py-4 group w-full"
              >
                <span className="text-lg md:text-xl lg:text-[22px] lg:leading-[26px] font-medium text-left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  Como funciona a tributação sobre os ganhos com tokens imobiliários?
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 transform transition-transform ${openFaq === 3 ? 'rotate-0' : 'rotate-180'}`}>
                  <path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.07999 15.05" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === 3 && (
                <div className="pb-4 text-base md:text-lg" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  A tributação segue regras análogas às de outros criptoativos e investimentos imobiliários. Ganhos de capital na venda dos tokens e rendimentos de aluguel recebidos devem ser declarados no Imposto de Renda. A Prisma fornecerá todos os extratos e informações necessárias para facilitar sua declaração, e recomendamos sempre o acompanhamento de um contador especializado para garantir a conformidade fiscal.
                </div>
              )}
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
            </div>

            {/* FAQ Item 5 */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="flex justify-between items-start py-4 group w-full"
              >
                <span className="text-lg md:text-xl lg:text-[22px] lg:leading-[26px] font-medium text-left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  Qual a diferença entre tokenização e um Fundo Imobiliário (FII)?
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 transform transition-transform ${openFaq === 4 ? 'rotate-0' : 'rotate-180'}`}>
                  <path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.07999 15.05" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === 4 && (
                <div className="pb-4 text-base md:text-lg" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  Embora ambos permitam investir em imóveis com menos capital, a tokenização oferece mais vantagens. Com tokens, você pode ter direitos diretos sobre um imóvel específico, e não apenas uma cota de um fundo com vários ativos. A negociação de tokens ocorre 24/7 em nosso marketplace, com mais agilidade, menos intermediários e custos operacionais muito menores do que os de um FII, que possui taxas de administração, performance e outras.​
                </div>
              )}
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
            </div>

            {/* FAQ Item 6 */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="flex justify-between items-start py-4 group w-full"
              >
                <span className="text-lg md:text-xl lg:text-[22px] lg:leading-[26px] font-medium text-left" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  O que acontece se a Prisma deixar de existir?
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 transform transition-transform ${openFaq === 5 ? 'rotate-0' : 'rotate-180'}`}>
                  <path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.07999 15.05" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === 5 && (
                <div className="pb-4 text-base md:text-lg" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  Como o registro do token está atrelado à matrícula do imóvel no cartório e registrado de forma imutável na blockchain, seus direitos de propriedade estão garantidos independentemente da continuidade da Prisma. O contrato inteligente que rege o ativo continua existindo na rede blockchain, e a governança definida nele assegura que os detentores dos tokens mantenham o controle sobre o ativo subjacente.
                </div>
              )}
              <div className="w-full h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
            </div>
          </div>
        </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black py-16 relative z-20">
        <div className="max-w-[1782px] mx-auto">
        <ResponsiveContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 mb-12 md:mb-16">
            {/* Coluna 1 - Logo, Endereço e Contato - Hidden no mobile */}
            <div className="hidden md:block">
              <img src="/LogoPrismaWhite.svg" alt="Prisma" className="h-6 mb-12" />

              <div className="space-y-12">
                <div className="space-y-3">
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Rua Torrence Capital 123</p>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Sala 102</p>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>São Paulo, SP</p>
                </div>

                <div className="flex gap-12">
                  <div>
                    <p className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Número de Telefone</p>
                    <p className="text-sm text-white">1-800-201-1019</p>
                  </div>

                  <div>
                    <p className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>E-mail</p>
                    <p className="text-sm text-white">contato@prisma.club</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 2 - Sobre nós */}
            <div>
              <h3 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Sobre nós</h3>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Conheça a Prisma</a></li>
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Segurança na Prisma</a></li>
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Regiões</a></li>
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Central de Ajuda</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Produtos */}
            <div>
              <h3 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Produtos</h3>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Indique um imóvel</a></li>
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Valor de tokenização</a></li>
              </ul>
            </div>

            {/* Coluna 4 - Trabalhe com a gente */}
            <div>
              <h3 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Trabalhe com a gente</h3>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Corretagem</a></li>
              </ul>
            </div>
          </div>

          {/* Logo e dados no mobile - aparece embaixo das colunas */}
          <div className="md:hidden mb-12">
            <img src="/LogoPrismaWhite.svg" alt="Prisma" className="h-5 mb-8" />

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Rua Torrence Capital 123</p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Sala 102</p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>São Paulo, SP</p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Número de Telefone</p>
                  <p className="text-xs text-white">1-800-201-1019</p>
                </div>

                <div>
                  <p className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>E-mail</p>
                  <p className="text-xs text-white">contato@prisma.club</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-12">
            <p className="text-xs md:text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              © 2025 Prisma. Todos os direitos reservados.
            </p>
          </div>
        </ResponsiveContainer>
        </div>
      </footer>
    </div>
  );
}
