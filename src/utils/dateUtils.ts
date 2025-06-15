export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function isUpcomingBirthday(birthday: string): boolean {
  const today = new Date();
  const birthDate = new Date(birthday);
  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  if (thisYearBirthday < today) {
    thisYearBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  const diffInDays = Math.floor((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays <= 7;
}

export function getDaysUntilBirthday(birthday: string): number {
  const today = new Date();
  const birthDate = new Date(birthday);
  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  if (thisYearBirthday < today) {
    thisYearBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  return Math.floor((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}