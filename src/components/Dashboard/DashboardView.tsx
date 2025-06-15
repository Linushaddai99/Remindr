import React from 'react';
import { Shuffle, Calendar, Users, MessageCircle } from 'lucide-react';
import type { Group, Contact } from '../../types';
import { formatRelativeDate, isUpcomingBirthday, getDaysUntilBirthday } from '../../utils/dateUtils';
import { getContactInitials, generateContactAvatar } from '../../utils/contactUtils';

interface DashboardViewProps {
  groups: Group[];
  onShuffleDaily: () => void;
  dailyContacts: Contact[];
}

export function DashboardView({ groups, onShuffleDaily, dailyContacts }: DashboardViewProps) {
  const totalContacts = groups.reduce((sum, group) => sum + group.contacts.length, 0);

  const upcomingBirthdays = groups
    .flatMap(group => group.contacts)
    .filter(contact => contact.birthday && isUpcomingBirthday(contact.birthday))
    .sort((a, b) => getDaysUntilBirthday(a.birthday!) - getDaysUntilBirthday(b.birthday!));

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{totalContacts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Groups</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{groups.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Birthdays</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{upcomingBirthdays.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Reminders</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{dailyContacts.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
              <Shuffle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Reminders */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Reminders</h2>
            <button
              onClick={onShuffleDaily}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          {dailyContacts.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No daily reminders yet. Add some contacts to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dailyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${generateContactAvatar(contact.name)}`}>
                    {getContactInitials(contact.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                    <p className="text-sm text-gray-500">
                      {contact.lastContact ? `Last contact: ${formatRelativeDate(contact.lastContact)}` : 'No recent contact'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Birthdays</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingBirthdays.map((contact) => {
                const daysUntil = getDaysUntilBirthday(contact.birthday!);
                return (
                  <div key={contact.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${generateContactAvatar(contact.name)}`}>
                      {getContactInitials(contact.name)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-purple-600 font-medium">
                        {daysUntil === 0 ? 'Today!' : `In ${daysUntil} day${daysUntil === 1 ? '' : 's'}`}
                      </p>
                    </div>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}