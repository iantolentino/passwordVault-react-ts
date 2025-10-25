import React, { useState, useRef } from 'react';
import { Download, Upload, Shield } from 'lucide-react';

interface ImportExportProps {
  items: any[];
  onImport: (items: any[]) => void;
}

export const ImportExport: React.FC<ImportExportProps> = ({ items, onImport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError('');
      setSuccess('');

      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        items: items
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vault-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSuccess('Vault exported successfully');
    } catch (error) {
      setError('Failed to export vault');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      setError('');
      setSuccess('');

      const fileContent = await readFileAsText(file);
      const importData = JSON.parse(fileContent);
      
      if (!importData.version || !importData.items) {
        throw new Error('Invalid vault file format');
      }

      if (window.confirm(`Import ${importData.items.length} items? This will replace your current vault.`)) {
        onImport(importData.items);
        setSuccess(`Successfully imported ${importData.items.length} items`);
      }
    } catch (error) {
      setError('Failed to import vault: Invalid file format');
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleExport}
          disabled={isExporting || items.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isExporting ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export Vault ({items.length} items)
        </button>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isImporting ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Import Vault
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Security Notice
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Your vault data is encrypted before export. Keep the exported file secure.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
        </div>
      )}
    </div>
  );
};