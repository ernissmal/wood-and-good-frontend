import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'

// Import schemas
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'wood-and-good-studio',
  title: 'Wood and Good CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hrcndigj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Product Management Section
            S.listItem()
              .title('Product Management')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .child(S.documentTypeList('productContent').title('All Products')),
                    S.listItem()
                      .title('Tables')
                      .child(
                        S.documentList()
                          .title('Tables')
                          .filter('_type == "productContent" && productCategory->categoryType == "tables"')
                      ),
                    S.listItem()
                      .title('Table Legs')
                      .child(
                        S.documentList()
                          .title('Table Legs')
                          .filter('_type == "productContent" && productCategory->categoryType == "table-legs"')
                      ),
                    S.listItem()
                      .title('Other Products')
                      .child(
                        S.documentList()
                          .title('Other Products')
                          .filter('_type == "productContent" && productCategory->categoryType == "other"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('Product Categories')
                      .child(S.documentTypeList('productCategory').title('Product Categories')),
                    S.listItem()
                      .title('Product Types')
                      .child(S.documentTypeList('productType').title('Product Types')),
                  ])
              ),
            
            // Content Management Section
            S.listItem()
              .title('Content Management')
              .child(
                S.list()
                  .title('Blog & Content')
                  .items([
                    S.listItem()
                      .title('All Blog Posts')
                      .child(S.documentTypeList('blogPost').title('All Blog Posts')),
                    S.listItem()
                      .title('Wood Care')
                      .child(
                        S.documentList()
                          .title('Wood Care Articles')
                          .filter('_type == "blogPost" && category->slug.current == "wood-care"')
                      ),
                    S.listItem()
                      .title('Design Tips')
                      .child(
                        S.documentList()
                          .title('Design Tips Articles')
                          .filter('_type == "blogPost" && category->slug.current == "design-tips"')
                      ),
                    S.listItem()
                      .title('Craftsmanship')
                      .child(
                        S.documentList()
                          .title('Craftsmanship Articles')
                          .filter('_type == "blogPost" && category->slug.current == "craftsmanship"')
                      ),
                    S.listItem()
                      .title('Sustainability')
                      .child(
                        S.documentList()
                          .title('Sustainability Articles')
                          .filter('_type == "blogPost" && category->slug.current == "sustainability"')
                      ),
                    S.listItem()
                      .title('Home Decor')
                      .child(
                        S.documentList()
                          .title('Home Decor Articles')
                          .filter('_type == "blogPost" && category->slug.current == "home-decor"')
                      ),
                    S.listItem()
                      .title('Furniture History')
                      .child(
                        S.documentList()
                          .title('Furniture History Articles')
                          .filter('_type == "blogPost" && category->slug.current == "furniture-history"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('Blog Categories')
                      .child(S.documentTypeList('blogCategory').title('Blog Categories')),
                  ])
              ),

            // Testimonials Section
            S.listItem()
              .title('Testimonials')
              .child(
                S.list()
                  .title('Customer Testimonials')
                  .items([
                    S.listItem()
                      .title('All Testimonials')
                      .child(S.documentTypeList('testimonial').title('All Testimonials')),
                    S.listItem()
                      .title('B2C Testimonials')
                      .child(
                        S.documentList()
                          .title('B2C Testimonials')
                          .filter('_type == "testimonial" && testimonialType == "B2C"')
                      ),
                    S.listItem()
                      .title('B2B Testimonials')
                      .child(
                        S.documentList()
                          .title('B2B Testimonials')
                          .filter('_type == "testimonial" && testimonialType == "B2B"')
                      ),
                  ])
              ),

            // Legacy - for backward compatibility
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => 
                !['productContent', 'productCategory', 'productType', 'blogPost', 'blogCategory', 'testimonial'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})