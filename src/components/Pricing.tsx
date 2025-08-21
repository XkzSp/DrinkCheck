import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  Shield, 
  Star,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
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

  const plans = [
    {
      name: "DrinkCheck Basic",
      price: 95,
      description: "Perfecto para probar nuestro producto",
      features: [
        "Incluye la tapa de DrinkCheck",
        "Envase de 25 tiras visuales",
        "Un gotero",
        "Garantía 1 año"
      ],
      color: "from-blue-500 to-cyan-500",
      icon: <Shield className="w-8 h-8" />
    },
    {
      name: "DrinkCheck Pro",
      price: 135,
      description: "Para uso frecuente en eventos",
      features: [
        "Incluye la tapa de DrinkCheck",
        "Envase de tiras visibles",
        "Envase de tiras de brotes",
        "Un gotero",
        "Garantía 2 años"
      ],
      color: "from-purple-500 to-pink-500",
      icon: <Star className="w-8 h-8" />,
      popular: true
    },
    {
      name: "DrinkCheck Elite",
      price: 200,
      description: "Máxima protección",
      features: [
        "Incluye la tapa de DrinkCheck",
        "Envase de tiras visibles",
        "Envases de tiras con brotes",
        "Un gotero",
        "Guantes y frascos",
        "Garantía 3 años"
      ],
      color: "from-yellow-500 to-orange-500",
      icon: <Zap className="w-8 h-8" />
    }
  ];

  return (
    <section id="planes" ref={pricingRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Elige tu Plan de Protección
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Opciones flexibles para cada necesidad. Todos los planes incluyen 
            nuestra tecnología avanzada de detección.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 ${
                plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MÁS POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {plan.name}
                </h3>

                <p className="text-gray-600 text-center mb-6">
                  {plan.description}
                </p>

                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">USD</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : `bg-gradient-to-r ${plan.color} text-white`
                }`}>
                  Elegir Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            ¿Tienes dudas sobre qué plan elegir?
          </p>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Contáctanos para una consulta personalizada
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;