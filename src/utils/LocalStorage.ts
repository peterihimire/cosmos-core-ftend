export const saveToLocalStorage = (key: any, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: any) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeFromLocalStorage = (key: any) => {
  localStorage.removeItem(key);
};
