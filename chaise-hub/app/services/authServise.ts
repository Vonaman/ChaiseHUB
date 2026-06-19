const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include', // <- essentiel
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Identifiants invalides');
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erreur lors de la déconnexion');
  return res.json();
}