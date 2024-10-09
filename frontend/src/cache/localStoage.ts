class LocalStorageManager {
  setItem(key: string, value: object, ttl: number) {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl, // Current time + TTL (in milliseconds)
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem<T>(key: string): T | null {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}

export const cache = new LocalStorageManager();
