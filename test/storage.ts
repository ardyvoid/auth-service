const testStore: { [key: string]: any; } = {};

export const testStorage = {
  setItem: (key: string, value: string): void => {
    testStore[key] = value;
  },

  getItem: (key: string): string|null => {
    return (typeof testStore[key] !== 'undefined')
      ? testStore[key]
      : null;
  },

  removeItem: (key: string): void => {
    if (typeof testStore[key] !== 'undefined') {
      delete testStore[key];
    }
  }
};
