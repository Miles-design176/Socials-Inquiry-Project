'use client';

import React, { useState } from 'react';
import { Atom, Users, MapPin, Award, Globe, Calendar, ChevronRight, Zap, FlaskConical } from 'lucide-react';

export default function CanadaManhattanProject() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Atom },
    { id: 'background', title: 'Background', icon: Calendar },
    { id: 'tubealloys', title: 'Tube Alloys', icon: Users },
    { id: 'contributions', title: 'Contributions', icon: Award },
    { id: 'chalkriver', title: 'Chalk River', icon: FlaskConical },
    { id: 'postwar', title: 'Post-War Era', icon: MapPin },
    { id: 'nonproliferation', title: 'Non-Proliferation', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02),transparent_50%)]"></div>
      
      <div className="relative z-10">
        <header className="border-b border-slate-200 backdrop-blur-xl bg-white bg-opacity-80">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-900 blur-xl opacity-20 animate-pulse"></div>
                  <Atom className="w-14 h-14 text-slate-900 relative" strokeWidth={1.5} />
                </div>
                <div>
                  <h1 className="text-5xl font-black tracking-tight text-slate-900">
                    Canada & the Manhattan Project
                  </h1>
                  <p className="text-slate-600 text-sm mt-2 font-light tracking-wide">
                    Canada in nuclear history: 1896–1970
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white bg-opacity-90 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 group ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-16">
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
                    <div className="group/card relative overflow-hidden">
                      <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200 group-hover/card:border-slate-300 transition-all duration-300 group-hover/card:shadow-lg">
                        <FlaskConical className="w-10 h-10 text-slate-900 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Montreal Laboratory</h3>
                        <p className="text-slate-600 leading-relaxed">
                          A joint Canadian-British research effort that the United States later joined at the Quebec Conference in 1943, eventually becoming part of the Manhattan Project.
                        </p>
                        <ChevronRight className="w-5 h-5 text-slate-900 mt-4 group-hover/card:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    <div className="group/card relative overflow-hidden">
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
        </main>

        <footer className="border-t border-slate-200 backdrop-blur-xl bg-white bg-opacity-80 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <p className="text-slate-600 font-light">
              An exploration of Canada's pivotal role in nuclear history, By: Miles Leppky
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
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
