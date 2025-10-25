import { VaultItem } from '../types/vault';

export interface ExportData {
  version: string;
  timestamp: string;
  items: VaultItem[];
}

export class ImportExportService {
  async exportVault(items: VaultItem[], password: string): Promise<string> {
    const exportData: ExportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      items: items.map(item => ({
        ...item,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
    };

    return JSON.stringify(exportData, null, 2);
  }

  async importVault(data: string, password: string): Promise<VaultItem[]> {
    try {
      const importData: ExportData = JSON.parse(data);
      
      if (!importData.version || !importData.items) {
        throw new Error('Invalid vault file format');
      }

      return importData.items.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }));
    } catch (error) {
      throw new Error('Failed to import vault: Invalid format or wrong password');
    }
  }

  downloadFile(content: string, filename: string) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}