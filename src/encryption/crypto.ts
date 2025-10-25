export class EncryptionService {
  private async deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encryptData(data: string, key: CryptoKey): Promise<string> {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encodedData
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(Array.from(combined).map(byte => String.fromCharCode(byte)).join(''));
  }

  async decryptData(encryptedData: string, key: CryptoKey): Promise<string> {
    const binaryString = atob(encryptedData);
    const combined = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      combined[i] = binaryString.charCodeAt(i);
    }
    
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );

    return new TextDecoder().decode(decrypted);
  }
}