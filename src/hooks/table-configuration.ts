// React hooks for table configuration system
import { useState, useEffect, useMemo } from 'react';
import { tableConfigAPI, TableShape, TableMaterial, TableSize, TableQuality, TableConfiguration, CustomerQuote } from '../lib/table-config-api';

// Hook for managing table shapes
export function useTableShapes() {
  const [shapes, setShapes] = useState<TableShape[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShapes = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getTableShapes();
      setShapes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table shapes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShapes();
  }, []);

  return { shapes, loading, error, refetch: fetchShapes };
}

// Hook for managing table materials
export function useTableMaterials() {
  const [materials, setMaterials] = useState<TableMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getTableMaterials();
      setMaterials(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table materials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Sort materials by price multiplier or name
  const sortedMaterials = useMemo(() => {
    return [...materials].sort((a, b) => {
      if (a.priceMultiplier !== b.priceMultiplier) {
        return a.priceMultiplier - b.priceMultiplier;
      }
      return a.name.localeCompare(b.name);
    });
  }, [materials]);

  return { 
    materials: sortedMaterials, 
    loading, 
    error, 
    refetch: fetchMaterials
  };
}

// Hook for managing table sizes with shape filtering
export function useTableSizes(shapeId?: string) {
  const [sizes, setSizes] = useState<TableSize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSizes = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getTableSizes(shapeId);
      setSizes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table sizes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, [shapeId]);

  // Separate standard and custom sizes
  const standardSizes = useMemo(() => 
    sizes.filter(size => size.isStandard), [sizes]
  );
  
  const customSizes = useMemo(() => 
    sizes.filter(size => !size.isStandard), [sizes]
  );

  return { 
    sizes, 
    standardSizes, 
    customSizes, 
    loading, 
    error, 
    refetch: fetchSizes
  };
}

// Hook for managing table quality grades
export function useTableQualities() {
  const [qualities, setQualities] = useState<TableQuality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQualities = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getTableQualities();
      setQualities(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table qualities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualities();
  }, []);

  // Group qualities by grade
  const qualitiesByGrade = useMemo(() => {
    return qualities.reduce((acc, quality) => {
      const grade = quality.grade.toUpperCase();
      if (!acc[grade]) acc[grade] = [];
      acc[grade].push(quality);
      return acc;
    }, {} as Record<string, TableQuality[]>);
  }, [qualities]);

  return { 
    qualities, 
    qualitiesByGrade, 
    loading, 
    error, 
    refetch: fetchQualities
  };
}

// Hook for table configuration builder
export function useTableConfigurationBuilder() {
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [customDimensions, setCustomDimensions] = useState<{
    isCustom: boolean;
    length?: number;
    width?: number;
    height?: number;
  }>({ isCustom: false });

  // Load configuration data
  const { shapes } = useTableShapes();
  const { materials } = useTableMaterials();
  const { sizes } = useTableSizes(selectedShape || undefined);
  const { qualities } = useTableQualities();

  // Get selected items
  const shape = shapes.find(s => s._id === selectedShape);
  const material = materials.find(m => m._id === selectedMaterial);
  const size = sizes.find(s => s._id === selectedSize);
  const quality = qualities.find(q => q._id === selectedQuality);

  // Calculate estimated price
  const estimatedPrice = useMemo(() => {
    if (!material || !size || !quality) return null;
    
    const basePrice = 1000; // This should come from the base product
    const customSizeAdjustment = customDimensions.isCustom ? 15 : 0;
    
    return tableConfigAPI.calculatePrice(
      basePrice,
      material.priceMultiplier,
      size.priceMultiplier,
      quality.priceMultiplier,
      customSizeAdjustment
    );
  }, [material, size, quality, customDimensions]);

  // Check if configuration is complete
  const isComplete = selectedShape && selectedMaterial && selectedSize && selectedQuality;

  // Reset configuration
  const resetConfiguration = () => {
    setSelectedShape(null);
    setSelectedMaterial(null);
    setSelectedSize(null);
    setSelectedQuality(null);
    setCustomDimensions({ isCustom: false });
  };

  // Get configuration summary
  const configurationSummary = useMemo(() => {
    if (!isComplete) return null;
    
    return {
      shape: shape?.name,
      material: material?.name,
      size: size?.name,
      quality: quality?.name,
      customDimensions: customDimensions.isCustom ? customDimensions : null,
      estimatedPrice,
    };
  }, [isComplete, shape, material, size, quality, customDimensions, estimatedPrice]);

  return {
    // Selection state
    selectedShape,
    selectedMaterial,
    selectedSize,
    selectedQuality,
    customDimensions,
    
    // Selection setters
    setSelectedShape,
    setSelectedMaterial,
    setSelectedSize,
    setSelectedQuality,
    setCustomDimensions,
    
    // Configuration data
    shapes,
    materials,
    sizes,
    qualities,
    
    // Selected items
    shape,
    material,
    size,
    quality,
    
    // Calculated values
    estimatedPrice,
    isComplete,
    configurationSummary,
    
    // Actions
    resetConfiguration,
  };
}

// Hook for managing table configurations
export function useTableConfigurations(filters?: {
  shapeId?: string;
  materialId?: string;
  sizeId?: string;
  qualityId?: string;
  available?: boolean;
}) {
  const [configurations, setConfigurations] = useState<TableConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getTableConfigurations(filters);
      setConfigurations(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table configurations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, [filters]);

  // Group configurations by different criteria
  const configurationsByShape = useMemo(() => {
    return configurations.reduce((acc, config) => {
      const shapeName = config.shape.name;
      if (!acc[shapeName]) acc[shapeName] = [];
      acc[shapeName].push(config);
      return acc;
    }, {} as Record<string, TableConfiguration[]>);
  }, [configurations]);

  const configurationsByMaterial = useMemo(() => {
    return configurations.reduce((acc, config) => {
      const materialName = config.material.name;
      if (!acc[materialName]) acc[materialName] = [];
      acc[materialName].push(config);
      return acc;
    }, {} as Record<string, TableConfiguration[]>);
  }, [configurations]);

  return {
    configurations,
    configurationsByShape,
    configurationsByMaterial,
    loading,
    error,
    refetch: fetchConfigurations,
  };
}

// Hook for managing customer quotes
export function useCustomerQuotes(filters?: {
  status?: string;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  const [quotes, setQuotes] = useState<CustomerQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getCustomerQuotes(filters);
      setQuotes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customer quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [filters]);

  // Group quotes by status
  const quotesByStatus = useMemo(() => {
    return quotes.reduce((acc, quote) => {
      const status = quote.status;
      if (!acc[status]) acc[status] = [];
      acc[status].push(quote);
      return acc;
    }, {} as Record<string, CustomerQuote[]>);
  }, [quotes]);

  // Calculate summary statistics
  const quoteSummary = useMemo(() => {
    const totalQuotes = quotes.length;
    const totalValue = quotes.reduce((sum, quote) => sum + quote.pricing.totalPrice, 0);
    const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
    const pendingQuotes = quotes.filter(q => q.status === 'sent' || q.status === 'under-review').length;
    
    return {
      totalQuotes,
      totalValue,
      acceptedQuotes,
      pendingQuotes,
      conversionRate: totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0,
    };
  }, [quotes]);

  return {
    quotes,
    quotesByStatus,
    quoteSummary,
    loading,
    error,
    refetch: fetchQuotes,
  };
}

// Hook for individual quote management
export function useCustomerQuote(quoteId: string) {
  const [quote, setQuote] = useState<CustomerQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const data = await tableConfigAPI.getCustomerQuote(quoteId);
      setQuote(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customer quote');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quoteId) {
      fetchQuote();
    }
  }, [quoteId]);

  return {
    quote,
    loading,
    error,
    refetch: fetchQuote,
  };
}