#!/usr/bin/env node

console.log('\n🔑 Sanity Write Token Setup Guide\n')
console.log('Follow these steps to get your write token:\n')

console.log('1. 🌐 Open your browser and go to:')
console.log('   https://www.sanity.io/manage\n')

console.log('2. 📁 Select your project:')
console.log('   "wood-and-good-frontend" or "hrcndigj"\n')

console.log('3. ⚙️  Navigate to API settings:')
console.log('   Click on the "API" tab\n')

console.log('4. 🎫 Go to Tokens section:')
console.log('   Click on "Tokens" in the left sidebar\n')

console.log('5. ➕ Create a new token:')
console.log('   • Click "Add API token"')
console.log('   • Name: "Table Configuration Write Token"')
console.log('   • Permissions: Select "Editor" (gives read/write access)')
console.log('   • Click "Save"\n')

console.log('6. 📋 Copy the token:')
console.log('   ⚠️  You\'ll only see it once, so copy it immediately!\n')

console.log('7. 📝 Add it to your .env.local file:')
console.log('   Replace "your_write_token_here" with your actual token\n')

console.log('8. 🚀 Run the initialization:')
console.log('   npm run table-config:init\n')

console.log('💡 Token format should look like:')
console.log('   sk1234abcd5678efgh9012ijkl3456mnop7890qrst...\n')

console.log('🔒 Security Note:')
console.log('   Keep this token secure and never commit it to version control!')
console.log('   The .env.local file is already in your .gitignore\n')

// Check if token is already set
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

if (process.env.SANITY_WRITE_TOKEN && process.env.SANITY_WRITE_TOKEN !== 'your_write_token_here') {
  console.log('✅ Write token is configured!')
  console.log('   You can now run: npm run table-config:init')
} else {
  console.log('❌ Write token not configured yet.')
  console.log('   Please follow the steps above to get your token.')
}