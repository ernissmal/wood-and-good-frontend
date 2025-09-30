import { NextResponse } from 'next/server';
import { sanityApi } from '../../../../lib/sanity';

export const dynamic = 'force-static';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await sanityApi.getProductById(id);
    return NextResponse.json({ 
      success: true, 
      product,
      id: id,
      found: !!product
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      id: id
    });
  }
}