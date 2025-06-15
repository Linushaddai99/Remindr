export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  birthday?: string;
  avatar?: string;
  socialMedia: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  notes?: string;
  groupId: string;
  lastContact?: string;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  icon: string;
  contacts: Contact[];
  createdAt: string;
}

export interface Memory {
  id: string;
  contactId: string;
  title: string;
  description: string;
  date: string;
  type: 'call' | 'message' | 'meeting' | 'birthday' | 'other';
  createdAt: string;
}

export interface DailyReminder {
  id: string;
  contactId: string;
  date: string;
  completed: boolean;
  shuffled: boolean;
}

export type ViewType = 'dashboard' | 'groups' | 'contacts' | 'memories' | 'settings';