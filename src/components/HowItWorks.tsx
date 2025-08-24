import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle as CircleCheck, Search, Bell, CheckCircle2, Cpu, Zap, Wifi } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const internalSystemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "Sistema Interno Inteligente"
      if (internalSystemRef.current) {
        const internalSystemElements = internalSystemRef.current.children;
        gsap.from(internalSystemElements, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: internalSystemRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

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
    <section id="como-funciona" ref={sectionRef} className="py-20 bg-transparent">
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
          {/* Internal System Showcase */}
          <div ref={internalSystemRef} className="mb-20 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Sistema Interno Inteligente</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Cpu className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Arduino</h4>
                <p className="text-gray-600 text-center text-sm">
                  Microcontrolador que procesa los datos de los sensores
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sensores</h4>
                <p className="text-gray-600 text-center text-sm">
                  Detectores de movimiento de alta precisión
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Wifi className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Conectividad</h4>
                <p className="text-gray-600 text-center text-sm">
                  Módulo Bluetooth para smartphone
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Observa el modelo 3D para ver los componentes internos</p>
            </div>
          </div>

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