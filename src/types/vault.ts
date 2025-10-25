export interface VaultItem {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VaultCategory {
  id: string;
  name: string;
  color?: string;
}

export interface EncryptionKeys {
  masterKey: CryptoKey;
  dataKey: CryptoKey;
}

export interface SessionState {
  isAuthenticated: boolean;
  isLocked: boolean;
  lastActivity: number;
  pinVerified: boolean;
  sessionExpiry: number;
}

export interface SecuritySettings {
  autoLockMinutes: number;
  pinAttempts: number;
  lastPinAttempt: number;
  requireOTP: boolean;
}