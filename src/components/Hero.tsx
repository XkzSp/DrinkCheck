import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.fromTo(buttonRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.9 }
      );

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Parallax effect
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div ref={titleRef}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DrinkCheck
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-4">
            Tapa de Seguridad Inteligente
          </h2>
        </div>

        <div ref={subtitleRef}>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tecnología avanzada de detección instantánea que protege tu bebida con 
            alertas LED y conectividad inteligente. Tu seguridad es nuestra prioridad.
          </p>
        </div>

        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToDemo}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
          >
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>Ver Demo</span>
          </button>
          
          <button className="border-2 border-white/30 hover:border-white/60 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
            Conocer Más
          </button>
        </div>

        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 cursor-pointer"
          onClick={scrollToDemo}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Desliza hacia abajo</span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;