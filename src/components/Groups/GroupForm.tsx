import React, { useState } from 'react';
import { X, Users, Heart, Briefcase, Star, Coffee, Gamepad2 } from 'lucide-react';
import type { Group } from '../../types';

interface GroupFormProps {
  group?: Group | null;
  onSubmit: (group: Omit<Group, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const groupColors = [
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Teal', value: 'bg-teal-500' },
];

const groupIcons = [
  { name: 'Users', icon: Users },
  { name: 'Heart', icon: Heart },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Star', icon: Star },
  { name: 'Coffee', icon: Coffee },
  { name: 'Gamepad', icon: Gamepad2 },
];

export function GroupForm({ group, onSubmit, onCancel }: GroupFormProps) {
  const [name, setName] = useState(group?.name || '');
  const [color, setColor] = useState(group?.color || 'bg-blue-500');
  const [icon, setIcon] = useState(group?.icon || 'Users');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      color,
      icon,
      contacts: group?.contacts || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {group ? 'Edit Group' : 'Create New Group'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {groupColors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() => setColor(colorOption.value)}
                  className={`w-12 h-12 rounded-lg ${colorOption.value} ${
                    color === colorOption.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-3 gap-3">
              {groupIcons.map((iconOption) => {
                const IconComponent = iconOption.icon;
                return (
                  <button
                    key={iconOption.name}
                    type="button"
                    onClick={() => setIcon(iconOption.name)}
                    className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                      icon === iconOption.name
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {group ? 'Update Group' : 'Create Group'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}