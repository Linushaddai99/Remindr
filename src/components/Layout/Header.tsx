import React from 'react';
import { Bell, Settings, Heart } from 'lucide-react';

interface HeaderProps {
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  hasNotifications: boolean;
}

export function Header({ onNotificationClick, onSettingsClick, hasNotifications }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between  mx-auto">
        <div className="flex items-center space-x-3">
          {/* <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Heart className="w-5 h-5 text-white" />
          </div> */}
          <div>
            <h1 className="text-2xl font-bold text-blue-500">Remindr</h1>
            <p className="text-sm text-gray-800 hidden sm:block">Keep your relationships strong</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={onSettingsClick}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}