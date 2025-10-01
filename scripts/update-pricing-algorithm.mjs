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

const updatePricingSystem = async () => {
  console.log('💰 Updating Pricing System with New Algorithm...')
  
  try {
    // 1. Update Table Shapes with base price ranges
    console.log('📐 Updating table shapes with base prices...')
    
    const shapes = await client.fetch('*[_type == "tableShape"]')
    
    for (const shape of shapes) {
      let basePriceRange = { min: 0, max: 0 }
      
      switch (shape.name) {
        case 'Rectangular':
          basePriceRange = { min: 200, max: 1200 }
          break
        case 'Oval':
          basePriceRange = { min: 250, max: 400 }
          break
        case 'Round':
          basePriceRange = { min: 300, max: 450 }
          break
      }
      
      await client
        .patch(shape._id)
        .set({
          basePriceRange,
          description: shape.description + ` Base price range: €${basePriceRange.min}-${basePriceRange.max}.`
        })
        .commit()
      
      console.log(`  ✅ Updated ${shape.name}: €${basePriceRange.min}-${basePriceRange.max}`)
    }

    // 2. Update Materials with new multipliers
    console.log('🌳 Updating material multipliers...')
    
    const materials = await client.fetch('*[_type == "tableMaterial"]')
    
    for (const material of materials) {
      let priceMultiplier = 1.0
      
      switch (material.name) {
        case 'Pine':
          priceMultiplier = 1.0 // baseline, entry-level
          break
        case 'Birch':
          priceMultiplier = 1.2 // better finish, slightly harder wood
          break
        case 'Oak':
          priceMultiplier = 1.5 // premium, heavy, durable
          break
      }
      
      await client
        .patch(material._id)
        .set({ priceMultiplier })
        .commit()
      
      console.log(`  ✅ Updated ${material.name}: ×${priceMultiplier}`)
    }

    // 3. Update Sizes with new multipliers
    console.log('📏 Updating size multipliers...')
    
    const sizes = await client.fetch('*[_type == "tableSize"]')
    
    for (const size of sizes) {
      let priceMultiplier = 1.0
      
      // Map size names to multipliers
      if (size.name.includes('Small')) {
        priceMultiplier = 1.0
      } else if (size.name.includes('Medium')) {
        priceMultiplier = 1.7
      } else if (size.name.includes('Large') && !size.name.includes('Extra')) {
        priceMultiplier = 2.4
      } else if (size.name.includes('Extra Large')) {
        priceMultiplier = 2.4 // Same as Large for now, can be adjusted
      } else if (size.name.includes('Custom')) {
        priceMultiplier = 1.5 // Custom sizing premium
      }
      
      await client
        .patch(size._id)
        .set({ priceMultiplier })
        .commit()
      
      console.log(`  ✅ Updated ${size.name}: ×${priceMultiplier}`)
    }

    // 4. Update Quality grades with additive percentages
    console.log('⭐ Updating quality adjustments (additive)...')
    
    const qualities = await client.fetch('*[_type == "tableQuality"]')
    
    for (const quality of qualities) {
      let qualityAdjustment = 0 // Now additive percentage
      
      switch (quality.grade) {
        case 'rustic':
          qualityAdjustment = 5 // +5%
          break
        case 'character':
          qualityAdjustment = 20 // +20%
          break
        case 'prime':
          qualityAdjustment = 50 // +50%
          break
      }
      
      await client
        .patch(quality._id)
        .set({ 
          qualityAdjustment,
          // Keep the old multiplier for backward compatibility, but add new field
          priceMultiplier: 1.0 + (qualityAdjustment / 100)
        })
        .commit()
      
      console.log(`  ✅ Updated ${quality.name}: +${qualityAdjustment}%`)
    }

    console.log('\n🎉 Pricing System Updated Successfully!')
    console.log('\n📊 New Pricing Algorithm:')
    console.log('   1. Base Price by Shape:')
    console.log('      • Rectangular: €200-1200')
    console.log('      • Oval: €250-400')
    console.log('      • Round: €300-450')
    console.log('   2. Material Multiplier:')
    console.log('      • Pine: ×1.0 (baseline)')
    console.log('      • Birch: ×1.2 (better finish)')
    console.log('      • Oak: ×1.5 (premium)')
    console.log('   3. Size Multiplier:')
    console.log('      • Small: ×1.0')
    console.log('      • Medium: ×1.7')
    console.log('      • Large: ×2.4')
    console.log('   4. Quality Adjustment (additive):')
    console.log('      • Rustic: +5%')
    console.log('      • Character: +20%')
    console.log('      • Prime: +50%')
    
    console.log('\n💡 Example Calculation:')
    console.log('   Rectangular Oak Medium Character table:')
    console.log('   Base (Rectangular): €600 (mid-range)')
    console.log('   × Material (Oak): ×1.5 = €900')
    console.log('   × Size (Medium): ×1.7 = €1,530')
    console.log('   + Quality (Character): +20% = €1,836')

  } catch (error) {
    console.error('❌ Error updating pricing system:', error)
    throw error
  }
}

// Run the update if this script is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updatePricingSystem()
    .then(() => {
      console.log('\n✅ Pricing update complete!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Pricing update failed:', error)
      process.exit(1)
    })
}

export default updatePricingSystem