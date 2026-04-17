/**
 * Extracts initials from a full name.
 *
 * This function returns a string composed of the first letter of each name part.
 *
 * @param name - The full name of the user.
 * @returns A string containing the uppercase initials.
 *
 * @example
 * getInitials("Fábio Rodrigues") // "FR"
 */
export const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
