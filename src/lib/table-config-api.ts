// Enhanced API utilities for table configuration system
import { sanityClient } from './sanity'

// Table Configuration Types
export interface TableShape {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: any;
  areaMultiplier: number; // Material efficiency multiplier
  hasRealData: boolean; // Whether pricing is based on real data
  isActive: boolean;
  sortOrder: number;
}

export interface TableMaterial {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: any;
  properties?: {
    hardness?: string;
    grainPattern?: string;
    colorRange?: string;
    durability?: number;
  };
  priceMultiplier: number;
  hasRealData: boolean; // Whether pricing is based on real data
  estimatedMultiplier: boolean; // Whether multiplier is estimated
  isActive: boolean;
  sortOrder: number;
}

export interface TableSize {
  _id: string;
  name: string;
  slug: { current: string };
  dimensions: {
    length: number;
    width: number;
    height: number;
    thickness: number;
  };
  suitableShapes?: TableShape[];
  seatingCapacity: {
    min: number;
    max: number;
    comfortable: number;
  };
  basePrice: number; // Real manufacturer base price
  priceByQuality?: {
    rustic: number;
    character: number;
    prime: number;
  };
  surfaceArea?: number;
  priceMultiplier: number; // Legacy
  isStandard: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface TableQuality {
  _id: string;
  name: string;
  slug: { current: string };
  grade: 'prime' | 'character' | 'rustic';
  description?: string;
  characteristics?: Array<{
    feature: string;
    description: string;
  }>;
  exampleImages?: any[];
  qualityAdjustment: number; // Percentage amount (always positive)
  priceDirection: 'add' | 'subtract'; // Direction of adjustment
  realWorldMultiplier: number; // Calculated from real data
  priceMultiplier: number; // Legacy
  qualityScore: number;
  isActive: boolean;
  sortOrder: number;
}

export interface TableConfiguration {
  _id: string;
  name: string;
  baseProduct: any;
  shape: TableShape;
  material: TableMaterial;
  size: TableSize;
  quality: TableQuality;
  customDimensions?: {
    isCustom: boolean;
    length?: number;
    width?: number;
    height?: number;
    customPriceAdjustment?: number;
  };
  calculatedPrice?: number;
  priceOverride?: number;
  additionalOptions?: Array<{
    optionName: string;
    description?: string;
    priceAdjustment?: number;
    isRequired?: boolean;
  }>;
  images?: any[];
  estimatedLeadTime: number;
  isAvailable: boolean;
  notes?: string;
}

export interface CustomerQuote {
  _id: string;
  quoteNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    address?: string;
  };
  tableConfiguration: TableConfiguration;
  quantity: number;
  customizations?: Array<{
    description: string;
    additionalCost?: number;
    additionalTime?: number;
  }>;
  pricing: {
    basePrice: number;
    customizationCosts?: number;
    subtotal: number;
    discount?: {
      amount?: number;
      percentage?: number;
      reason?: string;
    };
    tax?: number;
    shipping?: number;
    totalPrice: number;
  };
  timeline: {
    estimatedLeadTime: number;
    quoteValidUntil: string;
    estimatedDelivery?: string;
  };
  status: 'draft' | 'sent' | 'viewed' | 'under-review' | 'accepted' | 'rejected' | 'expired' | 'converted';
  notes?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

// API Functions for Table Configuration System

export const tableConfigAPI = {
  // Get all table shapes
  async getTableShapes(): Promise<TableShape[]> {
    const query = `*[_type == "tableShape" && isActive == true] | order(sortOrder asc) {
      _id,
      name,
      slug,
      description,
      image,
      basePriceRange,
      isActive,
      sortOrder
    }`;
    return await sanityClient.fetch(query);
  },

  // Get all table materials
  async getTableMaterials(): Promise<TableMaterial[]> {
    const query = `*[_type == "tableMaterial" && isActive == true] | order(sortOrder asc) {
      _id,
      name,
      slug,
      description,
      image,
      properties,
      priceMultiplier,
      isActive,
      sortOrder
    }`;
    return await sanityClient.fetch(query);
  },

  // Get table sizes with shape compatibility
  async getTableSizes(shapeId?: string): Promise<TableSize[]> {
    let query = `*[_type == "tableSize" && isActive == true`;
    
    if (shapeId) {
      query += ` && references("${shapeId}")`;
    }
    
    query += `] | order(sortOrder asc) {
      _id,
      name,
      slug,
      dimensions,
      "suitableShapes": suitableShapes[]-> {
        _id,
        name,
        slug
      },
      seatingCapacity,
      priceMultiplier,
      isStandard,
      isActive,
      sortOrder
    }`;
    
    return await sanityClient.fetch(query);
  },

  // Get all quality grades
  async getTableQualities(): Promise<TableQuality[]> {
    const query = `*[_type == "tableQuality" && isActive == true] | order(qualityScore desc) {
      _id,
      name,
      slug,
      grade,
      description,
      characteristics,
      exampleImages,
      qualityAdjustment,
      priceMultiplier,
      qualityScore,
      isActive,
      sortOrder
    }`;
    return await sanityClient.fetch(query);
  },

  // Get table configurations with filtering
  async getTableConfigurations(filters?: {
    shapeId?: string;
    materialId?: string;
    sizeId?: string;
    qualityId?: string;
    available?: boolean;
  }): Promise<TableConfiguration[]> {
    let filterQuery = '';
    
    if (filters) {
      const conditions = [];
      if (filters.shapeId) conditions.push(`shape._ref == "${filters.shapeId}"`);
      if (filters.materialId) conditions.push(`material._ref == "${filters.materialId}"`);
      if (filters.sizeId) conditions.push(`size._ref == "${filters.sizeId}"`);
      if (filters.qualityId) conditions.push(`quality._ref == "${filters.qualityId}"`);
      if (filters.available !== undefined) conditions.push(`isAvailable == ${filters.available}`);
      
      if (conditions.length > 0) {
        filterQuery = ' && ' + conditions.join(' && ');
      }
    }

    const query = `*[_type == "tableConfiguration"${filterQuery}] | order(calculatedPrice asc) {
      _id,
      name,
      "baseProduct": baseProduct-> {
        _id,
        name,
        price
      },
      "shape": shape-> {
        _id,
        name,
        slug,
        description,
        image
      },
      "material": material-> {
        _id,
        name,
        slug,
        description,
        image,
        properties,
        priceMultiplier
      },
      "size": size-> {
        _id,
        name,
        slug,
        dimensions,
        seatingCapacity,
        priceMultiplier,
        isStandard
      },
      "quality": quality-> {
        _id,
        name,
        slug,
        grade,
        description,
        priceMultiplier,
        qualityScore
      },
      customDimensions,
      calculatedPrice,
      priceOverride,
      additionalOptions,
      images,
      estimatedLeadTime,
      isAvailable,
      notes
    }`;
    
    return await sanityClient.fetch(query);
  },

  // Get single table configuration by ID
  async getTableConfiguration(id: string): Promise<TableConfiguration | null> {
    const query = `*[_type == "tableConfiguration" && _id == "${id}"][0] {
      _id,
      name,
      "baseProduct": baseProduct-> {
        _id,
        name,
        price,
        detailedDescription,
        careInstructions,
        specifications,
        additionalImages
      },
      "shape": shape-> {
        _id,
        name,
        slug,
        description,
        image
      },
      "material": material-> {
        _id,
        name,
        slug,
        description,
        image,
        properties,
        priceMultiplier
      },
      "size": size-> {
        _id,
        name,
        slug,
        dimensions,
        seatingCapacity,
        priceMultiplier,
        isStandard
      },
      "quality": quality-> {
        _id,
        name,
        slug,
        grade,
        description,
        characteristics,
        exampleImages,
        priceMultiplier,
        qualityScore
      },
      customDimensions,
      calculatedPrice,
      priceOverride,
      additionalOptions,
      images,
      estimatedLeadTime,
      isAvailable,
      notes
    }`;
    
    return await sanityClient.fetch(query);
  },

  // Calculate price using real-world data
  calculateRealPrice(
    sizeBasePrice: number, // Real price from manufacturer data
    shapeMultiplier: number, // Area efficiency (0.785 for round/oval, 1.0 for rectangular)
    materialMultiplier: number, // Material cost difference
    qualityMultiplier: number, // Real world quality multiplier
    customSizeAdjustment?: number,
    additionalOptions?: number
  ): number {
    // 1. Start with real manufacturer base price
    let price = sizeBasePrice;
    
    // 2. Apply shape efficiency (material usage)
    price = price * shapeMultiplier;
    
    // 3. Apply material cost difference
    price = price * materialMultiplier;
    
    // 4. Apply quality multiplier (from real data)
    price = price * qualityMultiplier;
    
    // 5. Apply custom size adjustment if any
    if (customSizeAdjustment) {
      price += (price * customSizeAdjustment / 100);
    }
    
    // 6. Add additional options
    if (additionalOptions) {
      price += additionalOptions;
    }
    
    return Math.round(price * 100) / 100; // Round to 2 decimal places
  },

  // Legacy algorithm for backward compatibility
  calculatePrice(
    shapePriceRange: { min: number; max: number },
    materialMultiplier: number,
    sizeMultiplier: number,
    qualityAdjustment: number,
    customSizeAdjustment?: number,
    additionalOptions?: number
  ): number {
    const basePrice = (shapePriceRange.min + shapePriceRange.max) / 2;
    const materialPrice = basePrice * materialMultiplier;
    const sizedPrice = materialPrice * sizeMultiplier;
    const qualityPrice = sizedPrice * (1 + qualityAdjustment / 100);
    
    let finalPrice = qualityPrice;
    if (customSizeAdjustment) {
      finalPrice += (finalPrice * customSizeAdjustment / 100);
    }
    if (additionalOptions) {
      finalPrice += additionalOptions;
    }
    
    return Math.round(finalPrice * 100) / 100;
  },

  // Legacy method for backward compatibility
  calculatePriceLegacy(
    basePrice: number,
    materialMultiplier: number,
    sizeMultiplier: number,
    qualityMultiplier: number,
    customSizeAdjustment?: number,
    additionalOptions?: number
  ): number {
    let price = basePrice * materialMultiplier * sizeMultiplier * qualityMultiplier;
    
    if (customSizeAdjustment) {
      price += (price * customSizeAdjustment / 100);
    }
    
    if (additionalOptions) {
      price += additionalOptions;
    }
    
    return Math.round(price * 100) / 100;
  },

  // Get customer quotes with filtering
  async getCustomerQuotes(filters?: {
    status?: string;
    customerId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<CustomerQuote[]> {
    let filterQuery = '';
    
    if (filters) {
      const conditions = [];
      if (filters.status) conditions.push(`status == "${filters.status}"`);
      if (filters.customerId) conditions.push(`customerInfo.email == "${filters.customerId}"`);
      if (filters.dateFrom) conditions.push(`createdAt >= "${filters.dateFrom}"`);
      if (filters.dateTo) conditions.push(`createdAt <= "${filters.dateTo}"`);
      
      if (conditions.length > 0) {
        filterQuery = ' && ' + conditions.join(' && ');
      }
    }

    const query = `*[_type == "customerQuote"${filterQuery}] | order(createdAt desc) {
      _id,
      quoteNumber,
      customerInfo,
      "tableConfiguration": tableConfiguration-> {
        _id,
        name,
        "shape": shape->name,
        "material": material->name,
        "size": size->name,
        "quality": quality->name,
        calculatedPrice,
        priceOverride,
        estimatedLeadTime
      },
      quantity,
      customizations,
      pricing,
      timeline,
      status,
      notes,
      customerNotes,
      createdAt,
      updatedAt
    }`;
    
    return await sanityClient.fetch(query);
  },

  // Get single customer quote
  async getCustomerQuote(id: string): Promise<CustomerQuote | null> {
    const query = `*[_type == "customerQuote" && _id == "${id}"][0] {
      _id,
      quoteNumber,
      customerInfo,
      "tableConfiguration": tableConfiguration-> {
        _id,
        name,
        "baseProduct": baseProduct-> {
          _id,
          name,
          detailedDescription,
          careInstructions,
          specifications
        },
        "shape": shape-> {
          _id,
          name,
          slug,
          description,
          image
        },
        "material": material-> {
          _id,
          name,
          slug,
          description,
          image,
          properties
        },
        "size": size-> {
          _id,
          name,
          slug,
          dimensions,
          seatingCapacity
        },
        "quality": quality-> {
          _id,
          name,
          slug,
          grade,
          description,
          characteristics,
          exampleImages
        },
        customDimensions,
        calculatedPrice,
        priceOverride,
        additionalOptions,
        images,
        estimatedLeadTime
      },
      quantity,
      customizations,
      pricing,
      timeline,
      status,
      notes,
      customerNotes,
      createdAt,
      updatedAt
    }`;
    
    return await sanityClient.fetch(query);
  },

  // Generate quote number
  generateQuoteNumber(): string {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `Q-${year}-${timestamp}`;
  },
};