import React, { useState } from 'react';
import { Plus, Search, MessageCircle } from 'lucide-react';
import type { Contact, Group } from '../../types';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';

interface ContactsViewProps {
  contacts: Contact[];
  groups: Group[];
  onCreateContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  onUpdateContact: (id: string, contact: Partial<Contact>) => void;
  onDeleteContact: (id: string) => void;
}

export function ContactsView({ contacts, groups, onCreateContact, onUpdateContact, onDeleteContact }: ContactsViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || contact.groupId === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleSubmit = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    if (editingContact) {
      onUpdateContact(editingContact.id, contactData);
      setEditingContact(null);
    } else {
      onCreateContact(contactData);
    }
    setShowForm(false);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDeleteContact(contactId);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">{filteredContacts.length} contacts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Groups</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || selectedGroup !== 'all' ? 'No contacts found' : 'No contacts yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedGroup !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Add your first contact to get started'
            }
          </p>
          {!searchTerm && selectedGroup === 'all' && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Contact</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              group={groups.find(g => g.id === contact.groupId)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ContactForm
          contact={editingContact}
          groups={groups}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
}