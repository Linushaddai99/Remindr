import React from "react";
import { Home, Users, MessageCircle, Calendar, User } from "lucide-react";
import type { ViewType } from "../../types/index";

interface MobileNavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const navigationItems = [
  { id: "dashboard" as ViewType, label: "Home", icon: Home },
  { id: "groups" as ViewType, label: "Groups", icon: Users },
  { id: "contacts" as ViewType, label: "Contacts", icon: MessageCircle },
  { id: "memories" as ViewType, label: "Memories", icon: Calendar },
  { id: "settings" as ViewType, label: "Settings", icon: User },
];

export function MobileNavigation({
  currentView,
  onViewChange,
}: MobileNavigationProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
