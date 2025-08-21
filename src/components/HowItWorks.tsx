import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle as CircleCheck, Search, Bell, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

      // Animate steps
      stepsRef.current.forEach((step, index) => {
        gsap.fromTo(step,
          { 
            x: index % 2 === 0 ? -100 : 100, 
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            delay: index * 0.3,
            scrollTrigger: {
              trigger: step,
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

  const steps = [
    {
      number: "1",
      title: "Coloca la Tapa",
      description: "Simplemente coloca la tapa de DrinkCheck sobre tu bebida como cualquier tapa normal",
      icon: <CircleCheck className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "2",
      title: "Análisis Automático",
      description: "Los sensores analizan automáticamente si se detecta un movimiento en tu bebida",
      icon: <Search className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "3",
      title: "Resultado Inmediato",
      description: "La tapa se ilumina y empezará a sonar en segundos",
      icon: <Bell className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      number: "4",
      title: "Decisión Informada",
      description: "Toma la decisión correcta basada en información confiable y precisa que brinda DrinkCheck",
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="como-funciona" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cómo Funciona DrinkCheck
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnología simple pero poderosa que te protege en 4 pasos sencillos
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div 
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block origin-top"
          />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 max-w-md">
                  <div className={`bg-gradient-to-r ${step.color} text-white rounded-2xl p-8 shadow-xl`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        {step.icon}
                      </div>
                      <div className="text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg opacity-90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step indicator for mobile */}
                <div className="md:hidden w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>

                {/* Desktop step indicator */}
                <div className="hidden md:block relative">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10 relative`}>
                    {step.number}
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full animate-pulse opacity-30`} />
                </div>

                <div className="flex-1 max-w-md md:hidden" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;