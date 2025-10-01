# CMS Deployment Guide

This guide will help you deploy the new schema structure to your Sanity CMS.

## Prerequisites

1. **Sanity Project**: You already have a Sanity project (ID: hrcndigj)
2. **Sanity Token**: You'll need a write token for deployment

## Step 1: Get Your Sanity Write Token

1. Go to https://www.sanity.io/manage
2. Select your Wood and Good project (hrcndigj)
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Name it "CMS Deployment Token"
6. Set permissions to **Editor** or **Admin**
7. Copy the generated token

## Step 2: Configure Environment Variables

Add the write token to your `.env.local` file:

```bash
# Add this line to your .env.local file
SANITY_WRITE_TOKEN=your-token-here
```

Your `.env.local` should now contain:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=hrcndigj
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your-token-here
```

## Step 3: Deploy the Schema

Run the following commands in your terminal:

```bash
# 1. Deploy the new schema structure to Sanity
npm run sanity:deploy

# 2. Create initial categories
npm run cms:deploy

# 3. Start the Sanity Studio locally
npm run sanity:dev
```

## Step 4: Verify Deployment

After running the commands above:

1. **Sanity Studio** should open in your browser (usually at http://localhost:3333)
2. You should see the new **organized sidebar** with:
   - **Product Management** section
   - **Content Management** section  
   - **Testimonials** section

3. **Check the categories** were created:
   - Go to Product Management → Product Categories
   - You should see all the table and leg categories
   - Go to Content Management → Blog Categories  
   - You should see all 6 blog categories

## Step 5: Update Existing Content

### For Existing Products:
1. Open each product in Sanity Studio
2. Change the old `category` field to use the new `Product Category` reference
3. Set the appropriate category (Tables, Table Legs, etc.)
4. For table legs, set the `Leg Shape` in specifications

### For Existing Blog Posts:
1. Open each blog post in Sanity Studio
2. Change the old `categories` array to use the new `Category` reference
3. Select the appropriate blog category
4. Set `Featured Post` checkbox if applicable

### For Existing Testimonials:
1. Open each testimonial in Sanity Studio
2. Set the `Testimonial Type` (B2C or B2B)
3. Set `Published` to true to make them visible
4. Set `Featured` for homepage testimonials

## What You'll See in Sanity Studio

### Product Management Section:
- **All Products** - Complete product list
- **Tables** - Only table products
- **Table Legs** - Only table leg products  
- **Other Products** - Everything else
- **Product Categories** - Manage categories
- **Product Types** - Manage subcategories

### Content Management Section:
- **All Blog Posts** - Complete blog list
- **Wood Care** - Wood care articles only
- **Design Tips** - Design articles only
- **Craftsmanship** - Craftsmanship articles only
- **Sustainability** - Sustainability articles only
- **Home Decor** - Home decor articles only
- **Furniture History** - History articles only
- **Blog Categories** - Manage blog categories

### Testimonials Section:
- **All Testimonials** - Complete testimonial list
- **B2C Testimonials** - Consumer testimonials
- **B2B Testimonials** - Business testimonials

## Troubleshooting

### Error: "Cannot find module './schemas'"
- Make sure you're in the root directory of your project
- Ensure all schema files were created properly

### Error: "SANITY_WRITE_TOKEN is required"
- Double-check your `.env.local` file has the token
- Verify the token has Editor/Admin permissions

### Error: "Document already exists"
- This is normal - it means categories were already created
- The script will skip existing categories and continue

### Studio shows old structure
- Clear your browser cache
- Restart the `npm run sanity:dev` command
- Check that the deployment was successful

## Next Steps After Deployment

1. **Test New Categories**: Create a test product and blog post using the new categories
2. **Update Existing Content**: Gradually migrate existing content to use new category references  
3. **Test Frontend**: Ensure your frontend can fetch data using the new schema
4. **Deploy Frontend**: Deploy your updated frontend code with the new API queries

## Schema Files Created

The following files have been created for your CMS:

- `sanity.config.ts` - Main Sanity configuration with organized sidebar
- `schemas/index.ts` - Schema registry
- `schemas/productCategory.ts` - Product category schema
- `schemas/productType.ts` - Product type schema (subcategories)
- `schemas/blogCategory.ts` - Blog category schema
- `schemas/productContent.ts` - Updated product schema
- `schemas/blogPost.ts` - Updated blog post schema
- `schemas/testimonial.ts` - Updated testimonial schema
- `scripts/deploy-cms.mjs` - Initial data deployment script

## Success Indicators

✅ **Sanity Studio** opens without errors  
✅ **New sidebar structure** is visible with organized sections  
✅ **Product categories** are created (Tables, Table Legs, Other)  
✅ **Blog categories** are created (Wood Care, Design Tips, etc.)  
✅ **New content creation** works with category references  
✅ **Frontend queries** return data using new schema structure  

If you encounter any issues, refer to the troubleshooting section above or check the Sanity Studio logs for specific error messages.