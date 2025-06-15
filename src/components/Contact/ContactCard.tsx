import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Phone, Mail, Calendar, Instagram, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import type { Contact, Group } from '../../types';
import { getContactInitials, generateContactAvatar, formatPhoneNumber, getSocialMediaUrl } from '../../utils/contactUtils';
import { formatRelativeDate, getDaysUntilBirthday } from '../../utils/dateUtils';

interface ContactCardProps {
  contact: Contact;
  group?: Group;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
};

export function ContactCard({ contact, group, onEdit, onDelete }: ContactCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const socialMediaEntries = Object.entries(contact.socialMedia).filter(([_, value]) => value);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${generateContactAvatar(contact.name)}`}>
              {getContactInitials(contact.name)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              {group && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${group.color}`}>
                  {group.name}
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    onEdit(contact);
                    setShowDropdown(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(contact.id);
                    setShowDropdown(false);
                  }}
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
          {contact.email && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{formatPhoneNumber(contact.phone)}</span>
            </div>
          )}
          {contact.birthday && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                Birthday in {getDaysUntilBirthday(contact.birthday)} days
              </span>
            </div>
          )}
        </div>

        {socialMediaEntries.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              {socialMediaEntries.map(([platform, username]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <a
                    key={platform}
                    href={getSocialMediaUrl(platform, username)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {contact.lastContact && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last contact: {formatRelativeDate(contact.lastContact)}
            </p>
          </div>
        )}

        {contact.notes && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 line-clamp-2">{contact.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}