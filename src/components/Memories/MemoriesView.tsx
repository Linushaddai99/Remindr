import React, { useState } from 'react';
import { Plus, Calendar, MessageCircle, Phone, Heart, Star } from 'lucide-react';
import type { Memory, Contact } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { getContactInitials, generateContactAvatar } from '../../utils/contactUtils';
import { MemoryForm } from './MemoryForm';

interface MemoriesViewProps {
  memories: Memory[];
  contacts: Contact[];
  onCreateMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => void;
  onUpdateMemory: (id: string, memory: Partial<Memory>) => void;
  onDeleteMemory: (id: string) => void;
}

const memoryTypeIcons = {
  call: Phone,
  message: MessageCircle,
  meeting: Calendar,
  birthday: Heart,
  other: Star,
};

const memoryTypeColors = {
  call: 'bg-green-100 text-green-700',
  message: 'bg-blue-100 text-blue-700',
  meeting: 'bg-purple-100 text-purple-700',
  birthday: 'bg-pink-100 text-pink-700',
  other: 'bg-gray-100 text-gray-700',
};

export function MemoriesView({ memories, contacts, onCreateMemory, onUpdateMemory, onDeleteMemory }: MemoriesViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);

  const handleSubmit = (memoryData: Omit<Memory, 'id' | 'createdAt'>) => {
    if (editingMemory) {
      onUpdateMemory(editingMemory.id, memoryData);
      setEditingMemory(null);
    } else {
      onCreateMemory(memoryData);
    }
    setShowForm(false);
  };

  const sortedMemories = [...memories].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Memories</h1>
          <p className="text-gray-600 mt-1">Keep track of your interactions and special moments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Memory</span>
        </button>
      </div>

      {sortedMemories.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No memories yet</h3>
          <p className="text-gray-500 mb-6">Start documenting your interactions and special moments</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Memory</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedMemories.map((memory) => {
            const contact = contacts.find(c => c.id === memory.contactId);
            const Icon = memoryTypeIcons[memory.type];
            
            return (
              <div key={memory.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {contact && (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${generateContactAvatar(contact.name)}`}>
                        {getContactInitials(contact.name)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{memory.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${memoryTypeColors[memory.type]}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {memory.type.charAt(0).toUpperCase() + memory.type.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{memory.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {contact && <span>{contact.name}</span>}
                        <span>{formatDate(memory.date)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingMemory(memory);
                            setShowForm(true);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this memory?')) {
                              onDeleteMemory(memory.id);
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <MemoryForm
          memory={editingMemory}
          contacts={contacts}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingMemory(null);
          }}
        />
      )}
    </div>
  );
}