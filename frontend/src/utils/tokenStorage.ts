const TOKEN_KEY = 'token';

export const tokenStorage = {
  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUserId(): string | null {
    const token = this.get();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId ?? null;
    } catch {
      return null;
    }
  },
};
