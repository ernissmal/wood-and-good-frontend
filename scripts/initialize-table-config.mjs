#!/usr/bin/env node
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
})

const initializeTableConfiguration = async () => {
  console.log('🪵 Initializing Table Configuration System...')
  
  try {
    // 1. Create Table Shapes
    console.log('📐 Creating table shapes...')
    const shapes = [
      {
        _type: 'tableShape',
        name: 'Oval',
        slug: { current: 'oval', _type: 'slug' },
        description: 'Elegant oval tables with smooth, curved edges that create a sophisticated and welcoming atmosphere.',
        isActive: true,
        sortOrder: 1
      },
      {
        _type: 'tableShape',
        name: 'Round',
        slug: { current: 'round', _type: 'slug' },
        description: 'Classic round tables perfect for intimate gatherings and conversation-focused dining.',
        isActive: true,
        sortOrder: 2
      },
      {
        _type: 'tableShape',
        name: 'Rectangular',
        slug: { current: 'rectangular', _type: 'slug' },
        description: 'Traditional rectangular tables offering maximum seating capacity and versatile placement options.',
        isActive: true,
        sortOrder: 3
      }
    ]

    const createdShapes = []
    for (const shape of shapes) {
      const result = await client.create(shape)
      createdShapes.push(result)
      console.log(`  ✅ Created shape: ${shape.name}`)
    }

    // 2. Create Table Materials
    console.log('🌳 Creating table materials...')
    const materials = [
      {
        _type: 'tableMaterial',
        name: 'Pine',
        slug: { current: 'pine', _type: 'slug' },
        description: 'Soft, light-colored wood with prominent grain patterns. Perfect for rustic and Scandinavian-style interiors.',
        properties: {
          hardness: 'soft',
          grainPattern: 'Prominent straight grain with occasional knots',
          colorRange: 'Light cream to warm honey tones',
          durability: 6
        },
        priceMultiplier: 0.8,
        isActive: true,
        sortOrder: 1
      },
      {
        _type: 'tableMaterial',
        name: 'Birch',
        slug: { current: 'birch', _type: 'slug' },
        description: 'Medium-density hardwood with fine, even grain. Excellent balance of beauty, durability, and workability.',
        properties: {
          hardness: 'medium',
          grainPattern: 'Fine, even grain with minimal variation',
          colorRange: 'Pale yellow to light brown with slight reddish tint',
          durability: 7
        },
        priceMultiplier: 1.0,
        isActive: true,
        sortOrder: 2
      },
      {
        _type: 'tableMaterial',
        name: 'Oak',
        slug: { current: 'oak', _type: 'slug' },
        description: 'Premium hardwood renowned for its strength, durability, and distinctive grain. The gold standard for fine furniture.',
        properties: {
          hardness: 'hard',
          grainPattern: 'Bold, distinctive grain with prominent ray patterns',
          colorRange: 'Light golden brown to deep amber tones',
          durability: 9
        },
        priceMultiplier: 1.4,
        isActive: true,
        sortOrder: 3
      }
    ]

    const createdMaterials = []
    for (const material of materials) {
      const result = await client.create(material)
      createdMaterials.push(result)
      console.log(`  ✅ Created material: ${material.name}`)
    }

    // 3. Create Table Sizes
    console.log('📏 Creating table sizes...')
    const sizes = [
      {
        _type: 'tableSize',
        name: 'Small Dining Table',
        slug: { current: 'small-dining', _type: 'slug' },
        dimensions: {
          length: 120,
          width: 80,
          height: 75,
          thickness: 4
        },
        suitableShapes: createdShapes.map(s => ({ _type: 'reference', _ref: s._id })),
        seatingCapacity: {
          min: 2,
          max: 4,
          comfortable: 4
        },
        priceMultiplier: 0.8,
        isStandard: true,
        isActive: true,
        sortOrder: 1
      },
      {
        _type: 'tableSize',
        name: 'Medium Dining Table',
        slug: { current: 'medium-dining', _type: 'slug' },
        dimensions: {
          length: 160,
          width: 90,
          height: 75,
          thickness: 4
        },
        suitableShapes: createdShapes.map(s => ({ _type: 'reference', _ref: s._id })),
        seatingCapacity: {
          min: 4,
          max: 6,
          comfortable: 6
        },
        priceMultiplier: 1.0,
        isStandard: true,
        isActive: true,
        sortOrder: 2
      },
      {
        _type: 'tableSize',
        name: 'Large Dining Table',
        slug: { current: 'large-dining', _type: 'slug' },
        dimensions: {
          length: 200,
          width: 100,
          height: 75,
          thickness: 4
        },
        suitableShapes: createdShapes.map(s => ({ _type: 'reference', _ref: s._id })),
        seatingCapacity: {
          min: 6,
          max: 8,
          comfortable: 8
        },
        priceMultiplier: 1.3,
        isStandard: true,
        isActive: true,
        sortOrder: 3
      },
      {
        _type: 'tableSize',
        name: 'Extra Large Dining Table',
        slug: { current: 'xl-dining', _type: 'slug' },
        dimensions: {
          length: 240,
          width: 110,
          height: 75,
          thickness: 5
        },
        suitableShapes: createdShapes.filter(s => s.name === 'Rectangular').map(s => ({ _type: 'reference', _ref: s._id })),
        seatingCapacity: {
          min: 8,
          max: 10,
          comfortable: 10
        },
        priceMultiplier: 1.6,
        isStandard: true,
        isActive: true,
        sortOrder: 4
      },
      {
        _type: 'tableSize',
        name: 'Custom Size',
        slug: { current: 'custom-size', _type: 'slug' },
        dimensions: {
          length: 0,
          width: 0,
          height: 75,
          thickness: 4
        },
        suitableShapes: createdShapes.map(s => ({ _type: 'reference', _ref: s._id })),
        seatingCapacity: {
          min: 1,
          max: 20,
          comfortable: 6
        },
        priceMultiplier: 1.2,
        isStandard: false,
        isActive: true,
        sortOrder: 5
      }
    ]

    const createdSizes = []
    for (const size of sizes) {
      const result = await client.create(size)
      createdSizes.push(result)
      console.log(`  ✅ Created size: ${size.name}`)
    }

    // 4. Create Quality Grades
    console.log('⭐ Creating quality grades...')
    const qualities = [
      {
        _type: 'tableQuality',
        name: 'Prime Grade',
        slug: { current: 'prime', _type: 'slug' },
        grade: 'prime',
        description: 'The finest quality wood with minimal defects, consistent grain, and premium appearance. Perfect for luxury dining rooms and formal spaces.',
        characteristics: [
          {
            feature: 'Grain Consistency',
            description: 'Uniform, straight grain with minimal variation'
          },
          {
            feature: 'Surface Quality',
            description: 'Smooth surface with no knots or defects visible'
          },
          {
            feature: 'Color Matching',
            description: 'Consistent color throughout the piece'
          },
          {
            feature: 'Finish Quality',
            description: 'Flawless finish with deep luster and protection'
          }
        ],
        priceMultiplier: 1.5,
        qualityScore: 10,
        isActive: true,
        sortOrder: 1
      },
      {
        _type: 'tableQuality',
        name: 'Character Grade',
        slug: { current: 'character', _type: 'slug' },
        grade: 'character',
        description: 'High-quality wood featuring natural character marks like small knots and grain variations. Offers authentic wood beauty with excellent durability.',
        characteristics: [
          {
            feature: 'Natural Character',
            description: 'Small knots and natural grain variations add personality'
          },
          {
            feature: 'Authentic Beauty',
            description: 'Shows the natural story and history of the wood'
          },
          {
            feature: 'Structural Integrity',
            description: 'Excellent strength and durability for daily use'
          },
          {
            feature: 'Balanced Appearance',
            description: 'Character marks are distributed evenly'
          }
        ],
        priceMultiplier: 1.0,
        qualityScore: 8,
        isActive: true,
        sortOrder: 2
      },
      {
        _type: 'tableQuality',
        name: 'Rustic Grade',
        slug: { current: 'rustic', _type: 'slug' },
        grade: 'rustic',
        description: 'Bold, characterful wood with prominent knots, grain variations, and natural marks. Perfect for farmhouse, cabin, and informal dining spaces.',
        characteristics: [
          {
            feature: 'Bold Character',
            description: 'Large knots, grain variations, and natural marks'
          },
          {
            feature: 'Rustic Charm',
            description: 'Perfect for farmhouse and casual dining aesthetics'
          },
          {
            feature: 'Unique Personality',
            description: 'Each piece tells its own story through natural features'
          },
          {
            feature: 'Casual Elegance',
            description: 'Relaxed, welcoming appearance for everyday use'
          }
        ],
        priceMultiplier: 0.75,
        qualityScore: 6,
        isActive: true,
        sortOrder: 3
      }
    ]

    const createdQualities = []
    for (const quality of qualities) {
      const result = await client.create(quality)
      createdQualities.push(result)
      console.log(`  ✅ Created quality: ${quality.name}`)
    }

    console.log('\n🎉 Table Configuration System initialized successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   • ${createdShapes.length} table shapes created`)
    console.log(`   • ${createdMaterials.length} materials created`) 
    console.log(`   • ${createdSizes.length} sizes created`)
    console.log(`   • ${createdQualities.length} quality grades created`)
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Visit your Sanity Studio at https://twg.sanity.studio/')
    console.log('   2. Go to "Table Configuration" section')
    console.log('   3. Create table configurations by combining shapes, materials, sizes, and qualities')
    console.log('   4. Set up base products in the "Product Management" section')
    console.log('   5. Link table configurations to base products')

    return {
      shapes: createdShapes,
      materials: createdMaterials,
      sizes: createdSizes,
      qualities: createdQualities
    }

  } catch (error) {
    console.error('❌ Error initializing table configuration system:', error)
    throw error
  }
}

// Run the initialization if this script is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeTableConfiguration()
    .then(() => {
      console.log('\n✅ Initialization complete!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Initialization failed:', error)
      process.exit(1)
    })
}

export default initializeTableConfiguration