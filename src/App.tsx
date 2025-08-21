import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ThreeScene from './components/ThreeScene';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Create smooth scroll behavior
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href')!);
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: target,
            ease: "power2.inOut"
          });
        }
      });
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="App">
      <ThreeScene />
      <Navigation />
      <main>
        <Hero />
        <Demo />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;