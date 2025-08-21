import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Settings, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Demo: React.FC = () => {
  const demoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: demoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="demo" ref={demoRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={contentRef} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Demo Interactivo
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experimenta la tecnología DrinkCheck en acción. Próximamente podrás probar 
            todas las funciones de detección y alertas en tiempo real.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo en Vivo</h3>
                  <p className="text-gray-600 text-center">
                    Prueba la detección en tiempo real
                  </p>
                </div>

                <div className="flex flex-col items-center p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Settings className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuración</h3>
                  <p className="text-gray-600 text-center">
                    Personaliza la sensibilidad
                  </p>
                </div>

                <div className="flex flex-col items-center p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Alertas</h3>
                  <p className="text-gray-600 text-center">
                    Visualiza las notificaciones
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl p-8 min-h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Demo Próximamente</h4>
                  <p className="text-gray-600 mb-6">
                    Estamos preparando una experiencia interactiva única para que puedas 
                    probar todas las funcionalidades de DrinkCheck.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Notificarme Cuando Esté Listo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;