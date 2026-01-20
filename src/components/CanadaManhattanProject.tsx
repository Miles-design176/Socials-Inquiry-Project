'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Atom, Users, MapPin, Award, Globe, Calendar, ChevronRight, Zap, FlaskConical } from 'lucide-react';

function ImageBlock({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="space-y-3">
      <img
        src={src}
        alt={caption}
        className="rounded-xl border border-slate-200 shadow-md w-full h-auto"
      />
      <figcaption className="text-sm text-slate-600 leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}


export default function CanadaManhattanProject() {
  const [activeSection, setActiveSection] = useState('overview');
  const [nukePhase, setNukePhase] = useState<'idle' | 'falling' | 'exploded' | 'fading'>('idle');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navScrollRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'overview', title: 'Overview', icon: Atom },
    { id: 'background', title: 'Background', icon: Calendar },
    { id: 'tubealloys', title: 'Tube Alloys', icon: Users },
    { id: 'contributions', title: 'Contributions', icon: Award },
    { id: 'images', title: 'Images', icon: Globe },
    { id: 'chalkriver', title: 'Chalk River', icon: FlaskConical },
    { id: 'postwar', title: 'Post-War Era', icon: MapPin },
    { id: 'nonproliferation', title: 'Non-Proliferation', icon: Globe },
    { id: 'sources', title: 'Sources', icon: Globe }
  ];

  const cardDetails: Record<string, { title: string; content: string }> = {
    'montreal': {
      title: 'Montreal Laboratory',
      content: `The Montreal Laboratory was established in 1943 as a joint Canadian-British research effort to develop nuclear technology during World War II. The United States joined this initiative at the Quebec Conference in 1943.

Key Facts:
• Location: Montreal, Quebec, Canada
• Founded: 1943
• Partners: Canada, Britain, United States
• Purpose: Nuclear weapons research and development
• Staff: Approximately 50-100 scientists and engineers

The laboratory was instrumental in the Manhattan Project's success, providing crucial research into uranium enrichment and nuclear reactor design. Canadian scientists like George Laurence made significant contributions to nuclear chain reaction research.

The facility operated under tight security, with strict protocols to prevent information leaks to enemy nations. The Montreal Laboratory became a center of excellence for nuclear physics research.

Closure: The facility closed in 1946 as research operations consolidated at the new Chalk River Laboratory in Ontario, which offered better facilities and more space for continued nuclear research.`
    },
    'global': {
      title: 'Global Impact',
      content: `Canada's involvement in nuclear technology transformed the nation into a global leader in peaceful nuclear energy and non-proliferation efforts.

Post-War Evolution:
• Canada shifted focus from weapons to civilian nuclear research
• Developed the CANDU reactor design (1962), used worldwide
• Became a leading exporter of nuclear technology

Nuclear Energy:
• Nuclear power provides ~15% of Canada's electricity
• Canada has one of the world's safest nuclear programs
• CANDU reactors operate in multiple countries including India and Argentina

International Leadership:
• Active in the International Atomic Energy Agency (IAEA)
• Founding member of the Non-Proliferation Treaty (NPT)
• Advocate for nuclear disarmament and arms control

Scientific Contributions:
• Advanced medical isotope production for cancer treatment
• Led research in nuclear fusion technology
• Contributed to international nuclear safety standards

Non-Proliferation:
• Canada has never developed nuclear weapons post-WWII
• Strong export controls on nuclear materials
• Active in preventing nuclear terrorism and weapons development
• Supporter of comprehensive test ban treaties

Legacy: Canada's commitment to peaceful nuclear technology demonstrates that nations can harness nuclear power for humanitarian purposes while maintaining strict international safeguards.`
    }
  };

  // Helper function to create random explosion directions
  const getExplosionStyle = (index: number) => {
    if (nukePhase !== 'exploded') return {};
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const angle = angles[index % angles.length];
    const distance = 800 + Math.random() * 400;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * distance;
    const y = Math.sin(rad) * distance;
    return {
      animation: `explosion 1.5s ease-out forwards`,
      '--explode-x': `${x}px`,
      '--explode-y': `${y}px`,
    } as React.CSSProperties & { '--explode-x': string; '--explode-y': string };
  };

  const filteredContent = selectedCard && cardDetails[selectedCard] 
    ? cardDetails[selectedCard].content
        .split('\n')
        .filter(line => 
          searchQuery === '' || 
          line.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .join('\n')
    : '';

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCard) {
        setSelectedCard(null);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedCard]);

    // Handle scroll arrows visibility
  useEffect(() => {
    const handleScroll = () => {
      if (navScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const navElement = navScrollRef.current;
    if (navElement) {
      navElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (navElement) {
        navElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Auto-fade back to normal after explosion
  useEffect(() => {
    if (nukePhase === 'exploded') {
      // Wait for explosion to finish (4s mushroom animation) + 1s pause, then fade back
      const fadeTimer = setTimeout(() => {
        setNukePhase('fading');
        // Complete fade transition after 2s
        const resetTimer = setTimeout(() => {
          setNukePhase('idle');
        }, 2000);
        return () => clearTimeout(resetTimer);
      }, 6000); // 4s explosion + 1s pause + 1s buffer
      return () => clearTimeout(fadeTimer);
    }
  }, [nukePhase]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const scrollAmount = 300;
      navScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 overflow-hidden ${nukePhase === 'falling' ? 'overflow-visible' : ''}`}>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02),transparent_50%)]"></div>
      
      {/* Explosion overlay that fades out */}
      {(nukePhase === 'exploded' || nukePhase === 'fading') && (
        <div className={`fixed inset-0 z-30 pointer-events-none ${nukePhase === 'fading' ? 'fade-out' : ''}`} style={{background: 'radial-gradient(circle, rgba(255, 200, 0, 0.4) 0%, rgba(255, 100, 0, 0.2) 30%, rgba(0, 0, 0, 0.1) 100%)'}}>
        </div>
      )}
      
      {/* Falling Bomb/Missile */}
      {nukePhase === 'falling' && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          {/* Bright trail effect */}
          <div className="absolute w-16 h-96 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-b from-yellow-300 via-orange-400 to-transparent opacity-60 blur-2xl"></div>
          
          {/* Main missile */}
          <div className="bomb-falling relative w-16 h-24 left-1/2 -translate-x-1/2">
            <img src="/missile.svg" alt="Missile" width="64" height="96" className="drop-shadow-2xl filter brightness-125 rotate-180" />
          </div>
        </div>
      )}

      {/* Pixel Particles Explosion */}
      {nukePhase === 'exploded' && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          {/* INITIAL WHITE-HOT FLASH - Intense core */}
          <div className="absolute inset-0 bg-white opacity-0" style={{animation: 'whiteFlash 0.25s ease-out forwards'}}></div>
          
          {/* YELLOW-ORANGE FLASH LAYER */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-300 via-orange-500 to-transparent opacity-0" style={{animation: 'orangeFlash 0.5s ease-out forwards', animationDelay: '0.05s'}}></div>
          
          {/* INTENSE INNER GLOW - Core brightness */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen rounded-full bg-gradient-radial from-yellow-200 to-transparent opacity-0 blur-3xl" style={{animation: 'coreGlow 0.8s ease-out forwards'}}></div>
          
          {/* Large debris chunks - slower moving */}
          {Array.from({ length: 80 }).map((_, i) => {
            const angle = (i / 80) * Math.PI * 2;
            const distance = 200 + Math.random() * 500;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance * 0.7;
            const size = 8 + Math.random() * 24;
            const delay = Math.random() * 0.2;
            const duration = 2.5 + Math.random() * 1;
            
            const debrisColors = ['#ff3d00', '#ff5722', '#ff6600', '#ff8c00', '#ff9800', '#ffa500', '#ffb300', '#ff6b35'];
            const color = debrisColors[Math.floor(Math.random() * debrisColors.length)];

            return (
              <div
                key={`debris-${i}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  '--px': `${x}px`,
                  '--py': `${y}px`,
                  '--delay': `${delay}s`,
                  '--duration': `${duration}s`,
                  '--rotation': `${Math.random() * 720}deg`,
                  boxShadow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}99`,
                  borderRadius: '2px',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pixelBurst var(--duration) ease-out forwards',
                  animationDelay: 'var(--delay)',
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* MASSIVE PIXEL PARTICLES - 1000 particles for crazy effect */}
          {Array.from({ length: 1000 }).map((_, i) => {
            const burstPattern = Math.floor(i / 200); // 5 patterns
            const indexInPattern = i % 200;
            
            let angle, distance;
            
            if (burstPattern === 0) {
              angle = (indexInPattern / 200) * Math.PI * 2;
              distance = 100 + Math.random() * 800;
            } else if (burstPattern === 1) {
              angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.6;
              distance = 150 + Math.random() * 1000;
            } else if (burstPattern === 2) {
              angle = Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.6;
              distance = 150 + Math.random() * 1000;
            } else if (burstPattern === 3) {
              angle = (Math.random() > 0.5 ? 0 : Math.PI) + (Math.random() - 0.5) * Math.PI * 0.4;
              distance = 150 + Math.random() * 1000;
            } else {
              angle = Math.random() * Math.PI * 2;
              distance = 50 + Math.random() * 1200;
            }
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 0.5 + Math.random() * 16;
            const delay = Math.random() * 0.8;
            const duration = 1.5 + Math.random() * 1.5;
            
            const colors = ['#ff0000', '#ff1a1a', '#ff2400', '#ff3d00', '#ff4500', '#ff5722', '#ff6600', '#ff7043', '#ff8c00', '#ff9800', '#ff9900', '#ffaa00', '#ffb300', '#ffbb00', '#fbbf24', '#ffcc00', '#ffdd00', '#ffee00', '#ffff00', '#fff44f', '#f7931e', '#ff6b35'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                key={`particle-${i}`}
                className="absolute top-1/2 left-1/2 pixel-particle"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  '--px': `${x}px`,
                  '--py': `${y}px`,
                  '--delay': `${delay}s`,
                  '--duration': `${duration}s`,
                  '--rotation': `${Math.random() * 1080}deg`,
                  boxShadow: `0 0 ${size * 2.5}px ${color}, 0 0 ${size * 5}px ${color}80`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                } as React.CSSProperties & { '--duration': string; '--rotation': string }}
              />
            );
          })}
          
          {/* MASSIVE SHOCKWAVE RINGS - 6 intense rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shockwave" style={{borderColor: 'rgba(255, 255, 0, 1)'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shockwave" style={{ animationDelay: '0.1s', borderColor: 'rgba(255, 220, 0, 0.9)' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shockwave" style={{ animationDelay: '0.2s', borderColor: 'rgba(255, 180, 0, 0.8)' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shockwave" style={{ animationDelay: '0.3s', borderColor: 'rgba(255, 140, 0, 0.6)' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shockwave" style={{ animationDelay: '0.4s', borderColor: 'rgba(255, 100, 0, 0.4)' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shockwave" style={{ animationDelay: '0.5s', borderColor: 'rgba(255, 80, 0, 0.2)' }} />
          
          {/* Ground impact dust ring */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-screen h-1/2 bg-gradient-to-t from-orange-900 via-orange-600 to-transparent opacity-0 blur-3xl" style={{animation: 'dustRise 1.5s ease-out forwards'}}></div>
        </div>
      )}

      {/* Nuclear Explosion Cloud */}
      {nukePhase === 'exploded' && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* ATMOSPHERE HEAT DISTORTION - Ripple effect */}
              <div className="absolute inset-0 mushroom-cloud" style={{animation: 'atmosphereWave 2s ease-out forwards', background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(255, 100, 0, 0.15) 70%)'}}></div>
              
              {/* MASSIVE OUTER GLOW */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-screen h-screen rounded-full bg-gradient-radial from-yellow-300 to-transparent opacity-35 blur-3xl mushroom-cloud"></div>
              
              {/* RED BACKGROUND GLOW - Creates atmospheric heat haze */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-2/3 bg-gradient-to-b from-red-600 via-orange-500 to-transparent opacity-30 blur-3xl"></div>
              
              {/* MAIN MUSHROOM STEM - Bright hot core - ENHANCED */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 mushroom-cloud">
                {/* Core inner stem - brightest */}
                <div className="relative w-32 h-96 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-red-700 via-orange-400 to-yellow-200 opacity-100 blur-2xl" style={{background: 'radial-gradient(ellipse 60% 100% at center, rgba(255,255,0,1), rgba(255,220,0,0.95) 20%, rgba(255,180,0,0.9) 40%, rgba(255,120,0,0.8) 70%, rgba(200,50,0,0.6) 100%)'}}></div>
                </div>
                
                {/* Turbulent orange stem layer 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-80 bg-gradient-to-t from-red-800 via-orange-600 to-yellow-300 opacity-85 blur-2xl rounded-full"></div>
                
                {/* Turbulent orange stem layer 2 */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-72 bg-gradient-to-t from-red-700 via-orange-500 to-yellow-200 opacity-75 blur-xl rounded-full"></div>
                
                {/* Red inner core - pulsing */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-44 h-64 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-700 opacity-80 blur-lg rounded-full"></div>
                
                {/* Additional turbulence ring */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 border-4 border-orange-600 rounded-full opacity-30 blur-md"></div>
              </div>
              
              {/* MUSHROOM CAP - The iconic large bulbous top - ENHANCED */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 mushroom-cloud">
                {/* Far outer ring - orange haze */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-96 rounded-full bg-gradient-radial from-orange-500 via-orange-600 to-transparent opacity-65 blur-3xl"></div>
                
                {/* Main cap center - yellow bright core - MASSIVE */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-80 rounded-full bg-gradient-to-b from-yellow-50 via-yellow-300 to-orange-500 opacity-95 blur-3xl shadow-2xl" style={{boxShadow: '0 0 120px rgba(255, 255, 0, 0.9), 0 0 180px rgba(255, 200, 0, 0.7), 0 0 240px rgba(255, 150, 0, 0.4)'}}></div>
                
                {/* Left bulge of cap - extended */}
                <div className="absolute -top-12 -left-48 w-80 h-72 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-transparent opacity-75 blur-3xl"></div>
                
                {/* Right bulge of cap - extended */}
                <div className="absolute -top-12 -right-48 w-80 h-72 rounded-full bg-gradient-to-l from-yellow-300 via-orange-400 to-transparent opacity-75 blur-3xl"></div>
                
                {/* Top dome - brightest point */}
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-radial from-yellow-100 via-yellow-200 to-transparent opacity-90 blur-2xl"></div>
                
                {/* Secondary outer ring - red tones */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full h-80 rounded-full bg-gradient-to-b from-orange-600 via-orange-500 to-red-700 opacity-55 blur-3xl"></div>
                
                {/* Far outer orange ring - extends wider */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-screen h-80 rounded-full bg-gradient-to-b from-orange-500 via-orange-600 to-transparent opacity-50 blur-3xl"></div>
                
                {/* Top cap detail - ridged look */}
                <div className="absolute -top-20 left-1/4 w-40 h-40 rounded-full border-2 border-orange-400 opacity-25 blur-md"></div>
                <div className="absolute -top-20 right-1/4 w-40 h-40 rounded-full border-2 border-orange-400 opacity-25 blur-md"></div>
              </div>
              
              {/* UPPER CLOUD WISPS - Thin spreading layers */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 mushroom-cloud">
                {/* Upper left wisp - large */}
                <div className="absolute w-96 h-56 rounded-full bg-gradient-to-br from-yellow-200 via-orange-300 to-transparent opacity-60 blur-3xl -left-56 -top-24"></div>
                
                {/* Upper right wisp - large */}
                <div className="absolute w-96 h-56 rounded-full bg-gradient-to-bl from-yellow-200 via-orange-300 to-transparent opacity-60 blur-3xl -right-56 -top-24"></div>
                
                {/* Top spread - wide */}
                <div className="absolute left-1/2 -translate-x-1/2 w-screen h-48 rounded-full bg-gradient-to-t from-orange-400 via-orange-300 to-transparent opacity-45 blur-3xl -top-48"></div>
                
                {/* Side tendrils */}
                <div className="absolute -left-96 top-0 w-80 h-96 rounded-full bg-gradient-to-r from-orange-500 to-transparent opacity-40 blur-3xl"></div>
                <div className="absolute -right-96 top-0 w-80 h-96 rounded-full bg-gradient-to-l from-orange-500 to-transparent opacity-40 blur-3xl"></div>
              </div>
              
              {/* INTENSE LIGHT RAYS - Volumetric light effect */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 mushroom-cloud">
                {/* Central light column - massive */}
                <div className="absolute left-1/2 -translate-x-1/2 w-40 h-96 bg-gradient-to-b from-yellow-100 via-yellow-200 to-transparent opacity-50 blur-2xl"></div>
                <div className="absolute left-1/2 -translate-x-1/2 w-24 h-80 bg-gradient-to-b from-white via-yellow-100 to-transparent opacity-40 blur-lg"></div>
              </div>
              
              {/* GROUND BLAST WAVE REFLECTION - Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-2/3 bg-gradient-to-t from-red-800 via-orange-600 to-transparent opacity-25 blur-3xl"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`relative ${nukePhase === 'exploded' ? 'z-0 explosion-container' : 'z-10'}`}>
        <header className={`border-b border-slate-200 backdrop-blur-xl bg-white bg-opacity-80 ${nukePhase === 'exploded' ? 'explosion-item' : ''}`} style={{...getExplosionStyle(0)}}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative cursor-pointer group" onClick={() => {
                  setNukePhase('falling');
                  setTimeout(() => setNukePhase('exploded'), 1800);
                }}>
                  <div className="absolute inset-0 bg-slate-900 blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity"></div>
                  <Atom className="w-10 h-10 md:w-14 md:h-14 text-slate-900 relative group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
                <div>                  <h1 className="text-2xl md:text-5xl font-black tracking-tight text-slate-900">
                    Canada & the Manhattan Project
                  </h1>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 md:mt-2 font-light tracking-wide">
                    Canada in nuclear history: 1896–1970
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className={`sticky top-0 z-50 backdrop-blur-2xl bg-white bg-opacity-90 border-b border-slate-200 ${nukePhase === 'exploded' ? 'explosion-item' : ''}`} style={{...getExplosionStyle(1)}}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollNav('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-slate-100 p-2 rounded-full shadow-lg border border-slate-200 transition-all duration-300 ${
                showLeftArrow ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollNav('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-slate-100 p-2 rounded-full shadow-lg border border-slate-200 transition-all duration-300 ${
                showRightArrow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={navScrollRef} className="flex gap-1 py-3 overflow-x-auto scrollbar-hide pb-4 md:pb-3 px-12">              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full whitespace-nowrap transition-all duration-300 group flex-shrink-0 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-xs md:text-sm">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <main className={`max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 ${nukePhase === 'exploded' ? 'explosion-item' : ''}`} style={{...getExplosionStyle(2)}}>
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-slate-900 p-4 rounded-2xl">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-black mb-4 text-slate-900">
                        Canada's Nuclear Legacy
                      </h2>
                      <div className="h-1 w-24 bg-slate-900 rounded-full"></div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-6">
                    Canada helped develop the world's first nuclear reactors and nuclear arms. During WWII, Canada participated in British research to create an atomic weapon. In 1943, the Nuclear weapons program joined with the American equivalent, the Manhattan Project.
                  </p>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-8">
                    Canada's contribution was the Montreal Laboratory, which later became the Chalk River Laboratory.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group/card relative overflow-hidden cursor-pointer" onClick={() => setSelectedCard('montreal')}>
                      <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200 group-hover/card:border-slate-300 transition-all duration-300 group-hover/card:shadow-lg">
                        <FlaskConical className="w-10 h-10 text-slate-900 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Montreal Laboratory</h3>
                        <p className="text-slate-600 leading-relaxed">
                          A joint Canadian-British research effort that the United States later joined at the Quebec Conference in 1943, eventually becoming part of the Manhattan Project.
                        </p>
                        <ChevronRight className="w-5 h-5 text-slate-900 mt-4 group-hover/card:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    <div className="group/card relative overflow-hidden cursor-pointer" onClick={() => setSelectedCard('global')}>
                      <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200 group-hover/card:border-slate-300 transition-all duration-300 group-hover/card:shadow-lg">
                        <Globe className="w-10 h-10 text-slate-900 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Global Impact</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Canada would go on to become a leader in peaceful nuclear energy and non-proliferation efforts worldwide.
                        </p>
                        <ChevronRight className="w-5 h-5 text-slate-900 mt-4 group-hover/card:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'background' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-6 text-slate-900">
                    The Dawn of Nuclear Physics
                  </h2>
                  <div className="h-1 w-24 bg-slate-900 rounded-full mb-8"></div>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-8">
                    The field of nuclear physics emerged in the 20th century. A series of groundbreaking discoveries laid the foundation for what would eventually become the atomic age.
                  </p>
                  
                  <div className="space-y-4">
                    <TimelineItem 
                      year="1896"
                      title="Discovery of Radioactivity"
                      description="Henri Becquerel discovered radioactivity, opening a new frontier in physics."
                    />
                    <TimelineItem 
                      year="1897"
                      title="The Electron"
                      description="J.J. Thompson discovered the electron, revealing the subatomic world."
                    />
                    <TimelineItem 
                      year="1898"
                      title="Radium & Radiation"
                      description="Marie and Pierre Curie discovered radium and documented the phenomenon of radiation."
                    />
                    <TimelineItem 
                      year="1905"
                      title="E=MC²"
                      description="Albert Einstein introduced his theory of special relativity and the mass-energy equivalence. This principle showed that mass (m) and energy (E) are interchangeable, fundamentally the same thing, with the speed of light squared (c²) acting as the conversion factor."
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-4xl font-black mb-8 text-slate-900">
                    Canadian Pioneers
                  </h2>
                  
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">
                    Around the same time these discoveries were happening worldwide, Canadian scientists were making their own groundbreaking contributions to nuclear physics.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <PioneerCard 
                      name="Harriet Brooks"
                      location="McGill University, Montreal"
                      achievement="A student at McGill University in Montreal, Brooks discovered that elements could decay into other elements, releasing radiation."
                      distinction="Canada's first female nuclear physicist"
                    />
                    
                    <PioneerCard 
                      name="Ernest Rutherford"
                      location="McGill University"
                      achievement="Discovered the idea of radioactive half-life and the radioactive element radon. Rutherford also distinguished between the different types of radiation."
                      distinction="Nobel Prize in Chemistry, 1908"
                    />
                  </div>

                  <PioneerCard 
                    name="George Laurence"
                    location="National Research Council, Ottawa"
                    achievement="Canadian nuclear physicist George Laurence experimented with uranium fission as early as 1939-40. His goal was to develop a uranium graphite reactor. Laurence carried his experience in Ottawa to the National Research Council. He didn't succeed in building a reactor, but his experiments from 1940 to 1942 meant that the first human-made nuclear chain reaction came close to being achieved in Canada."
                    distinction="Pioneer in Canadian nuclear research"
                  />
                  
                  <div className="mt-8 bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">The Path to Nuclear Fission</h3>
                    <p className="text-slate-700 leading-relaxed">
                      The discovery of nuclear fission led to the idea of atomic bombs. This occurred less than a year before Germany invaded Poland in 1939 and set off WWII.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'tubealloys' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-6 text-slate-900">
                    Tube Alloys: Britain's Nuclear Program
                  </h2>
                  <div className="h-1 w-24 bg-slate-900 rounded-full mb-8"></div>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-8">
                    The British government began to plan a nuclear weapons research project in 1940. It was codenamed "Tube Alloys" when it launched the next year. It was the first nuclear weapons research program. At first, it was based at the Cavendish Laboratory at the University of Cambridge.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <InfoCard 
                      title="Initial Challenges"
                      items={[
                        "The British were low on resources due to the ongoing war effort",
                        "They faced a threat posed by German bombers after the Battle of Britain",
                        "They tried to find a partner for the project due to these limitations"
                      ]}
                      description=""
                    />
                    
                    <InfoCard 
                      title="Canada Steps In - 1942"
                      description="Canada accepted the British request to relocate the project in 1942. The cabinet minister for wartime production, C.D. Howe, authorized the development of the Montreal Laboratory. This was a joint Canadian-British research effort that the United States later joined at the Quebec Conference in 1943."
                      items={[]}
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-2xl p-8 bg-slate-900 text-white">
                    <h3 className="text-3xl font-bold mb-4">The Manhattan Project</h3>
                    <p className="text-slate-200 text-lg mb-4">
                      The conflict of WWII was draining the resources, and Britain had fallen behind. The joint effort agreed to in Quebec would receive the codename of the US project: the Manhattan Project.
                    </p>
                    <p className="text-slate-200 text-lg">
                      This collaboration brought together the scientific expertise and resources of three nations in the race to develop atomic weapons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'contributions' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-8 text-slate-900">
                    Canada's Three Key Contributions
                  </h2>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-10">
                    Canada made three significant contributions to the Manhattan Project that were essential to its success.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <ContributionCard 
                      number="1"
                      title="Uranium Supply"
                      description="Canada supplied and processed uranium. The Americans used this uranium to research and develop the atomic bomb. Canada would continue to supply the US with uranium for military use for two decades after the war."
                    />
                    <ContributionCard 
                      number="2"
                      title="Plutonium Production"
                      description="Canada played an important role in the extraction and production of plutonium. Plutonium was also used in nuclear weapons."
                    />
                    <ContributionCard 
                      number="3"
                      title="Research & Facilities"
                      description="Canada provided many researchers and scientists, as well as key facilities for research and production."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'images' && (
            <div className="space-y-10 animate-slideIn">
              <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                <h2 className="text-5xl font-black mb-6 text-slate-900">
                  Historical Images
                </h2>
                <div className="h-1 w-24 bg-slate-900 rounded-full mb-10"></div>

                <div className="grid md:grid-cols-2 gap-10">
                  <ImageBlock
                    src="/images/chalk-river-laboratories-1945.jpg"
                    caption="Chalk River Laboratories, Ontario (1945). Canada’s primary nuclear research facility during and after World War II."
                  />

                  <ImageBlock
                    src="/images/montreal-laboratory.jpg"
                    caption="The Montreal Laboratory (1943), a joint Canadian–British nuclear research center later integrated into the Manhattan Project."
                  />

                  <ImageBlock
                    src="/images/little-boy.jpg"
                    caption="“Little Boy,” the atomic bomb used on Hiroshima in 1945, shown here for historical context."
                  />

                  <ImageBlock
                    src="/images/uranium-mining.jpg"
                    caption="Uranium mining in Canada during the post-war period, supporting nuclear research and energy development."
                  />

                  <ImageBlock
                    src="/images/michael-stewart.jpeg"
                    caption="British Foreign Secretary Michael Stewart during Nuclear Non-Proliferation Treaty era negotiations."
                  />
                </div>
              </div>
            </div>
          )}


          {activeSection === 'chalkriver' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-6 text-slate-900">
                    Chalk River & ZEEP
                  </h2>
                  <div className="h-1 w-24 bg-slate-900 rounded-full mb-8"></div>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-8">
                    Research at the Montreal Laboratory moved to new facilities in Chalk River, Ontario, in 1944. Chalk River had two experimental reactors that would lay the foundation for Canada's nuclear future.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <ReactorCard 
                      name="ZEEP"
                      subtitle="Zero Energy Experimental Pile"
                      date="September 5th, 1945"
                      description="ZEEP achieved a sustained and controlled nuclear reaction using uranium and heavy water. Heavy water (D2O) is a form of water that contains 'heavy hydrogen,' known as deuterium, instead of regular hydrogen."
                      achievement="It was the first nuclear reactor built and operated outside the United States. It could also generate plutonium from uranium."
                    />
                    
                    <ReactorCard 
                      name="NRX"
                      subtitle="National Research Experimental"
                      date="1947"
                      description="The NRX reactor would not go critical (sustain a nuclear chain reaction) until 1947."
                      achievement="Together, the ZEEP and NRX experimental reactors would lay the foundation for the development of the CANDU nuclear reactor. The CANDU reactor is used in Canada and around the world."
                    />
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Transition to Peaceful Research</h3>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      The Montreal Laboratory closed in 1946, with its research programs consolidating at Chalk River.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      In 1952, Atomic Energy of Canada Ltd., a crown corporation (government-owned), took over research at Chalk River. The corporation's mandate from the federal government was to develop peaceful uses of nuclear energy, such as power generation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'postwar' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-6 text-slate-900">
                    The Uranium Boom
                  </h2>
                  <div className="h-1 w-24 bg-slate-900 rounded-full mb-8"></div>
                  
                  <p className="text-xl text-slate-700 leading-relaxed mb-10">
                    Many Canadian communities experienced rapid growth in the post-war period as a result of the mining industry.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <MiningCard 
                      location="Uranium City"
                      region="Northern Saskatchewan"
                      description="Uranium City, in Northern Saskatchewan, had a number of mining operations that transformed the landscape and brought economic development to the region."
                      highlight={false}
                    />
                    <MiningCard 
                      location="Bancroft"
                      region="Ontario"
                      description="Two Ontario areas, Bancroft and Elliot Lake, also experienced the boom of uranium mining activities during this period."
                      highlight={false}
                    />
                    <MiningCard 
                      location="Elliot Lake"
                      region="Ontario"
                      description="Elliot Lake would soon be recognized as the 'Uranium Capital' of the world with over 12 mines and several nearby mills, operated by Denison Mines and Rio Algom."
                      highlight={true}
                    />
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">The End of Military Export</h3>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      The uranium mining boom was driven primarily by military demand from the United States. However, this would not last forever.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200">
                        <p className="text-slate-900 font-bold text-lg mb-2">1959</p>
                        <p className="text-slate-700">By 1959, the U.S. military's demand for uranium slowed significantly.</p>
                      </div>
                      <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200">
                        <p className="text-slate-900 font-bold text-lg mb-2">1965</p>
                        <p className="text-slate-700">Canada officially stopped exporting uranium for weapon production.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'nonproliferation' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-10 text-slate-900">
                    Canada's Role in Nuclear Non-Proliferation
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-2xl p-10 bg-slate-900 text-white">
                      <h3 className="text-3xl font-bold mb-4">1965 Policy Decision</h3>
                      <p className="text-slate-200 text-xl leading-relaxed">
                        In 1965, the Canadian government decided that all exports of uranium and all other nuclear materials would be only for peaceful purposes.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
                      <h3 className="text-3xl font-bold text-slate-900 mb-6">A Historic First</h3>
                      <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                        Canada was the first country with significant nuclear capability to possess nuclear weapons and then choose to focus exclusively on peaceful applications.
                      </p>
                      <p className="text-slate-700 text-lg leading-relaxed">
                        Since then, Canada has been actively involved in promoting the peaceful use of nuclear energy around the world.
                      </p>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl p-10 bg-slate-900 text-white">
                      <h3 className="text-3xl font-bold mb-4">1970: UN Non-Proliferation Treaty</h3>
                      <p className="text-slate-200 text-lg leading-relaxed mb-4">
                        The policy was reinforced in 1970 when Canada signed the United Nations Nuclear Non-Proliferation Treaty.
                      </p>
                      <p className="text-slate-200 text-lg leading-relaxed">
                        This cemented Canada's commitment to preventing the spread of nuclear weapons while promoting peaceful nuclear technology worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === 'sources' && (
            <div className="space-y-8 animate-slideIn">
              <div className="relative group">
                <div className="absolute -inset-1 bg-slate-900 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition duration-500"></div>

                <div className="relative bg-white rounded-3xl p-12 border border-slate-200 shadow-xl">
                  <h2 className="text-5xl font-black mb-6 text-slate-900">
                    Sources & References
                  </h2>
                  <div className="h-1 w-24 bg-slate-900 rounded-full mb-8"></div>

                  <p className="text-lg text-slate-700 leading-relaxed mb-8">
                    This project is based on publicly available historical and educational sources.
                    No proprietary or classified information is used. All interpretations are presented
                    for educational purposes only.
                  </p>

                  <ul className="space-y-5 text-slate-700 text-lg">
                    <li>
                      • <strong>Wikipedia</strong> — <em>Chalk River Laboratories</em><br />
                      <a
                        href="https://en.wikipedia.org/wiki/Chalk_River_Laboratories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://en.wikipedia.org/wiki/Chalk_River_Laboratories
                      </a>
                    </li>

                    <li>
                      • <strong>The Canadian Encyclopedia</strong> — <em>Canada and the Manhattan Project</em><br />
                      <a
                        href="https://thecanadianencyclopedia.ca/en/article/canada-and-the-manhattan-project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://thecanadianencyclopedia.ca/en/article/canada-and-the-manhattan-project
                      </a>
                    </li>

                    <li>
                      • <strong>Canadian Nuclear Safety Commission</strong> — <em>Canada’s Contribution to Nuclear Weapons Development</em><br />
                      <a
                        href="https://www.cnsc-ccsn.gc.ca/eng/resources/fact-sheets/canadas-contribution-to-nuclear-weapons-development/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://www.cnsc-ccsn.gc.ca/eng/resources/fact-sheets/canadas-contribution-to-nuclear-weapons-development/
                      </a>
                    </li>

                    <li>
                      • <strong>Canadian Nuclear Safety Commission</strong> — <em>History of the CNSC</em><br />
                      <a
                        href="https://www.cnsc-ccsn.gc.ca/eng/about-us/history/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://www.cnsc-ccsn.gc.ca/eng/about-us/history/
                      </a>
                    </li>

                    <li>
                      • <strong>CBC News</strong> — <em>How Canada Supplied Uranium for the Manhattan Project</em><br />
                      <a
                        href="https://www.cbc.ca/documentaries/how-canada-supplied-uranium-for-the-manhattan-project-1.7402051"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://www.cbc.ca/documentaries/how-canada-supplied-uranium-for-the-manhattan-project-1.7402051
                      </a>
                    </li>

                    <li>
                      • <strong>Wikipedia</strong> — <em>Canada and Weapons of Mass Destruction</em><br />
                      <a
                        href="https://en.wikipedia.org/wiki/Canada_and_weapons_of_mass_destruction"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://en.wikipedia.org/wiki/Canada_and_weapons_of_mass_destruction
                      </a>
                    </li>
                  </ul>
                  <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                    Image Credits
                  </h3>

                  <ul className="space-y-4 text-slate-700 text-lg">
                    <li>
                      • <strong>Chalk River Laboratories</strong> — <em>Wikipedia</em><br />
                      <a
                        href="https://en.wikipedia.org/wiki/Chalk_River_Laboratories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://en.wikipedia.org/wiki/Chalk_River_Laboratories
                      </a>
                    </li>

                    <li>
                      • <strong>Montreal Laboratory</strong> — <em>Nuclear Heritage Project</em><br />
                      <a
                        href="https://nuclearheritage.com/the-establishment-of-the-montreal-laboratories-and-the-evolution-to-chalk-river/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://nuclearheritage.com/the-establishment-of-the-montreal-laboratories-and-the-evolution-to-chalk-river/
                      </a>
                    </li>

                    <li>
                      • <strong>“Little Boy” Atomic Bomb</strong> — <em>Los Alamos National Laboratory</em><br />
                      <a
                        href="https://www.lanl.gov/media/publications/national-security-science/0720-why-wasnt-little-boy-tested"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://www.lanl.gov/media/publications/national-security-science/0720-why-wasnt-little-boy-tested
                      </a>
                    </li>

                    <li>
                      • <strong>Uranium Mining in Canada</strong> — <em>Wikipedia</em><br />
                      <a
                        href="https://en.wikipedia.org/wiki/Uranium_mining_in_Canada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://en.wikipedia.org/wiki/Uranium_mining_in_Canada
                      </a>
                    </li>

                    <li>
                      • <strong>Michael Stewart & Nuclear Non-Proliferation Treaty</strong> — <em>Encyclopaedia Britannica</em><br />
                      <a
                        href="https://www.britannica.com/event/Treaty-on-the-Non-proliferation-of-Nuclear-Weapons"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 hover:text-slate-600"
                      >
                        https://www.britannica.com/event/Treaty-on-the-Non-proliferation-of-Nuclear-Weapons
                        </a>
                    </li>

                  </ul>
                  <div className="mt-10 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      © Content compiled for educational use. All trademarks, names, and references
                      remain the property of their respective owners.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

          </main>


        <footer className={`border-t border-slate-200 backdrop-blur-xl bg-white bg-opacity-80 mt-24 ${nukePhase === 'exploded' ? 'explosion-item' : ''}`} style={{...getExplosionStyle(3)}}>
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <p className="text-slate-600 font-light">
              An exploration of Canada's pivotal role in nuclear history, By: Miles Leppky
            </p>
          </div>
        </footer>

        {/* Detailed Info Modal */}
        {selectedCard && cardDetails[selectedCard] && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => { setSelectedCard(null); setSearchQuery(''); }}>
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-8 py-6 flex justify-between items-center border-b border-slate-200">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{cardDetails[selectedCard].title}</h2>
                <button 
                  onClick={() => { setSelectedCard(null); setSearchQuery(''); }}
                  className="text-slate-500 hover:text-slate-900 text-2xl hover:opacity-100 opacity-70 transition-all hover:scale-110 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100"
                  title="Close (ESC)"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-8 py-4 border-b border-slate-200 bg-slate-50/50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search content... (Press ESC to close)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-xs text-slate-500 mt-2">
                    Found {filteredContent.split('\n').filter(l => l.trim().length > 0).length} matching lines
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 px-8 py-6 bg-white">
                {filteredContent.trim() ? (
                  <div className="text-slate-700 leading-relaxed text-sm space-y-3">
                    {filteredContent.split('\n').map((line, i) => {
                      const highlightedLine = searchQuery 
                        ? line.replace(
                            new RegExp(`(${searchQuery})`, 'gi'),
                            '<mark style="background-color: #fef08a; font-weight: 600;">$1</mark>'
                          )
                        : line;
                      
                      return (
                        <div 
                          key={i} 
                          className={`${
                            line.startsWith('•') ? 'ml-4 text-slate-600' : 
                            line.includes(':') ? 'font-semibold text-slate-900 mt-4 pt-2 border-t border-slate-100' : 
                            ''
                          }`}
                          dangerouslySetInnerHTML={{ __html: highlightedLine }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-slate-400 italic text-center py-8">
                    {searchQuery 
                      ? `No results found for "${searchQuery}". Try different keywords.`
                      : 'Start typing to search...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
      <div className="bg-slate-900 rounded-xl px-5 py-3">
        <span className="text-white font-black text-lg">{year}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function PioneerCard({ name, location, achievement, distinction }: { name: string; location: string; achievement: string; distinction: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 h-full hover:shadow-lg">
      <h3 className="text-3xl font-black text-slate-900 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 mb-4">{location}</p>
      <p className="text-slate-700 mb-6 leading-relaxed">{achievement}</p>
      <div className="inline-block bg-slate-900 px-4 py-2 rounded-lg">
        <p className="text-white font-semibold text-sm">{distinction}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, items, description }: { title: string; items?: string[]; description?: string }) {
  return (
    <div className="rounded-2xl p-8 bg-slate-50 border border-slate-200 h-full">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">{title}</h3>
      {items && items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700">
              <span className="text-slate-900 mt-1 text-xl">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-700 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

function ContributionCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 h-full hover:shadow-lg">
      <div className="bg-slate-900 rounded-full w-12 h-12 flex items-center justify-center mb-6">
        <span className="text-white font-bold text-xl">{number}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-700 leading-relaxed">{description}</p>
    </div>
  );
}

function ReactorCard({ name, subtitle, date, description, achievement }: { name: string; subtitle: string; date: string; description: string; achievement: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 h-full hover:shadow-lg">
      <h3 className="text-3xl font-bold text-slate-900 mb-1">{name}</h3>
      <p className="text-sm text-slate-600 mb-4">{subtitle}</p>
      <div className="bg-slate-900 inline-block px-3 py-1 rounded-lg mb-4">
        <p className="text-white text-sm font-semibold">{date}</p>
      </div>
      <p className="text-slate-700 mb-6 leading-relaxed">{description}</p>
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <p className="text-slate-900 font-semibold mb-2">Achievement</p>
        <p className="text-slate-700 text-sm leading-relaxed">{achievement}</p>
      </div>
    </div>
  );
}

function MiningCard({ location, region, description, highlight }: { location: string; region: string; description: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-8 border transition-all duration-300 h-full hover:shadow-lg ${
      highlight ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
    }`}>
      <MapPin className={`w-8 h-8 mb-4 ${highlight ? 'text-white' : 'text-slate-900'}`} />
      <h3 className={`text-2xl font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{location}</h3>
      <p className={`text-sm mb-4 ${highlight ? 'text-slate-300' : 'text-slate-600'}`}>{region}</p>
      <p className={`leading-relaxed ${highlight ? 'text-slate-200' : 'text-slate-700'}`}>{description}</p>
    </div>
  );
}
