const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCart(token: string) {
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erreur lors de la récupération du panier');
  return res.json();
}

export async function addToCart(token: string, chaiseId: number, quantity = 1) {
  const res = await fetch(`${API_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ chaiseId, quantity }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout au panier");
  return res.json();
}

export async function updateCartItemQuantity(token: string, itemId: string, quantity: number) {
  const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour du panier');
  return res.json();
}

export async function removeFromCart(token: string, itemId: string) {
  const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}