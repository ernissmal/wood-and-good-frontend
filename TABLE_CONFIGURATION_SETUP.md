# Table Configuration Setup Guide

## 🎯 Quick Setup Instructions

Your enhanced table configuration system is now deployed to https://twg.sanity.studio/

Follow these steps to set up the table customization data:

### Step 1: Create Table Shapes

Go to **Table Configuration > Table Shapes** and create:

**1. Oval**
- Name: `Oval`
- Slug: `oval` (auto-generated)
- Description: `Elegant oval tables with smooth, curved edges that create a sophisticated and welcoming atmosphere.`
- Sort Order: `1`
- Active: ✅

**2. Round**
- Name: `Round`
- Slug: `round`
- Description: `Classic round tables perfect for intimate gatherings and conversation-focused dining.`
- Sort Order: `2`
- Active: ✅

**3. Rectangular**
- Name: `Rectangular`
- Slug: `rectangular`
- Description: `Traditional rectangular tables offering maximum seating capacity and versatile placement options.`
- Sort Order: `3`
- Active: ✅

### Step 2: Create Table Materials

Go to **Table Configuration > Materials** and create:

**1. Pine**
- Name: `Pine`
- Slug: `pine`
- Description: `Soft, light-colored wood with prominent grain patterns. Perfect for rustic and Scandinavian-style interiors.`
- Price Multiplier: `0.8`
- Properties:
  - Hardness: `Soft`
  - Grain Pattern: `Prominent straight grain with occasional knots`
  - Color Range: `Light cream to warm honey tones`
  - Durability: `6`
- Sort Order: `1`
- Active: ✅

**2. Birch**
- Name: `Birch`
- Slug: `birch`
- Description: `Medium-density hardwood with fine, even grain. Excellent balance of beauty, durability, and workability.`
- Price Multiplier: `1.0`
- Properties:
  - Hardness: `Medium`
  - Grain Pattern: `Fine, even grain with minimal variation`
  - Color Range: `Pale yellow to light brown with slight reddish tint`
  - Durability: `7`
- Sort Order: `2`
- Active: ✅

**3. Oak**
- Name: `Oak`
- Slug: `oak`
- Description: `Premium hardwood renowned for its strength, durability, and distinctive grain. The gold standard for fine furniture.`
- Price Multiplier: `1.4`
- Properties:
  - Hardness: `Hard`
  - Grain Pattern: `Bold, distinctive grain with prominent ray patterns`
  - Color Range: `Light golden brown to deep amber tones`
  - Durability: `9`
- Sort Order: `3`
- Active: ✅

### Step 3: Create Table Sizes

Go to **Table Configuration > Sizes** and create:

**1. Small Dining Table**
- Name: `Small Dining Table`
- Slug: `small-dining`
- Dimensions:
  - Length: `120` cm
  - Width: `80` cm
  - Height: `75` cm
  - Thickness: `4` cm
- Suitable Shapes: Select all 3 shapes (Oval, Round, Rectangular)
- Seating Capacity:
  - Min: `2`
  - Max: `4`
  - Comfortable: `4`
- Price Multiplier: `0.8`
- Standard Size: ✅
- Sort Order: `1`
- Active: ✅

**2. Medium Dining Table**
- Name: `Medium Dining Table`
- Slug: `medium-dining`
- Dimensions: `160×90×75×4` cm
- Suitable Shapes: All 3 shapes
- Seating: `4/6/6` (min/max/comfortable)
- Price Multiplier: `1.0`
- Standard Size: ✅
- Sort Order: `2`

**3. Large Dining Table**
- Name: `Large Dining Table`
- Slug: `large-dining`
- Dimensions: `200×100×75×4` cm
- Suitable Shapes: All 3 shapes
- Seating: `6/8/8`
- Price Multiplier: `1.3`
- Standard Size: ✅
- Sort Order: `3`

**4. Extra Large Dining Table**
- Name: `Extra Large Dining Table`
- Slug: `xl-dining`
- Dimensions: `240×110×75×5` cm
- Suitable Shapes: Only Rectangular
- Seating: `8/10/10`
- Price Multiplier: `1.6`
- Standard Size: ✅
- Sort Order: `4`

**5. Custom Size**
- Name: `Custom Size`
- Slug: `custom-size`
- Dimensions: `0×0×75×4` cm (zeros for length/width)
- Suitable Shapes: All 3 shapes
- Seating: `1/20/6`
- Price Multiplier: `1.2`
- Standard Size: ❌ (uncheck this)
- Sort Order: `5`

### Step 4: Create Quality Grades

Go to **Table Configuration > Quality Grades** and create:

**1. Prime Grade**
- Name: `Prime Grade`
- Slug: `prime`
- Grade: `PRIME`
- Description: `The finest quality wood with minimal defects, consistent grain, and premium appearance. Perfect for luxury dining rooms and formal spaces.`
- Price Multiplier: `1.5`
- Quality Score: `10`
- Characteristics (add 4 items):
  1. Feature: `Grain Consistency` | Description: `Uniform, straight grain with minimal variation`
  2. Feature: `Surface Quality` | Description: `Smooth surface with no knots or defects visible`
  3. Feature: `Color Matching` | Description: `Consistent color throughout the piece`
  4. Feature: `Finish Quality` | Description: `Flawless finish with deep luster and protection`
- Sort Order: `1`
- Active: ✅

**2. Character Grade**
- Name: `Character Grade`
- Slug: `character`
- Grade: `CHARACTER`
- Description: `High-quality wood featuring natural character marks like small knots and grain variations. Offers authentic wood beauty with excellent durability.`
- Price Multiplier: `1.0`
- Quality Score: `8`
- Characteristics:
  1. `Natural Character` | `Small knots and natural grain variations add personality`
  2. `Authentic Beauty` | `Shows the natural story and history of the wood`
  3. `Structural Integrity` | `Excellent strength and durability for daily use`
  4. `Balanced Appearance` | `Character marks are distributed evenly`
- Sort Order: `2`

**3. Rustic Grade**
- Name: `Rustic Grade`
- Slug: `rustic`
- Grade: `RUSTIC`
- Description: `Bold, characterful wood with prominent knots, grain variations, and natural marks. Perfect for farmhouse, cabin, and informal dining spaces.`
- Price Multiplier: `0.75`
- Quality Score: `6`
- Characteristics:
  1. `Bold Character` | `Large knots, grain variations, and natural marks`
  2. `Rustic Charm` | `Perfect for farmhouse and casual dining aesthetics`
  3. `Unique Personality` | `Each piece tells its own story through natural features`
  4. `Casual Elegance` | `Relaxed, welcoming appearance for everyday use`
- Sort Order: `3`

### Step 5: Create Table Configurations

Once you have all the basic components, go to **Table Configuration > Table Configurations** and create specific combinations:

**Example Configuration:**
- Name: `Medium Oak Oval - Character Grade`
- Base Product: Link to an existing table product
- Shape: Oval
- Material: Oak
- Size: Medium Dining Table
- Quality: Character Grade
- Estimated Lead Time: `14` days
- Available for Order: ✅

**Price Calculation:**
Base Price × Material Multiplier × Size Multiplier × Quality Multiplier
Example: $1000 × 1.4 (Oak) × 1.0 (Medium) × 1.0 (Character) = $1,400

### Step 6: Test Customer Quotes

Go to **Customer Quotes > All Quotes** and create a test quote to verify the system works.

## 🎉 What You've Accomplished

Your table configuration system now supports:

✅ **Complete customization workflow** (Shape → Material → Size → Quality)
✅ **Automatic price calculation** with multipliers
✅ **Custom dimensions** with price adjustments
✅ **Quote generation and management**
✅ **Status tracking** for customer quotes
✅ **Organized studio interface** for easy management

## 🚀 Next Steps

1. Create the basic data using the guide above
2. Set up a few example table configurations
3. Test the quote generation system
4. Begin using the new API endpoints in your frontend

The system is now ready to handle your client's complete table customization process!