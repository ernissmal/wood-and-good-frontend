import { sanityApi } from '../../../lib/sanity';
import ProductClient from './ProductClient';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static paths for all products (required for static export)
export async function generateStaticParams() {
  try {
    const products = await sanityApi.getAllProducts();
    if (!products || !Array.isArray(products)) {
      return [];
    }
    
    return products.map((product: any) => {
      console.log('Generating static param for product:', { id: product.id, _id: product._id, product });
      return { id: product.id || product._id };
    });
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductClient productId={id} />;
}