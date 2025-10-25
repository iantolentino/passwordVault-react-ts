import React, { createContext, useContext, useState, useCallback } from 'react';

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

interface VaultContextType {
  items: VaultItem[];
  addItem: (item: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<VaultItem>) => void;
  deleteItem: (id: string) => void;
  searchItems: (query: string) => VaultItem[];
  getItemsByCategory: (category: string) => VaultItem[];
}

const VaultContext = createContext<VaultContextType | null>(null);

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<VaultItem[]>([]);

  const addItem = useCallback((itemData: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: VaultItem = {
      ...itemData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<VaultItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const searchItems = useCallback((query: string) => {
    if (!query.trim()) return items;
    
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.username.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [items]);

  const getItemsByCategory = useCallback((category: string) => {
    return items.filter(item => item.category === category);
  }, [items]);

  return (
    <VaultContext.Provider value={{
      items,
      addItem,
      updateItem,
      deleteItem,
      searchItems,
      getItemsByCategory
    }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};