import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly secretKey: string = 'votreCleSecrete';

  constructor() {}

  encrypt(value: string | object): string {
    const stringValue =
      typeof value === 'object' ? JSON.stringify(value) : value.toString();
    const encryptedValue = btoa(this.xorEncode(stringValue, this.secretKey));
    return encryptedValue;
  }

  decrypt(encryptedValue: string): string | object {
    const decryptedValue = this.xorEncode(atob(encryptedValue), this.secretKey);
    try {
      // Essayer de convertir en objet JSON
      return JSON.parse(decryptedValue);
    } catch {
      // Si ce n'est pas un JSON valide, retourner comme une chaîne
      return decryptedValue;
    }
  }

  private xorEncode(value: string, key: string): string {
    let output = '';
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      output += String.fromCharCode(charCode);
    }
    return output;
  }

  setEncryptedItem(key: string, value: string | object): void {
    const encryptedValue = this.encrypt(value);
    localStorage.setItem(key, encryptedValue);
  }
  setEncryptedItemNew(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const encryptedValue = this.encrypt(value);
        localStorage.setItem(key, encryptedValue);
        resolve(); // Resolve the promise when done
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  }

  getDecryptedItem(key: string): string | object | null {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      return this.decrypt(encryptedValue);
    }
    return null;
  }

  isUserLoggedIn(): boolean {
    return !!this.getDecryptedItem('user');
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
