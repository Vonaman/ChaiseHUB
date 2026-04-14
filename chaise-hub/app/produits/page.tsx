export const dynamic = 'force-dynamic';

import { getAllChairs } from '../services/chairService';
import {ListChairs} from './listChairs';

export default async function ProduitsPage() {
  const chairs = await getAllChairs();
  return <ListChairs chairs={chairs} />;
}