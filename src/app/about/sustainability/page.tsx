'use client';

import Link from 'next/link';
import { useState } from 'react';

import { NaturePeople, LocalFlorist, Park, Build, Home, Recycling, WbSunny, WaterDrop, RepeatOne, Inventory } from '@mui/icons-material';

export default function SustainabilityPage() {
  const [activeSection, setActiveSection] = useState('sourcing');

  const certifications = [
    {
      name: "FSC Certified",
      description: "Forest Stewardship Council certification ensures responsible forest management",
      icon: NaturePeople,
      details: "All our oak is sourced from FSC-certified European forests"
    },
    {
      name: "Carbon Neutral",
      description: "Our production process is carbon neutral through local sourcing and renewable energy",
      icon: LocalFlorist,
      details: "Solar-powered workshop and local material sourcing"
    },
    {
      name: "Zero Waste",
      description: "100% of our wood waste is repurposed or recycled into useful products",
      icon: Recycling, 
      details: "Sawdust becomes compost, offcuts become accessories"
    },
    {
      name: "Local Economy",
      description: "Supporting local forestry and reducing transportation impact",
      icon: Home,
      details: "All materials sourced within 200km of our workshop"
    }
  ];

  const sustainabilityStats = [
    {
      number: "0%",
      label: "Waste to Landfill",
      description: "Every piece of wood finds a purpose"
    },
    {
      number: "100%", 
      label: "Renewable Energy",
      description: "Solar-powered workshop operations"
    },
    {
      number: "50+",
      label: "Trees Planted Annually", 
      description: "More than we harvest through our reforestation program"
    },
    {
      number: "200km",
      label: "Max Sourcing Distance",
      description: "Keeping our supply chain local and sustainable"
    }
  ];

  const lifecycleStages = [
    {
      stage: "Sourcing",
      title: "Responsible Forest Management",
      description: "We partner with certified sustainable forests that practice selective harvesting and natural regeneration.",
      practices: [
        "FSC-certified forest partnerships",
        "Selective tree harvesting",
        "Natural forest regeneration support",
        "Biodiversity protection measures"
      ],
      impact: "Maintains healthy forest ecosystems while providing renewable materials"
    },
    {
      stage: "Production",
      title: "Clean Manufacturing",
      description: "Our workshop operates on renewable energy with minimal environmental impact through efficient processes.",
      practices: [
        "100% solar-powered operations",
        "Water-based, non-toxic finishes",
        "Dust collection and air filtration",
        "Efficient material utilization (95%+)"
      ],
      impact: "Carbon-neutral production with minimal waste generation"
    },
    {
      stage: "Use",
      title: "Generational Durability", 
      description: "Our furniture is built to last generations, reducing the need for replacement and minimizing long-term impact.",
      practices: [
        "Heirloom-quality construction",
        "Repairable and refinishable designs",
        "Timeless aesthetic choices",
        "Comprehensive care instructions"
      ],
      impact: "Furniture that serves families for 50+ years, reducing consumption"
    },
    {
      stage: "End of Life",
      title: "Circular Design",
      description: "When furniture reaches end of life, materials can be fully recycled or safely biodegrade.",
      practices: [
        "100% natural material construction",
        "Non-toxic finish options",
        "Modular, repairable designs",
        "Take-back program for old pieces"
      ],
      impact: "Complete material recovery with zero harmful environmental residue"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-oak-800 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Sustainable by Nature
          </h1>
          <p className="text-xl text-green-200 max-w-3xl mx-auto mb-8">
            Our commitment to environmental stewardship goes beyond certification. 
            We're building furniture and forests for future generations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Shop Sustainably
            </Link>
            <button
              onClick={() => setActiveSection('impact')}
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              See Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['sourcing', 'production', 'lifecycle', 'impact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors capitalize ${
                  activeSection === section
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Sourcing Section */}
          {activeSection === 'sourcing' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  Responsible Sourcing
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  Every oak tree we use comes from sustainably managed European forests, 
                  where conservation and harvesting work in harmony.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4 text-oak-600">
                      <cert.icon sx={{ fontSize: 48 }} />
                    </div>
                    <h3 className="text-xl font-bold text-oak-800 mb-2">{cert.name}</h3>
                    <p className="text-oak-600 mb-3 text-sm">{cert.description}</p>
                    <p className="text-xs text-green-700 font-medium">{cert.details}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-oak-800 mb-6">Forest Partnership Program</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                        <div>
                          <h4 className="font-semibold text-oak-800">Direct Forestry Partnerships</h4>
                          <p className="text-oak-600 text-sm">We work directly with 12 certified forest management companies across Latvia, Lithuania, and sustainable German forests.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                        <div>
                          <h4 className="font-semibold text-oak-800">Reforestation Investment</h4>
                          <p className="text-oak-600 text-sm">For every tree harvested, we fund the planting of 2 new oak seedlings in designated reforestation areas.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                        <div>
                          <h4 className="font-semibold text-oak-800">Biodiversity Monitoring</h4>
                          <p className="text-oak-600 text-sm">Annual wildlife and plant diversity assessments ensure our sourcing supports healthy ecosystems.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-green-50 rounded-lg p-8">
                      <div className="text-center">
                        <div className="text-6xl text-green-600 mb-4">
                          <Park sx={{ fontSize: 72 }} />
                        </div>
                        <h4 className="text-2xl font-bold text-oak-800 mb-2">Tree-to-Furniture Tracking</h4>
                        <p className="text-oak-600">
                          Every piece of furniture comes with documentation tracing its wood 
                          back to the specific forest location, harvest date, and replanting commitment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Production Section */}
          {activeSection === 'production' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  Clean Production Process
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  Our workshop operates as a model of sustainable manufacturing, 
                  powered entirely by renewable energy with zero waste to landfill.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl mr-4">
                      <WbSunny />
                    </div>
                    <h3 className="text-2xl font-bold text-oak-800">Solar-Powered Workshop</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      50kW solar panel installation (2023)
                    </li>
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      100% renewable energy during daylight hours
                    </li>
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      Battery storage for evening operations
                    </li>
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      Excess energy returned to grid
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl mr-4">
                      <WaterDrop />
                    </div>
                    <h3 className="text-2xl font-bold text-oak-800">Water-Based Finishes</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      Zero VOC (Volatile Organic Compounds) finishes
                    </li>
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      Natural plant-based oils and waxes
                    </li>
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      Safe for indoor air quality
                    </li>
                    <li className="flex items-center text-oak-700">
                      <span className="text-green-600 mr-3">•</span>
                      Biodegradable and non-toxic
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Zero Waste Workshop</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      <Recycling />
                    </div>
                    <h4 className="text-xl font-semibold text-oak-800 mb-2">Wood Waste</h4>
                    <p className="text-oak-600 text-sm">
                      Sawdust becomes compost for local gardens. Wood shavings are used for biomass heating. 
                      Larger offcuts become accessories and smaller furniture pieces.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      <RepeatOne />
                    </div>
                    <h4 className="text-xl font-semibold text-oak-800 mb-2">Material Efficiency</h4>
                    <p className="text-oak-600 text-sm">
                      Advanced cutting optimization software maximizes material usage. 
                      We achieve 95%+ material utilization on every project.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      <Inventory />
                    </div>
                    <h4 className="text-xl font-semibold text-oak-800 mb-2">Packaging</h4>
                    <p className="text-oak-600 text-sm">
                      Recyclable cardboard and biodegradable protective materials. 
                      Customers can return packaging for reuse program.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lifecycle Section */}
          {activeSection === 'lifecycle' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  Complete Lifecycle Sustainability
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  From forest to forever - our furniture is designed for minimal environmental 
                  impact throughout its entire lifecycle.
                </p>
              </div>

              <div className="space-y-12">
                {lifecycleStages.map((stage, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-oak-800">{stage.title}</h3>
                            <p className="text-green-600 font-medium">{stage.stage}</p>
                          </div>
                        </div>
                        <p className="text-oak-600 mb-6">{stage.description}</p>
                        
                        <ul className="space-y-2">
                          {stage.practices.map((practice, i) => (
                            <li key={i} className="flex items-center text-oak-700">
                              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-6 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-4">
{index === 0 ? <NaturePeople className="text-green-600" sx={{ fontSize: 20 }} /> : 
                             index === 1 ? <Build className="text-green-600" sx={{ fontSize: 20 }} /> : 
                             index === 2 ? <Home className="text-green-600" sx={{ fontSize: 20 }} /> : 
                             <Recycling className="text-green-600" sx={{ fontSize: 20 }} />}
                          </div>
                          <h4 className="text-lg font-semibold text-oak-800 mb-2">Environmental Impact</h4>
                          <p className="text-oak-600 text-sm">{stage.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Section */}
          {activeSection === 'impact' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-oak-800 mb-4">
                  Measuring Our Impact
                </h2>
                <p className="text-lg text-oak-600 max-w-3xl mx-auto">
                  Transparency is key to accountability. Here's how our sustainable practices 
                  translate into measurable environmental benefits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {sustainabilityStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                    <h3 className="text-lg font-semibold text-oak-800 mb-2">{stat.label}</h3>
                    <p className="text-oak-600 text-sm">{stat.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-oak-800 mb-6">Annual Environmental Report 2024</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-oak-700">Carbon Footprint</span>
                      <span className="font-semibold text-green-600">Net Negative</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-oak-700">Trees Planted</span>
                      <span className="font-semibold text-green-600">127 Oak Trees</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-oak-700">Wood Waste Diverted</span>
                      <span className="font-semibold text-green-600">2.3 Tons</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-oak-700">Solar Energy Generated</span>
                      <span className="font-semibold text-green-600">48,500 kWh</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-oak-700">Water Consumption</span>
                      <span className="font-semibold text-green-600">-15% vs 2023</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold text-oak-800 mb-6">Future Commitments</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1">2025</div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Achieve 110% renewable energy</h4>
                        <p className="text-oak-600 text-sm">Surplus energy to power neighboring businesses</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1">2026</div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Launch furniture take-back program</h4>
                        <p className="text-oak-600 text-sm">Refurbish and donate or upcycle old pieces</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1">2027</div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Carbon negative operations</h4>
                        <p className="text-oak-600 text-sm">Remove more carbon than we produce annually</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1">2030</div>
                      <div>
                        <h4 className="font-semibold text-oak-800">Regenerative forest partnership</h4>
                        <p className="text-oak-600 text-sm">Partner forests improve biodiversity over time</p>
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
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Choose Furniture That Cares for Tomorrow
          </h2>
          <p className="text-xl text-green-200 mb-8 max-w-2xl mx-auto">
            Every piece you choose supports sustainable forestry, clean manufacturing, 
            and a healthier planet for future generations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products"
              className="bg-white text-green-800 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Shop Sustainable Oak Furniture
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Learn More About Our Practices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}