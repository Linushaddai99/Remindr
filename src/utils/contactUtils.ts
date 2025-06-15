import type { Contact, Group } from '../types';

export function getRandomContactFromGroup(group: Group): Contact | null {
  if (group.contacts.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * group.contacts.length);
  return group?.contacts[randomIndex];
}

export function getContactInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateContactAvatar(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-teal-500',
  ];
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function getSocialMediaUrl(platform: string, username: string): string {
  const baseUrls: { [key: string]: string } = {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    whatsapp: 'https://wa.me/',
  };

  return baseUrls[platform] ? baseUrls[platform] + username : '#';
}