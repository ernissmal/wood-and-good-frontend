#!/usr/bin/env node

/**
 * Pre-deployment Check Script
 * Verifies that everything is ready for CMS deployment
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const requiredFiles = [
  'sanity.config.ts',
  'schemas/index.ts',
  'schemas/productCategory.ts',
  'schemas/productType.ts', 
  'schemas/blogCategory.ts',
  'schemas/productContent.ts',
  'schemas/blogPost.ts',
  'schemas/testimonial.ts',
  'scripts/deploy-cms.mjs'
]

function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variables...')
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET'
  ]
  
  let allPresent = true
  
  requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar}: ${process.env[envVar]}`)
    } else {
      console.log(`❌ ${envVar}: Missing`)
      allPresent = false
    }
  })
  
  if (process.env.SANITY_WRITE_TOKEN) {
    console.log(`✅ SANITY_WRITE_TOKEN: Present (${process.env.SANITY_WRITE_TOKEN.substring(0, 8)}...)`)
  } else {
    console.log(`⚠️  SANITY_WRITE_TOKEN: Missing (required for deployment)`)
  }
  
  return allPresent
}

function checkRequiredFiles() {
  console.log('\n📁 Checking required files...')
  
  let allPresent = true
  
  requiredFiles.forEach(file => {
    if (existsSync(file)) {
      console.log(`✅ ${file}`)
    } else {
      console.log(`❌ ${file}: Missing`)
      allPresent = false
    }
  })
  
  return allPresent
}

function checkPackageScripts() {
  console.log('\n📦 Checking package.json scripts...')
  
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'))
    const requiredScripts = [
      'sanity:dev',
      'sanity:build', 
      'sanity:deploy',
      'cms:deploy'
    ]
    
    let allPresent = true
    
    requiredScripts.forEach(script => {
      if (packageJson.scripts[script]) {
        console.log(`✅ ${script}: ${packageJson.scripts[script]}`)
      } else {
        console.log(`❌ ${script}: Missing`)
        allPresent = false
      }
    })
    
    return allPresent
  } catch (error) {
    console.log(`❌ Error reading package.json: ${error.message}`)
    return false
  }
}

function main() {
  console.log('🚀 Wood and Good CMS Pre-deployment Check\n')
  
  const envCheck = checkEnvironmentVariables()
  const filesCheck = checkRequiredFiles()
  const scriptsCheck = checkPackageScripts()
  
  console.log('\n📊 Summary:')
  
  if (envCheck && filesCheck && scriptsCheck) {
    console.log('🎉 All checks passed! Ready for deployment.')
    console.log('\nNext steps:')
    console.log('1. Make sure you have a SANITY_WRITE_TOKEN in your .env.local')
    console.log('2. Run: npm run sanity:deploy')
    console.log('3. Run: npm run cms:deploy') 
    console.log('4. Run: npm run sanity:dev')
    process.exit(0)
  } else {
    console.log('❌ Some checks failed. Please fix the issues above before deploying.')
    
    if (!envCheck) {
      console.log('\n📝 Environment variable setup:')
      console.log('Create or update your .env.local file with:')
      console.log('NEXT_PUBLIC_SANITY_PROJECT_ID=hrcndigj')
      console.log('NEXT_PUBLIC_SANITY_DATASET=production') 
      console.log('SANITY_WRITE_TOKEN=your-token-here')
    }
    
    process.exit(1)
  }
}

main()