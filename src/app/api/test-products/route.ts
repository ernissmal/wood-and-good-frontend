import { NextRequest, NextResponse } from 'next/server';
import { sanityApi } from '../../../lib/sanity';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const products = await sanityApi.getAllProducts();
    return NextResponse.json({ 
      success: true, 
      products,
      count: Array.isArray(products) ? products.length : 0
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}