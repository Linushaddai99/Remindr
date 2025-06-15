import React from "react";
import { Home, Users, MessageCircle, Calendar, User } from "lucide-react";
import type { ViewType } from "../../types/index.ts";

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const navigationItems = [
  { id: "dashboard" as ViewType, label: "Dashboard", icon: Home },
  { id: "groups" as ViewType, label: "Groups", icon: Users },
  { id: "contacts" as ViewType, label: "Contacts", icon: MessageCircle },
  { id: "memories" as ViewType, label: "Memories", icon: Calendar },
  { id: "settings" as ViewType, label: "Settings", icon: User },
];

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen hidden lg:block">
      <div className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-500 "
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
