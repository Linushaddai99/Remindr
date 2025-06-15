import React, { useState } from 'react';
import { Plus, Users, MoreVertical, Edit, Trash2 } from 'lucide-react';
import type { Group } from '../../types';
import { GroupForm } from './GroupForm';

interface GroupsViewProps {
  groups: Group[];
  onCreateGroup: (group: Omit<Group, 'id' | 'createdAt'>) => void;
  onUpdateGroup: (id: string, group: Partial<Group>) => void;
  onDeleteGroup: (id: string) => void;
  onViewGroup: (groupId: string) => void;
}

export function GroupsView({ groups, onCreateGroup, onUpdateGroup, onDeleteGroup, onViewGroup }: GroupsViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSubmit = (groupData: Omit<Group, 'id' | 'createdAt'>) => {
    if (editingGroup) {
      onUpdateGroup(editingGroup.id, groupData);
      setEditingGroup(null);
    } else {
      onCreateGroup(groupData);
    }
    setShowForm(false);
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setShowForm(true);
    setActiveDropdown(null);
  };

  const handleDelete = (groupId: string) => {
    if (window.confirm('Are you sure you want to delete this group? All contacts in this group will also be deleted.')) {
      onDeleteGroup(groupId);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <p className="text-gray-600 mt-1">Organize your contacts into meaningful groups</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Group</span>
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No groups yet</h3>
          <p className="text-gray-500 mb-6">Create your first group to start organizing your contacts</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Group</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-sm shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${group.color} rounded-lg flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.contacts.length} contacts</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === group.id ? null : group.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeDropdown === group.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button
                          onClick={() => handleEdit(group)}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(group.id)}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {group.contacts.slice(0, 3).map((contact) => (
                    <div key={contact.id} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 truncate">{contact.name}</span>
                    </div>
                  ))}
                  {group.contacts.length > 3 && (
                    <p className="text-xs text-gray-500">+{group.contacts.length - 3} more</p>
                  )}
                </div>

                <button
                  onClick={() => onViewGroup(group.id)}
                  className="w-full mt-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-sm hover:bg-gray-50 transition-colors"
                >
                  View Contacts
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <GroupForm
          group={editingGroup}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingGroup(null);
          }}
        />
      )}
    </div>
  );
}