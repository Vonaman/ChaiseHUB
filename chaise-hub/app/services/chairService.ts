const API_URL = process.env.NEXT_PUBLIC_API_URL;
export type { Chair } from './types';

export async function getAllChairs() {
  const res = await fetch(`${API_URL}/chairs`);
  if (!res.ok) throw new Error('Erreur lors de la récupération des chaises');
  return res.json();
}

export async function getChairById(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`ID de chaise invalide: ${id}`);
  }

  const res = await fetch(`${API_URL}/chairs/${id}`);
  console.log(`Fetching chair with ID: ${id}, URL: ${API_URL}/chairs/${id}, Response status: ${res.status}`);
  if (!res.ok) throw new Error('Chaise non trouvée');
  return res.json();
}
