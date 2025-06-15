import React from 'react';
import { Bell, Download, Upload, Trash2, Info } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

interface SettingsViewProps {
  onExportData: () => void;
  onImportData: (file: File) => void;
  onClearData: () => void;
}

export function SettingsView({ onExportData, onImportData, onClearData }: SettingsViewProps) {
  const { permission, requestPermission, isSupported } = useNotifications();

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImportData(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onClearData();
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your app preferences and data</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          {isSupported ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Browser Notifications</p>
                  <p className="text-sm text-gray-500">Get notified about birthdays and reminders</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    permission === 'granted' 
                      ? 'bg-green-100 text-green-700' 
                      : permission === 'denied'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {permission === 'granted' ? 'Enabled' : permission === 'denied' ? 'Blocked' : 'Not Set'}
                  </span>
                  {permission !== 'granted' && (
                    <button
                      onClick={requestPermission}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Enable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg">
              <Info className="w-4 h-4" />
              <span className="text-sm">Notifications are not supported in your browser</span>
            </div>
          )}
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Download className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Export Data</p>
                <p className="text-sm text-gray-500">Download your contacts, groups, and memories</p>
              </div>
              <button
                onClick={onExportData}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Import Data</p>
                <p className="text-sm text-gray-500">Upload a previously exported data file</p>
              </div>
              <button
                onClick={handleImportClick}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-600">Clear All Data</p>
                  <p className="text-sm text-gray-500">Permanently delete all your data</p>
                </div>
                <button
                  onClick={handleClearData}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>StayConnected</strong> - Keep your relationships strong</p>
            <p>Version 1.0.0</p>
            <p>Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}