const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Account {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginPayload {
  email: string;
  passwordHash: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  passwordHash: string;
}

// Login user
export async function loginAccount(payload: LoginPayload): Promise<Account> {
  const res = await fetch(`${API_URL}/accounts/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Erreur lors de la connexion');
  return res.json();
}

// Register new user
export async function registerAccount(payload: RegisterPayload): Promise<Account> {
  const res = await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Erreur lors de l\'inscription');
  return res.json();
}

// Get account by ID
export async function getAccountById(id: number): Promise<Account> {
  const res = await fetch(`${API_URL}/accounts/${id}`);
  if (!res.ok) throw new Error('Compte non trouvé');
  return res.json();
}
