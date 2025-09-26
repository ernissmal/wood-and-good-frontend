import Link from 'next/link';
import { Park, Build, Favorite, NaturePeople, Carpenter, LocalFlorist, Handyman, AutoFixHigh, Engineering } from '@mui/icons-material';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-oak-800 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-oak-600 max-w-3xl mx-auto">
            Three generations of craftsmanship, sustainability, and passion for creating 
            beautiful oak furniture that stands the test of time.
          </p>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-oak-800 mb-6">
                Heritage & Tradition
              </h2>
              <p className="text-oak-600 mb-6 text-lg leading-relaxed">
                Founded in 1975 by master craftsman Jānis Ozols, Wood & Good began as a small 
                workshop in the heart of Latvia's oak forests. What started as a passion for 
                working with solid oak has grown into a family business spanning three generations.
              </p>
              <p className="text-oak-600 mb-6 text-lg leading-relaxed">
                Today, we combine traditional hand-crafting techniques passed down through our 
                family with modern precision tools and sustainable practices. Every piece we 
                create tells a story of dedication, quality, and respect for the natural beauty of oak.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-oak-50 rounded-lg">
                  <div className="text-2xl font-bold text-oak-700">1975</div>
                  <div className="text-oak-600 text-sm">Founded</div>
                </div>
                <div className="text-center p-4 bg-oak-50 rounded-lg">
                  <div className="text-2xl font-bold text-oak-700">3</div>
                  <div className="text-oak-600 text-sm">Generations</div>
                </div>
                <div className="text-center p-4 bg-oak-50 rounded-lg">
                  <div className="text-2xl font-bold text-oak-700">5000+</div>
                  <div className="text-oak-600 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="wood-texture h-96 bg-oak-200 rounded-lg flex items-center justify-center">
              <span className="text-oak-600 font-medium">Workshop Heritage Photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Our Values
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Every decision we make is guided by our commitment to quality, 
              sustainability, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-4 text-oak-600 flex justify-center">
                <Park sx={{ fontSize: 48 }} />
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-4">
                Sustainability First
              </h3>
              <p className="text-oak-600">
                We source our oak exclusively from FSC-certified forests and use 
                eco-friendly finishes. Every tree used is part of sustainable 
                forestry programs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-4 text-oak-600 flex justify-center">
                <Build sx={{ fontSize: 48 }} />
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-4">
                Master Craftsmanship
              </h3>
              <p className="text-oak-600">
                Our artisans combine traditional joinery techniques with modern 
                precision. Each piece is individually crafted and finished by hand 
                to ensure lasting quality.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-4 text-oak-600 flex justify-center">
                <Favorite sx={{ fontSize: 48 }} />
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-4">
                Customer Care
              </h3>
              <p className="text-oak-600">
                We believe furniture should be an investment that lasts generations. 
                Our customer service and lifetime craftsmanship warranty reflect 
                this commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              From Forest to Home
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Follow the journey of how we transform sustainably sourced oak 
              into beautiful, lasting furniture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <NaturePeople className="text-oak-600" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="font-semibold text-oak-800 mb-2">1. Sourcing</h3>
              <p className="text-sm text-oak-600">
                Carefully selected oak from certified sustainable forests
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Engineering className="text-oak-600" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="font-semibold text-oak-800 mb-2">2. Milling</h3>
              <p className="text-sm text-oak-600">
                Precision cutting and shaping using traditional and modern techniques
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handyman className="text-oak-600" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="font-semibold text-oak-800 mb-2">3. Crafting</h3>
              <p className="text-sm text-oak-600">
                Hand-assembled using time-tested joinery methods
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AutoFixHigh className="text-oak-600" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="font-semibold text-oak-800 mb-2">4. Finishing</h3>
              <p className="text-sm text-oak-600">
                Natural oil or lacquer finishes that enhance the wood's beauty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              The skilled artisans and passionate individuals who bring our 
              oak furniture to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-oak-200 flex items-center justify-center">
                <span className="text-oak-600 font-medium">Jānis Ozols</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-oak-800 mb-1">Jānis Ozols</h3>
                <p className="text-oak-600 text-sm mb-3">Founder & Master Craftsman</p>
                <p className="text-oak-600 text-sm">
                  With over 50 years of experience, Jānis established the traditional 
                  techniques that define our quality standards.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-oak-200 flex items-center justify-center">
                <span className="text-oak-600 font-medium">Mārtiņš Ozols</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-oak-800 mb-1">Mārtiņš Ozols</h3>
                <p className="text-oak-600 text-sm mb-3">Production Manager</p>
                <p className="text-oak-600 text-sm">
                  Second generation craftsman who modernized our processes while 
                  maintaining traditional quality.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-oak-200 flex items-center justify-center">
                <span className="text-oak-600 font-medium">Anna Ozola</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-oak-800 mb-1">Anna Ozola</h3>
                <p className="text-oak-600 text-sm mb-3">Design Director</p>
                <p className="text-oak-600 text-sm">
                  Third generation leader bringing contemporary design sensibilities 
                  to our traditional craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Dive Deeper Into Our Story
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Learn more about our commitment to excellence and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/about/craftsmanship" className="group">
              <div className="bg-oak-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform text-oak-600 flex">
                  <Carpenter sx={{ fontSize: 48 }} />
                </div>
                <h3 className="text-2xl font-bold text-oak-800 mb-4 group-hover:text-oak-600 transition-colors">
                  Our Craftsmanship
                </h3>
                <p className="text-oak-600 mb-4">
                  Discover the traditional techniques and modern precision that go into every piece. 
                  From wood selection to final finishing, see how master craftsmen create furniture to last generations.
                </p>
                <div className="text-oak-600 font-medium group-hover:text-oak-800 transition-colors">
                  Learn about our process →
                </div>
              </div>
            </Link>

            <Link href="/about/sustainability" className="group">
              <div className="bg-green-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform text-green-600 flex">
                  <LocalFlorist sx={{ fontSize: 48 }} />
                </div>
                <h3 className="text-2xl font-bold text-oak-800 mb-4 group-hover:text-green-700 transition-colors">
                  Our Sustainability
                </h3>
                <p className="text-oak-600 mb-4">
                  Learn about our commitment to environmental stewardship, from FSC-certified forests 
                  to carbon-neutral production. See how we're building furniture and forests for the future.
                </p>
                <div className="text-green-600 font-medium group-hover:text-green-800 transition-colors">
                  Explore our impact →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-oak-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Craftsmanship?</h2>
          <p className="text-oak-200 mb-8 max-w-2xl mx-auto">
            Discover our collection of handcrafted oak furniture and find pieces 
            that will become treasured heirlooms in your home.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link href="/products" className="bg-oak-600 hover:bg-oak-700 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
              Browse Collection
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-oak-600 hover:bg-oak-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}