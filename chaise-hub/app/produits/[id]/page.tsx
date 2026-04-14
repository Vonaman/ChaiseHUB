export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getChairById, getAllChairs } from '../../services/chairService';
import ProductClient from './productClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    notFound();
  }

  const [product, allChairs] = await Promise.all([
    getChairById(parsedId),
    getAllChairs()
  ]);
  return <ProductClient product={product} allChairs={allChairs} />;
}

