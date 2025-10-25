import { useEffect } from 'react';
import { useVault } from '../contexts/VaultContext';
import { VaultItem } from '../types/vault';

const DEMO_ITEMS: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "Gmail Account",
    username: "user@gmail.com",
    password: "securePassword123!",
    url: "https://mail.google.com",
    notes: "Personal email account",
    category: "Personal",
    tags: ["email", "google"]
  },
  {
    title: "Work SSH Server",
    username: "admin",
    password: "serverPass!456",
    url: "",
    notes: "Production server access",
    category: "Work",
    tags: ["ssh", "server", "infrastructure"]
  },
  {
    title: "Banking Portal",
    username: "john.doe",
    password: "bankingPass789$",
    url: "https://mybank.com",
    notes: "Primary checking account",
    category: "Finance",
    tags: ["banking", "finance"]
  },
  {
    title: "Netflix Subscription",
    username: "john.streamer@email.com",
    password: "netflixPass!2024",
    url: "https://netflix.com",
    notes: "Family plan subscription",
    category: "Entertainment",
    tags: ["streaming", "entertainment"]
  },
  {
    title: "GitHub Account",
    username: "developer-john",
    password: "githubSecure!123",
    url: "https://github.com",
    notes: "Work and personal projects",
    category: "Work",
    tags: ["code", "repository", "version-control"]
  }
];

export const useDemoData = () => {
  const { items, addItem } = useVault();

  useEffect(() => {
    // Only add demo data in development mode when no items exist
    if (process.env.NODE_ENV === 'development' && items.length === 0) {
      const hasDemoData = localStorage.getItem('demo-data-loaded');
      
      if (!hasDemoData) {
        console.log('🚀 Loading demo data for development...');
        
        // Add demo items with a slight delay to avoid UI conflicts
        const addDemoItems = async () => {
          for (const item of DEMO_ITEMS) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
            addItem(item);
          }
          localStorage.setItem('demo-data-loaded', 'true');
          console.log('✅ Demo data loaded successfully!');
        };

        addDemoItems();
      }
    }
  }, [items.length, addItem]);

  // Function to reset demo data (useful for testing)
  const resetDemoData = () => {
    localStorage.removeItem('demo-data-loaded');
    console.log('Demo data reset. Refresh the page to reload demo items.');
  };

  return { resetDemoData };
};