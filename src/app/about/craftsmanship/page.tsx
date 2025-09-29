'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CraftsmanshipPage() {
  const [activeTab, setActiveTab] = useState('process');

  const craftingSteps = [
    {
      step: 1,
      title: "Wood Selection",
      description: "We carefully select only the finest European oak, aged naturally for optimal stability and grain beauty.",
      image: "/images/craftsmanship/wood-selection.jpg",
      details: [
        "Premium European oak sourcing",
        "Natural air-drying for 2-3 years",
        "Grain pattern evaluation",
        "Quality certification process"
      ]
    },
    {
      step: 2,
      title: "Precision Cutting", 
      description: "Using traditional techniques combined with modern precision tools to maximize wood utilization.",
      image: "/images/craftsmanship/precision-cutting.jpg",
      details: [
        "CNC precision cutting",
        "Hand-selected grain orientation",
        "Minimal waste methodology",
        "Quality inspection at each cut"
      ]
    },
    {
      step: 3,
      title: "Hand Finishing",
      description: "Our master craftsmen apply traditional finishing techniques for a flawless, natural look.",
      image: "/images/craftsmanship/hand-finishing.jpg",
      details: [
        "Progressive sanding (80-320 grit)",
        "Natural oil penetration",
        "Hand-rubbed finish application",
        "Multiple quality checkpoints"
      ]
    },
    {
      step: 4,
      title: "Quality Assurance",
      description: "Every piece undergoes rigorous testing to meet our exacting standards before delivery.",
      image: "/images/craftsmanship/quality-assurance.jpg",
      details: [
        "Structural integrity testing",
        "Finish durability assessment",
        "Dimensional accuracy verification",
        "Final inspection & certification"
      ]
    }
  ];

  const tools = [
    {
      name: "Traditional Hand Planes",
      purpose: "Surface smoothing and grain enhancement",
      heritage: "Techniques passed down through generations"
    },
    {
      name: "Precision CNC Machines", 
      purpose: "Accurate cutting and shaping",
      heritage: "Modern efficiency meets traditional quality"
    },
    {
      name: "Mortise & Tenon Jigs",
      purpose: "Creating strong, lasting joints",
      heritage: "Time-tested joinery methods"
    },
    {
      name: "Hand Sanding Blocks",
      purpose: "Perfect surface preparation",
      heritage: "Artisanal attention to detail"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-oak-800 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Masterful Craftsmanship
          </h1>
          <p className="text-xl text-oak-200 max-w-3xl mx-auto mb-8">
            Where traditional woodworking meets modern precision. Every piece tells a story of dedication, 
            skill, and respect for the noble oak tree.
          </p>
          <Link 
            href="/products"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Explore Our Creations
          </Link>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('process')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'process'
                  ? 'border-oak-600 text-oak-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Our Process
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tools'
                  ? 'border-oak-600 text-oak-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tools & Techniques
            </button>
            <button
              onClick={() => setActiveTab('heritage')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'heritage'
                  ? 'border-oak-600 text-oak-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Our Heritage
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Process Tab */}
          {activeTab === 'process' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  From Forest to Furniture
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  Our meticulous 4-step process ensures every piece meets the highest standards 
                  of quality, durability, and beauty.
                </p>
              </div>

              <div className="space-y-20">
                {craftingSteps.map((step, index) => (
                  <div key={step.step} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-oak-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                          {step.step}
                        </div>
                        <h3 className="text-3xl font-bold text-oak-800">{step.title}</h3>
                      </div>
                      <p className="text-lg text-oak-600 mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-oak-700">
                            <svg className="w-5 h-5 text-amber-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div className="aspect-square bg-oak-100 rounded-lg flex items-center justify-center">
                        <div className="text-oak-400 text-6xl">🪵</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  Precision Tools & Time-Honored Techniques
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  We blend traditional hand tools with modern precision equipment to achieve 
                  the perfect balance of authenticity and accuracy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tools.map((tool, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4 text-oak-600">🔨</div>
                    <h3 className="text-2xl font-bold text-oak-800 mb-3">{tool.name}</h3>
                    <p className="text-oak-600 mb-4">{tool.purpose}</p>
                    <p className="text-sm text-amber-700 font-medium italic">{tool.heritage}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-3xl font-bold text-oak-800 mb-6 text-center">
                  Workshop Philosophy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-oak-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      ⚡
                    </div>
                    <h4 className="text-xl font-semibold text-oak-800 mb-2">Precision</h4>
                    <p className="text-oak-600">Every cut, every joint, every finish is executed with meticulous attention to detail.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-oak-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      🎯
                    </div>
                    <h4 className="text-xl font-semibold text-oak-800 mb-2">Tradition</h4>
                    <p className="text-oak-600">Time-tested techniques passed down through generations of master craftsmen.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-oak-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      ✨
                    </div>
                    <h4 className="text-xl font-semibold text-oak-800 mb-2">Innovation</h4>
                    <p className="text-oak-600">Modern technology enhances traditional methods without compromising quality.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Heritage Tab */}
          {activeTab === 'heritage' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  Three Generations of Excellence
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  Our family workshop has been perfecting the art of oak furniture craftsmanship 
                  since 1952, with each generation building upon the last.
                </p>
              </div>

              <div className="space-y-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        👴
                      </div>
                      <h3 className="text-2xl font-bold text-oak-800 mb-2">1952-1980</h3>
                      <h4 className="text-lg font-semibold text-oak-600 mb-3">The Foundation</h4>
                      <p className="text-oak-600">
                        Grandfather Jānis established our workshop with traditional hand tools and 
                        an unwavering commitment to quality. His motto: "Respect the wood, and it will serve forever."
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        👨
                      </div>
                      <h3 className="text-2xl font-bold text-oak-800 mb-2">1980-2010</h3>
                      <h4 className="text-lg font-semibold text-oak-600 mb-3">The Evolution</h4>
                      <p className="text-oak-600">
                        Father Andris introduced precision machinery while preserving traditional techniques. 
                        He expanded our capabilities and established our reputation for custom furniture.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        👨‍💼
                      </div>
                      <h3 className="text-2xl font-bold text-oak-800 mb-2">2010-Present</h3>
                      <h4 className="text-lg font-semibold text-oak-600 mb-3">The Innovation</h4>
                      <p className="text-oak-600">
                        Today, we combine three generations of knowledge with modern technology, 
                        creating furniture that honors our heritage while meeting contemporary needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-oak-800 mb-4">Our Workshop Values</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-oak-700">
                        <span className="text-amber-600 mr-3">🌳</span>
                        Respect for natural materials
                      </li>
                      <li className="flex items-center text-oak-700">
                        <span className="text-amber-600 mr-3">🔨</span>
                        Mastery of traditional techniques
                      </li>
                      <li className="flex items-center text-oak-700">
                        <span className="text-amber-600 mr-3">⚡</span>
                        Embrace of helpful technology
                      </li>
                      <li className="flex items-center text-oak-700">
                        <span className="text-amber-600 mr-3">🎯</span>
                        Never compromise on quality
                      </li>
                      <li className="flex items-center text-oak-700">
                        <span className="text-amber-600 mr-3">👥</span>
                        Knowledge sharing and mentorship
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-oak-800 mb-4">Master Craftsmen</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-oak-800">Māris Kalniņš</h4>
                        <p className="text-textSecondary text-sm">Lead Craftsman • 25+ years experience</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Ilze Bērziņa</h4>
                        <p className="text-textSecondary text-sm">Finishing Specialist • 18+ years experience</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Pēteris Ozols</h4>
                        <p className="text-textSecondary text-sm">Joinery Master • 22+ years experience</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Anna Liepiņa</h4>
                        <p className="text-textSecondary text-sm">Quality Inspector • 15+ years experience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-oak-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience Our Craftsmanship
          </h2>
          <p className="text-xl text-oak-200 mb-8 max-w-2xl mx-auto">
            Visit our workshop to see our craftsmen at work, or explore our collection 
            of handcrafted oak furniture online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Schedule Workshop Visit
            </Link>
            <Link 
              href="/products"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-oak-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}