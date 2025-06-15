import type { Group, Contact, Memory } from '../types';

export const initialGroups: Group[] = [
  {
    id: '1',
    name: 'Family',
    color: 'bg-red-500',
    icon: 'Heart',
    contacts: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Friends',
    color: 'bg-blue-500',
    icon: 'Users',
    contacts: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Work',
    color: 'bg-green-500',
    icon: 'Briefcase',
    contacts: [],
    createdAt: new Date().toISOString(),
  },
];

export const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    birthday: '1990-05-15',
    groupId: '1',
    socialMedia: {
      instagram: 'sarah_johnson',
      facebook: 'sarah.johnson.90',
    },
    notes: 'Loves hiking and photography',
    lastContact: '2024-01-10',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '(555) 987-6543',
    birthday: '1988-09-22',
    groupId: '2',
    socialMedia: {
      linkedin: 'mike-chen-dev',
      twitter: 'mikechendev',
    },
    notes: 'Software developer, coffee enthusiast',
    lastContact: '2024-01-05',
    createdAt: new Date().toISOString(),
  },
];

export const sampleMemories: Memory[] = [
  {
    id: '1',
    contactId: '1',
    title: 'Coffee catch-up',
    description: 'Had a great coffee chat about her new job',
    date: '2024-01-10',
    type: 'meeting',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    contactId: '2',
    title: 'Birthday celebration',
    description: 'Celebrated Mike\'s birthday at the new restaurant downtown',
    date: '2023-09-22',
    type: 'birthday',
    createdAt: new Date().toISOString(),
  },
];