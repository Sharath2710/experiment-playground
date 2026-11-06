/**
 * Format date to a human-readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string | number): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Calculate the time ago from a given date
 * @param date - The date to calculate time ago from
 * @param now - Optional current date for deterministic testing
 * @returns Time ago string (e.g., "2 days ago")
 */
export const timeAgo = (date: Date | string | number, now?: Date): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  // Use the provided date or current time
  const currentTime = now || new Date();
  
  // For SSR, use a fixed date to ensure deterministic output
  if (typeof window === 'undefined') {
    // Use a fixed date for SSR to ensure consistent output
    const fixedNow = new Date('2024-11-01T00:00:00Z');
    const diffMs = fixedNow.getTime() - dateObj.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
  
  // For client-side rendering, use the actual current time
  const diffMs = currentTime.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  return 'Just now';
};

/**
 * Get the updated date string
 * @param date - The date to format
 * @param now - Optional current date for deterministic testing
 * @returns Formatted date string
 */
export const getUpdatedDate = (date: Date | string | number, now?: Date): string => {
  const formattedDate = formatDate(date);
  const timeAgoStr = timeAgo(date, now);
  return `${formattedDate} (${timeAgoStr})`;
};
