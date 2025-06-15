import React, { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { Navigation } from '../components/Layout/Navigation';
import { MobileNavigation } from '../components/Layout/MobileNav';
import { DashboardView } from '../components/Dashboard/DashboardView';
import { GroupsView } from '../components/Groups/GroupsView';
import { ContactsView } from '../components/Contact/ContactsView';
import { MemoriesView } from '../components/Memories/MemoriesView';
import { SettingsView } from '../components/Settings/SettingsView';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotifications } from '../hooks/useNotifications';
import type { Group, Contact, Memory, ViewType } from '../types';
import { initialGroups, sampleContacts, sampleMemories } from '../data/mockData';
import { isUpcomingBirthday } from '../utils/dateUtils';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [groups, setGroups] = useLocalStorage<Group[]>('stayconnected-groups', initialGroups);
  const [contacts, setContacts] = useLocalStorage<Contact[]>('stayconnected-contacts', sampleContacts);
  const [memories, setMemories] = useLocalStorage<Memory[]>('stayconnected-memories', sampleMemories);
  const [dailyContacts, setDailyContacts] = useLocalStorage<Contact[]>('stayconnected-daily', []);

  const { showNotification } = useNotifications();

  // Initialize daily contacts on first load
  useEffect(() => {
    if (dailyContacts.length === 0 && contacts.length > 0) {
      shuffleDailyContacts();
    }
  }, [contacts, dailyContacts.length]);

  // Check for upcoming birthdays and show notifications
  useEffect(() => {
    const checkBirthdays = () => {
      const upcomingBirthdays = contacts.filter(contact => 
        contact.birthday && isUpcomingBirthday(contact.birthday)
      );
      
      upcomingBirthdays.forEach(contact => {
        showNotification(
          `🎂 ${contact.name}'s birthday is coming up!`,
          {
            body: 'Don\'t forget to reach out and wish them well.',
            icon: '/favicon.ico',
          }
        );
      });
    };

    // Check birthdays on app load and then daily
    checkBirthdays();
    const interval = setInterval(checkBirthdays, 24 * 60 * 60 * 1000); // Daily

    return () => clearInterval(interval);
  }, [contacts, showNotification]);

  const shuffleDailyContacts = () => {
    const groupedContacts = groups.reduce((acc, group) => {
      if (group.contacts.length > 0) {
        const randomContact = group.contacts[Math.floor(Math.random() * group.contacts.length)];
        acc.push(randomContact);
      }
      return acc;
    }, [] as Contact[]);
    
    setDailyContacts(groupedContacts);
    
    if (groupedContacts.length > 0) {
      showNotification(
        '📱 New daily reminders ready!',
        {
          body: `You have ${groupedContacts.length} people to reach out to today.`,
          icon: '/favicon.ico',
        }
      );
    }
  };

  // Group management
  const handleCreateGroup = (groupData: Omit<Group, 'id' | 'createdAt'>) => {
    const newGroup: Group = {
      ...groupData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setGroups([...groups, newGroup]);
  };

  const handleUpdateGroup = (id: string, groupData: Partial<Group>) => {
    setGroups(groups.map(group => 
      group.id === id ? { ...group, ...groupData } : group
    ));
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id));
    setContacts(contacts.filter(contact => contact.groupId !== id));
    setMemories(memories.filter(memory => {
      const contact = contacts.find(c => c.id === memory.contactId);
      return contact?.groupId !== id;
    }));
  };

  // Contact management
  const handleCreateContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setContacts([...contacts, newContact]);
    
    // Update the group's contacts array
    setGroups(groups.map(group => 
      group.id === contactData.groupId 
        ? { ...group, contacts: [...group.contacts, newContact] }
        : group
    ));
  };

  const handleUpdateContact = (id: string, contactData: Partial<Contact>) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === id ? { ...contact, ...contactData } : contact
    );
    setContacts(updatedContacts);
    
    // Update groups
    setGroups(groups.map(group => ({
      ...group,
      contacts: group.contacts.map(contact => 
        contact.id === id ? { ...contact, ...contactData } : contact
      )
    })));
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setMemories(memories.filter(memory => memory.contactId !== id));
    setDailyContacts(dailyContacts.filter(contact => contact.id !== id));
    
    // Update groups
    setGroups(groups.map(group => ({
      ...group,
      contacts: group.contacts.filter(contact => contact.id !== id)
    })));
  };

  // Memory management
  const handleCreateMemory = (memoryData: Omit<Memory, 'id' | 'createdAt'>) => {
    const newMemory: Memory = {
      ...memoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMemories([...memories, newMemory]);
    
    // Update last contact date
    handleUpdateContact(memoryData.contactId, { lastContact: memoryData.date });
  };

  const handleUpdateMemory = (id: string, memoryData: Partial<Memory>) => {
    setMemories(memories.map(memory => 
      memory.id === id ? { ...memory, ...memoryData } : memory
    ));
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter(memory => memory.id !== id));
  };

  // Data management
  const handleExportData = () => {
    const data = { groups, contacts, memories };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stayconnected-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.groups) setGroups(data.groups);
        if (data.contacts) setContacts(data.contacts);
        if (data.memories) setMemories(data.memories);
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    setGroups(initialGroups);
    setContacts([]);
    setMemories([]);
    setDailyContacts([]);
  };

  const hasNotifications = contacts.some(contact => 
    contact.birthday && isUpcomingBirthday(contact.birthday)
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            groups={groups}
            dailyContacts={dailyContacts}
            onShuffleDaily={shuffleDailyContacts}
          />
        );
      case 'groups':
        return (
          <GroupsView
            groups={groups}
            onCreateGroup={handleCreateGroup}
            onUpdateGroup={handleUpdateGroup}
            onDeleteGroup={handleDeleteGroup}
            onViewGroup={(groupId) => setCurrentView('contacts')}
          />
        );
      case 'contacts':
        return (
          <ContactsView
            contacts={contacts}
            groups={groups}
            onCreateContact={handleCreateContact}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />
        );
      case 'memories':
        return (
          <MemoriesView
            memories={memories}
            contacts={contacts}
            onCreateMemory={handleCreateMemory}
            onUpdateMemory={handleUpdateMemory}
            onDeleteMemory={handleDeleteMemory}
          />
        );
      case 'settings':
        return (
          <SettingsView
            onExportData={handleExportData}
            onImportData={handleImportData}
            onClearData={handleClearData}
          />
        );
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNotificationClick={() => setCurrentView('dashboard')}
        onSettingsClick={() => setCurrentView('settings')}
        hasNotifications={hasNotifications}
      />
      
      <div className="flex">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
          {renderCurrentView()}
        </main>
      </div>
      
      <MobileNavigation currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}

export default App;