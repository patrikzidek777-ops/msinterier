import { useEffect, useState, useRef } from "react";
import { Utensils, DoorOpen, Hammer, Sparkles, Home as HomeIcon, ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { TbWood } from "react-icons/tb";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

const woodMaterials = [
  { name: "Egger Dub Halifax", hex: "#bda085" },
  { name: "Egger Dub Kendal", hex: "#c8a780" },
  { name: "Egger Dub Davos", hex: "#d2b08a" },
  { name: "Egger Dub Hamilton", hex: "#a47653" },
  { name: "Egger Hickory", hex: "#c59b71" },
  { name: "Egger Orech Dijon", hex: "#865e43" },
  { name: "Kronospan Dub Zlatý", hex: "#b88a5d" },
  { name: "Kronospan Dub Biely", hex: "#d3c4b3" },
  { name: "Kronospan Dub Tabakový", hex: "#664f3e" },
  { name: "Kronospan Jaseň Lyon", hex: "#c8b7a6" },
  { name: "Kronospan Orech", hex: "#4a3424" },
  { name: "Kronospan Borovica", hex: "#d8d0c8" }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeWood, setActiveWood] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reviewsSectionRef = useRef<HTMLElement>(null);
  const userInteracted = useRef(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      userInteracted.current = true;
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      userInteracted.current = true;
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Loader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Scroll reveal observer
    const animatedItems = document.querySelectorAll(".reveal, .scroll-motion, .cinematic-section, .heading-slide");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "active");
        } else {
          // Remove this else block to prevent animations from reversing when scrolling back up
          // This makes it much smoother on mobile
          // entry.target.classList.remove("show", "active");
        }
      });
    }, { threshold: window.innerWidth < 768 ? 0.05 : 0.18 });

    animatedItems.forEach(item => observer.observe(item));

    // Parallax effect
    const parallaxCards = document.querySelectorAll(".parallax-card");
    let ticking = false;

    function scrollParallax() {
      // Disable parallax on mobile to prevent scrolling lag
      if (window.innerWidth < 768) {
        parallaxCards.forEach((card) => {
          (card as HTMLElement).style.transform = 'none';
        });
        ticking = false;
        return;
      }

      const viewportHeight = window.innerHeight;

      parallaxCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const progress = (rect.top - viewportHeight / 2) / viewportHeight;

        const speed = index % 2 === 0 ? 28 : -28;
        const move = progress * speed;

        (card as HTMLElement).style.transform = `translate3d(0, ${move}px, 0)`;
      });

      ticking = false;
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(scrollParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    scrollParallax(); // Initial call

    // Reviews auto-scroll
    let animationFrameId: number;
    let isHovered = false;
    
    const autoScrollReviews = () => {
      if (scrollContainerRef.current && !isHovered && !userInteracted.current) {
        scrollContainerRef.current.scrollLeft += 0.5; // Speed
        // Reset if reached end
        if (scrollContainerRef.current.scrollLeft >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 1) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScrollReviews);
    };
    
    animationFrameId = requestAnimationFrame(autoScrollReviews);
    
    const pauseScroll = () => { isHovered = true; };
    const resumeScroll = () => { isHovered = false; };
    
    const scroller = scrollContainerRef.current;
    if (scroller) {
      scroller.addEventListener('mouseenter', pauseScroll);
      scroller.addEventListener('mouseleave', resumeScroll);
      scroller.addEventListener('touchstart', pauseScroll);
      scroller.addEventListener('touchend', resumeScroll);
    }

    // Reset interaction on section enter
    const reviewsSection = reviewsSectionRef.current;
    const reviewsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          userInteracted.current = false;
        }
      });
    }, { threshold: 0.1 });

    if (reviewsSection) {
      reviewsObserver.observe(reviewsSection);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      reviewsObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
      if (scroller) {
        scroller.removeEventListener('mouseenter', pauseScroll);
        scroller.removeEventListener('mouseleave', resumeScroll);
        scroller.removeEventListener('touchstart', pauseScroll);
        scroller.removeEventListener('touchend', resumeScroll);
      }
    };
  }, []);

  return (
    <div className="relative bg-[#1a0e08] min-h-screen text-white font-sans selection:bg-[#a67c52] selection:text-white overflow-hidden">
      <div className="grain" />

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-[#0d0704] flex items-center justify-center transition-all duration-1000 ease-in-out">
          <img src="/logo.jpg" alt="MS Interiér" className="w-[220px] rounded-md shadow-2xl animate-[logoIntro_1.4s_ease_forwards]" />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full px-6 md:px-[7%] py-4 flex justify-between items-center z-[1000] bg-[#1a0e08]/60 backdrop-blur-md border-b border-[#a67c52]/20">
        <img src="/logo.jpg" alt="MS Interiér Logo" className="w-14 h-14 object-cover rounded-sm shadow-md" />
        <div className="hidden md:flex items-center gap-8">
          {['O nás', 'Služby', 'Vyberte si odtieň', 'Realizácie', 'Postup', 'Kontakt'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '')}`}
              className="text-[#f5efe7] text-sm uppercase tracking-wider hover:text-[#a67c52] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#f5efe7] hover:text-[#a67c52] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1a0e08]/95 backdrop-blur-xl border-b border-[#a67c52]/20 flex flex-col items-center py-6 gap-6 md:hidden">
            {['O nás', 'Služby', 'Vyberte si odtieň', 'Realizácie', 'Postup', 'Kontakt'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#f5efe7] text-lg uppercase tracking-wider hover:text-[#a67c52] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="domov" className="relative min-h-screen flex items-center justify-center text-center px-6 md:px-[7%] pt-24 reveal scroll-motion cinematic-section">
        {/* Background Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e08]/60 to-[#1a0e08]/95 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(26,14,8,0.85))] z-10" />
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80"
            alt="Interior Background"
            className="w-full h-full object-cover fixed smooth-image"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <img src="/logo.jpg" alt="MS Interiér Logo" className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-10 rounded-md shadow-[0_35px_100px_rgba(0,0,0,0.75)] object-cover" />
          
          <div className="flex justify-center mb-6">
            <div className="text-spinner-card">
              <div className="loader">
                <p>Vyrábame</p>
                <div className="words">
                  <span className="word">nábytok.</span>
                  <span className="word">kuchyne.</span>
                  <span className="word">skrine.</span>
                  <span className="word">interiéry.</span>
                  <span className="word">nábytok.</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[92px] font-bold leading-[0.9] tracking-tighter mb-8">
            Remeslo s charakterom.
          </h1>
          <p className="text-[#dcd0c5] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Vyrábame a montujeme drevené riešenia, ktoré spájajú remeslo, detail a nadčasový dizajn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#služby" className="inline-block px-8 py-4 rounded-full border border-[#a67c52] text-white text-sm uppercase tracking-wider bg-[#a67c52]/10 hover:bg-[#a67c52] hover:text-[#0d0704] hover:-translate-y-1 transition-all duration-300">
              Pozrieť služby
            </a>
            <a href="#kontakt" className="inline-block px-8 py-4 rounded-full border border-[#a67c52] text-white text-sm uppercase tracking-wider bg-[#a67c52]/10 hover:bg-[#a67c52] hover:text-[#0d0704] hover:-translate-y-1 transition-all duration-300">
              Kontaktovať
            </a>
          </div>
        </div>
      </section>

      {/* O Nás */}
      <section id="onás" className="py-20 md:py-32 px-6 md:px-[7%] relative z-10 bg-[#1a0e08] reveal scroll-motion cinematic-section">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="heading-slide text-4xl md:text-6xl lg:text-[82px] font-bold leading-[0.95] tracking-tighter mb-12">
              Remeslo, ktoré <span className="text-[#a67c52]">mení priestor</span>
            </h2>
            <p className="text-[#dcd0c5] text-lg leading-relaxed">
              MS Interiér sa venuje výrobe nábytku na mieru, montáži interiérov
              a práci s drevom. Každý projekt riešime individuálne podľa priestoru,
              potrieb a štýlu zákazníka. Dôraz kladieme na presnosť, kvalitné materiály
              a čisté prevedenie.
            </p>
          </div>
          <div className="h-[400px] md:h-[560px] rounded-[30px] overflow-hidden shadow-[0_40px_110px_rgba(0,0,0,0.65)] group parallax-card border border-[#a67c52]/10 card">
            <img
              src="/craftsmanship.jpg"
              alt="Craftsmanship"
              className="w-full h-full object-cover smooth-image"
            />
            <div className="card__content">
              <p className="card__title">Precízna výroba</p>
              <p className="card__description">Každý kus nábytku prechádza starostlivým procesom výroby. Od presného zamerania, cez výber najlepších materiálov, až po samotnú montáž na mieste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Služby */}
      <section id="služby" className="py-20 md:py-32 px-6 md:px-[7%] relative z-10 bg-[#1a0e08] reveal scroll-motion cinematic-section">
        <h2 className="heading-slide text-4xl md:text-6xl lg:text-[82px] font-bold leading-[0.95] tracking-tighter mb-16">
          Naše <span className="text-[#a67c52]">služby</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Utensils size={32} />, title: "Kuchyne na mieru", desc: "Moderné a funkčné kuchyne navrhnuté presne podľa vášho priestoru a spôsobu používania." },
            { icon: <DoorOpen size={32} />, title: "Vstavané skrine", desc: "Elegantné riešenia, ktoré maximálne využijú priestor a pôsobia čisto v každom interiéri." },
            { icon: <TbWood size={32} />, title: "Nábytok na mieru", desc: "Obývacie steny, komody, kancelárie, detské izby a individuálne riešenia z dreva." },
            { icon: <Hammer size={32} />, title: "Montáž interiérov", desc: "Kompletná realizácia interiérových prvkov s dôrazom na detail, presnosť a čistý výsledok." },
            { icon: <Sparkles size={32} />, title: "Drevené obklady", desc: "Schody, obklady, dekorácie a dizajnové drevené prvky, ktoré dodajú priestoru charakter." },
            { icon: <HomeIcon size={32} />, title: "Kompletné interiéry", desc: "Riešenia od návrhu až po montáž pre domácnosti, prevádzky a firemné priestory." }
          ].map((service, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-[#a67c52]/20 rounded-[28px] p-8 min-h-[260px] hover:-translate-y-3 hover:border-[#a67c52]/60 hover:shadow-[0_35px_90px_rgba(0,0,0,0.45)] transition-all duration-500 overflow-hidden parallax-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a67c52]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-[#a67c52] mb-6">{service.icon}</div>
              <h3 className="relative z-10 text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="relative z-10 text-[#dcd0c5] leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vzorkovník Farieb */}
      <section id="vybertesiodtieň" className="py-20 md:py-32 px-6 md:px-[7%] relative z-10 bg-[#150b06] reveal scroll-motion cinematic-section border-y border-[#a67c52]/10 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          
          <div className="order-2 lg:order-1 relative h-[600px] md:h-[800px] flex items-center justify-start w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(166,124,82,0.05),transparent_60%)] pointer-events-none" />
            
            {/* Half circle on the left edge */}
            <div className="absolute left-[-24px] md:left-[calc(-7vw)] top-1/2 -translate-y-1/2 w-[320px] md:w-[480px] h-full flex items-center">
              
              {/* The anchor / hinge */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50px] md:w-[80px] h-[400px] bg-[#0d0704] border-y border-r border-[#a67c52]/30 rounded-r-full shadow-[10px_0_30px_rgba(0,0,0,0.8)] z-[200] flex items-center justify-center">
                <div className="h-[70%] w-1.5 md:w-2 bg-[#a67c52]/20 rounded-full shadow-inner" />
              </div>

              {woodMaterials.map((wood, i, arr) => {
                const total = arr.length;
                // Distribute angles evenly from -75 to 75 degrees
                const angle = -75 + (150 / (total - 1)) * i;
                
                return (
                  <div 
                    key={i}
                    className="absolute left-0 top-1/2 -translate-y-1/2 origin-left transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] z-10 w-[320px] md:w-[460px] transform-gpu will-change-transform"
                    style={{ 
                      transform: `rotate(${angle}deg)`
                    }}
                  >
                    <div 
                      className="absolute right-0 w-[270px] md:w-[410px] h-[60px] md:h-[75px] rounded-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-2 border-white/10 hover:w-[310px] md:hover:w-[460px] hover:translate-x-[20px] hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(166,124,82,0.4)] hover:border-[#a67c52] hover:z-[100] flex items-center justify-end pr-6 overflow-hidden transform-gpu will-change-transform will-change-[width]"
                      style={{ 
                        backgroundColor: wood.hex, 
                        backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
                        backgroundSize: '100px'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget.parentNode as HTMLElement).style.zIndex = '100';
                        document.documentElement.style.setProperty('--table-color', wood.hex);
                        document.documentElement.style.setProperty('--overlay-opacity', '1');
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget.parentNode as HTMLElement).style.zIndex = '10';
                        if (activeWood !== i && activeWood === null) {
                          document.documentElement.style.setProperty('--overlay-opacity', '0');
                        } else if (activeWood !== null) {
                          // Revert to active wood
                          const activeHex = woodMaterials[activeWood].hex;
                          document.documentElement.style.setProperty('--table-color', activeHex);
                        }
                      }}
                      onClick={() => {
                        setActiveWood(i);
                        document.documentElement.style.setProperty('--table-color', wood.hex);
                        document.documentElement.style.setProperty('--overlay-opacity', '1');
                      }}
                    >
                      {/* Name label on the swatch */}
                      <span 
                        className={`text-[11px] md:text-sm font-bold tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase transition-all duration-500 ${activeWood === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}
                      >
                        {wood.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Desktop radius override using a hidden wrapper trick, but we can just use tailwind classes on a wrapper */}
            {/* The radius is controlled by the width of the rotated wrapper above. 
                We can't easily do responsive inline styles, so let's adjust it by scaling the whole container on md: */}
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="heading-slide text-4xl md:text-5xl lg:text-[72px] font-bold leading-[0.95] tracking-tighter mb-8">
              Vyberte si <span className="text-[#a67c52]">odtieň</span>
            </h2>
            <p className="text-[#dcd0c5] text-lg leading-relaxed mb-10">
              Vyskúšajte si, ako by vyzeral váš nový kúsok nábytku v rôznych odtieňoch. Prejdite myšou cez náš <strong>špirálový vzorkovník</strong> a sledujte okamžitú zmenu textúry dreva na vizualizácii.
            </p>
            
            <div className="relative w-full max-w-[656px] mx-auto rounded-[30px] overflow-hidden bg-[#0d0704] border border-[#a67c52]/20 parallax-card group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none z-30" />
              
              {/* Base Image */}
              <img 
                src="/living-room-simple.png" 
                alt="Living Room"
                className="relative w-full h-auto block z-10"
              />
              
              {/* Overlay with inline SVG masking for 100% precision on mobile */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ease-out"
                style={{ opacity: 'var(--overlay-opacity, 0)' }}
              >
                <svg viewBox="0 0 656 398" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
                  <defs>
                    <mask id="wood-mask" maskContentUnits="objectBoundingBox">
                      {/* 1. Wood slats wall */}
                      <rect x="0.147" y="0.000" width="0.236" height="0.880" fill="white" />
                      
                      {/* 2. TV Stand */}
                      <rect x="0.245" y="0.744" width="0.448" height="0.165" fill="white" /> 
                      <rect x="0.225" y="0.744" width="0.050" height="0.022" fill="white" />

                      {/* Dark gray doors exclusion */}
                      <rect x="0.275" y="0.772" width="0.413" height="0.048" fill="black" />
                      
                      {/* 3. Shelves */}
                      <rect x="0.672" y="0.158" width="0.096" height="0.488" fill="white" />
                      <rect x="0.758" y="0.258" width="0.097" height="0.495" fill="white" />

                      <rect x="0.672" y="0.158" width="0.015" height="0.015" fill="black" />
                      <rect x="0.672" y="0.631" width="0.015" height="0.015" fill="black" />
                      <rect x="0.758" y="0.740" width="0.097" height="0.015" fill="black" />

                      {/* EXCLUSIONS */}
                      <rect x="0.362" y="0.510" width="0.243" height="0.234" fill="black" />
                      <rect x="0.435" y="0.740" width="0.090" height="0.010" fill="black" />
                    </mask>
                  </defs>

                  {/* Grayscale base to normalize original wood color - balanced for light and dark colors */}
                  <image 
                    href="/living-room-simple.png" 
                    width="100%" 
                    height="100%" 
                    preserveAspectRatio="none" 
                    mask="url(#wood-mask)"
                    style={{ WebkitFilter: 'grayscale(100%) brightness(1.25)', filter: 'grayscale(100%) brightness(1.25)' }}
                  />
                  
                  {/* The Color multiply layer */}
                  <rect 
                    width="100%" 
                    height="100%" 
                    mask="url(#wood-mask)"
                    fill="var(--table-color, transparent)"
                    style={{ mixBlendMode: 'multiply' }}
                    className="transition-colors duration-500 ease-out"
                  />
                  
                  {/* Highlight/shadow recovery layer - using soft-light to not blow out light colors */}
                  <image 
                    href="/living-room-simple.png" 
                    width="100%" 
                    height="100%" 
                    preserveAspectRatio="none" 
                    mask="url(#wood-mask)"
                    style={{ WebkitFilter: 'grayscale(100%)', filter: 'grayscale(100%)', mixBlendMode: 'soft-light', opacity: 0.6 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Realizácie */}
      <section id="realizácie" className="py-20 md:py-32 px-6 md:px-[7%] relative z-10 bg-[#1a0e08] reveal scroll-motion cinematic-section">
        <div className="mb-16">
          <h2 className="heading-slide text-4xl md:text-6xl lg:text-[82px] font-bold leading-[0.95] tracking-tighter mb-4">
            Každý detail má <span className="text-[#a67c52]">svoj význam</span>
          </h2>
          <span className="text-[#dcd0c5] text-xl md:text-2xl font-light italic tracking-wide">(Niečo z našej kolekcie)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            "/gallery-1.jpg",
            "/gallery-2.jpg",
            "/gallery-3.jpg",
            "/gallery-4.jpg",
            "/gallery-5.jpg",
            "/gallery-6.jpg"
          ].map((src, i) => (
             <div key={i} className={`parallax-card overflow-hidden rounded-[24px] border border-[#a67c52]/10 ${(i === 0 || i === 4) ? 'h-[330px] md:h-[520px]' : 'h-[330px] md:h-[360px]'} ${(i === 1 || i === 2) ? 'mt-0 md:mt-auto' : ''} ${(i === 3 || i === 5) ? 'mb-0 md:mb-auto' : ''} ${i % 2 === 0 ? 'animate-[floatUp_8s_ease-in-out_infinite]' : 'animate-[floatDown_8s_ease-in-out_infinite]'} ${!src ? 'bg-[#a67c52]/5 animate-pulse' : ''}`}>
              {src && <img src={src} loading="lazy" alt={`Gallery ${i}`} className="w-full h-full object-cover brightness-75 hover:brightness-100 smooth-image" />}
             </div>
          ))}
        </div>
      </section>

      {/* Postup */}
      <section id="postup" className="py-20 md:py-32 px-6 md:px-[7%] relative z-10 bg-[#1a0e08] reveal scroll-motion cinematic-section">
        <h2 className="heading-slide text-4xl md:text-6xl lg:text-[82px] font-bold leading-[0.95] tracking-tighter mb-16">
          Postup <span className="text-[#a67c52]">spolupráce</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { num: "01", title: "Konzultácia", desc: "Prejdeme si vaše predstavy, rozmery a možnosti priestoru." },
            { num: "02", title: "Návrh riešenia", desc: "Navrhneme praktické a estetické riešenie podľa vašich potrieb." },
            { num: "03", title: "Výroba", desc: "Vyrobíme jednotlivé prvky s dôrazom na kvalitu a detail." },
            { num: "04", title: "Montáž", desc: "Postaráme sa o odbornú montáž priamo u vás." },
            { num: "05", title: "Odovzdanie", desc: "Projekt odovzdáme pripravený na používanie." }
          ].map((step, i) => (
            <div key={i} className="p-8 border-l border-[#a67c52] bg-white/[0.03] rounded-r-[20px] parallax-card">
              <div className="text-[#a67c52] text-[42px] font-black mb-4">{step.num}</div>
              <h3 className="text-[22px] font-semibold mb-3">{step.title}</h3>
              <p className="text-[#dcd0c5] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recenzie */}
      <section ref={reviewsSectionRef} className="py-20 md:py-32 relative z-10 bg-[#1a0e08] overflow-hidden reveal scroll-motion cinematic-section">
        <div className="flex justify-between items-end mb-16 px-6 md:px-[7%]">
          <h2 className="heading-slide text-4xl md:text-6xl lg:text-[82px] font-bold leading-[0.95] tracking-tighter">
            Recenzie <span className="text-[#a67c52]">zákazníkov</span>
          </h2>
          <div className="hidden md:flex gap-4">
            <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-[#a67c52]/30 flex items-center justify-center text-[#dcd0c5] hover:bg-[#a67c52] hover:text-white transition-all duration-300">
              <ArrowLeft size={24} />
            </button>
            <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-[#a67c52]/30 flex items-center justify-center text-[#dcd0c5] hover:bg-[#a67c52] hover:text-white transition-all duration-300">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <div ref={scrollContainerRef} className="flex overflow-x-auto hide-scrollbar pb-10 px-6 md:px-[7%] gap-6 md:gap-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { name: "Martin K.", city: "Považská Bystrica", text: "„Kuchyňa dopadla presne podľa predstáv. Výborná komunikácia a krásna práca.“", stars: 5 },
              { name: "Jana M.", city: "Žilina", text: "„Profesionálny prístup od návrhu až po montáž. Určite odporúčam.“", stars: 5 },
              { name: "Michal V.", city: "Dubnica nad Váhom", text: "„Všetko prebehlo v poriadku, malý sklz v dodaní materiálu, ale výsledok stojí za to.“", stars: 4 },
              { name: "Peter R.", city: "Trenčín", text: "„Kvalitné spracovanie, dodržané termíny a veľmi pekný výsledok.“", stars: 5 },
              { name: "Lucia S.", city: "Púchov", text: "„Krásna obývačková stena na mieru. Prístup na jednotku s hviezdičkou!“", stars: 5 },
              { name: "Zuzana T.", city: "Rajec", text: "„Veľmi pekná práca, skrinky sú kvalitné. Komunikácia mohla byť trošku rýchlejšia, inak super.“", stars: 4 },
              { name: "Tomáš B.", city: "Bytča", text: "„Montáž prebehla hladko a bez problémov. Detaily sú dotiahnuté k dokonalosti.“", stars: 5 },
              { name: "Veronika D.", city: "Ilava", text: "„Najlepšie rozhodnutie pre náš nový domov. Ďakujeme za skvelý prístup.“", stars: 5 }
            ].map((review, i) => (
              <div key={i} className="flex-none w-[85vw] sm:w-[400px] md:w-[450px] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-[#a67c52]/20 rounded-[28px] p-8 hover:border-[#a67c52]/60 hover:shadow-[0_35px_90px_rgba(0,0,0,0.45)] transition-all duration-500 whitespace-normal cursor-default">
                <div className="text-[#a67c52] text-2xl mb-4">
                  {review.stars === 5 ? '★★★★★' : '★★★★☆'}
                </div>
                <p className="text-[#dcd0c5] text-lg leading-relaxed mb-6">{review.text}</p>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {review.name}
                  <span className="text-sm text-[#dcd0c5]/60 font-normal">| {review.city}</span>
                </h3>
              </div>
            ))}
          </div>
          
          {/* Mobile Arrows */}
          <div className="flex md:hidden justify-center gap-6 mt-6 px-6">
            <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-[#a67c52]/30 flex items-center justify-center text-[#dcd0c5] hover:bg-[#a67c52] hover:text-white transition-all duration-300">
              <ArrowLeft size={24} />
            </button>
            <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-[#a67c52]/30 flex items-center justify-center text-[#dcd0c5] hover:bg-[#a67c52] hover:text-white transition-all duration-300">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-40 text-center bg-cover bg-center bg-fixed overflow-hidden reveal scroll-motion cinematic-section" style={{ backgroundImage: 'linear-gradient(rgba(26,14,8,0.78), rgba(26,14,8,0.92)), url("https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=80")' }}>
        <div className="relative z-10 px-6">
          <h2 className="heading-slide text-4xl md:text-6xl lg:text-[90px] font-bold leading-[0.95] tracking-tighter mb-10 max-w-5xl mx-auto">
            Máte predstavu? My ju premeníme na realitu.
          </h2>
          <a href="#kontakt" className="inline-block px-8 py-4 rounded-full border border-[#a67c52] text-white text-sm uppercase tracking-wider bg-[#a67c52]/10 hover:bg-[#a67c52] hover:text-[#0d0704] hover:-translate-y-1 transition-all duration-300">
            Kontaktujte nás
          </a>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="py-20 md:py-32 px-6 md:px-[7%] relative z-10 bg-[#1a0e08] reveal scroll-motion cinematic-section">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/[0.03] border border-[#a67c52]/20 rounded-[30px] p-10 parallax-card">
            <h3 className="text-4xl font-bold mb-8">Kontakt</h3>
            <p className="text-[#dcd0c5] text-lg leading-relaxed mb-6">
              <strong className="text-white block mb-1">Telefón:</strong>
              0917 776 400<br/>
              0902 067 303
            </p>
            <p className="text-[#dcd0c5] text-lg leading-relaxed mb-6">
              <strong className="text-white block mb-1">Email:</strong>
              msinterier233@gmail.com
            </p>
            <p className="text-[#dcd0c5] text-lg leading-relaxed mb-6">
              <strong className="text-white block mb-1">Adresa:</strong>
              Robotnícka, Považská Bystrica, Slovakia
            </p>
            <p className="text-[#dcd0c5] text-lg leading-relaxed mb-8">
              <strong className="text-white block mb-1">Instagram:</strong>
              @msinterier_
            </p>
            <p className="text-[#dcd0c5] text-lg leading-relaxed">
              Napíšte nám a radi s vami prejdeme vaše predstavy, možnosti aj ďalší postup.
            </p>
          </div>

          <form method="POST" action="https://chariotai.com/api/forms/submit" encType="multipart/form-data" className="bg-white/[0.03] border border-[#a67c52]/20 rounded-[30px] p-10 flex flex-col gap-4 parallax-card">
            <input type="hidden" name="_chariot_form_token" defaultValue="chf_U5q9sAseeE9o2YYnHP3ZfPsC_cNVh5C8" />
            <input type="hidden" name="_chariot_form_name" defaultValue="Kontakt formulár" />
            <input type="text" name="_chariot_honeypot" autoComplete="off" style={{ display: 'none' }} />

            <input type="text" name="name" required placeholder="Meno" className="w-full p-4 rounded-2xl border border-[#a67c52]/30 bg-[#0d0704]/50 text-white outline-none focus:border-[#a67c52] transition-colors" />
            <input type="tel" name="phone" placeholder="Telefón" className="w-full p-4 rounded-2xl border border-[#a67c52]/30 bg-[#0d0704]/50 text-white outline-none focus:border-[#a67c52] transition-colors" />
            <input type="email" name="email" required placeholder="Email" className="w-full p-4 rounded-2xl border border-[#a67c52]/30 bg-[#0d0704]/50 text-white outline-none focus:border-[#a67c52] transition-colors" />
            <textarea name="message" required rows={6} placeholder="Správa" className="w-full p-4 rounded-2xl border border-[#a67c52]/30 bg-[#0d0704]/50 text-white outline-none focus:border-[#a67c52] transition-colors resize-none" />
            <button type="submit" className="mt-2 inline-block px-8 py-4 rounded-full border border-[#a67c52] text-white text-sm uppercase tracking-wider bg-[#a67c52]/10 hover:bg-[#a67c52] hover:text-[#0d0704] hover:-translate-y-1 transition-all duration-300 w-fit cursor-pointer">
              Odoslať správu
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-[#a67c52]/20 bg-[#0d0704] relative z-10 reveal scroll-motion cinematic-section">
        <img src="/logo.jpg" alt="MS Interiér" className="w-20 h-20 mx-auto object-cover rounded-sm mb-6 shadow-md" />
        <p className="text-[#dcd0c5] mb-6">Výroba nábytku na mieru • Montáž interiérov • Drevené riešenia</p>
        <div className="flex justify-center gap-6 mb-8 text-[#dcd0c5]">
          <a href="https://www.facebook.com/interierms" target="_blank" rel="noopener noreferrer" className="hover:text-[#a67c52] transition-colors"><FaFacebook size={24} /></a>
          <a href="https://www.instagram.com/msinterier_" target="_blank" rel="noopener noreferrer" className="hover:text-[#a67c52] transition-colors"><FaInstagram size={24} /></a>
        </div>
        <p className="text-[#dcd0c5] text-sm opacity-60">© MS Interiér 2026</p>
      </footer>
    </div>
  );
}
