import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, 
  Eye, 
  Clock, 
  Smartphone, 
  Shield, 
  Recycle 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            y: 80, 
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Detección Instantánea",
      description: "Identifica cada movimiento que se realice con la tapa",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Alerta Visual",
      description: "Sistema de iluminación LED que ayudará a las personas con alguna discapacidad visual",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Larga Duración",
      description: "Una tapa totalmente utilizable sin ningún tipo de obstáculo",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Conectividad Smart",
      description: "Conecta con tu smartphone para recibir alertas y estadísticas",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Resistente a cualquier ambiente",
      description: "Clasificación IP67 - perfecta para uso en cualquier ambiente",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Reutilizable",
      description: "Diseño ecológico con materiales reciclables y sensor renovable",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section id="caracteristicas" ref={featuresRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tecnología de Cuidado de tu Seguridad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Características avanzadas diseñadas para brindarte la máxima protección 
            y tranquilidad en cada momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className={`w-full h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;