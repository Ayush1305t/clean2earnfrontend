/**
 * Generates an avatar URL based on the user's name and a simple heuristic for gender.
 * @param {string} name - The name of the user.
 * @returns {string} - The URL of the avatar image.
 */
export const getAvatarUrl = (name) => {
  if (!name) return `https://api.dicebear.com/7.x/identicon/svg?seed=guest&backgroundColor=e6f6ee`;
  
  // Split name to check first name only for gender heuristic
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0].toLowerCase();
  
  // Common girl/female name endings and specific common names
  const femaleEndings = ['a', 'i', 'ee', 'shree', 'shri', 'ita', 'iya', 'ini', 'ani', 'ika', 'ly', 'ia', 'ette', 'elle', 'shreya', 'shriya'];
  const femaleNames = ['bhumika', 'ananya', 'priya', 'pooja', 'sneha', 'neha', 'riya', 'diya', 'ishita', 'megha', 'shreya', 'tanya', 'sara'];
  
  // Common boy/male name endings and specific common names
  const maleEndings = ['u', 'sh', 'ar', 'an', 'er', 'el', 'on', 'ik', 'it', 'ad', 'as', 'av', 'am', 'ur', 'ey', 'h'];
  const maleNames = ['ayush', 'rahul', 'amit', 'sumit', 'vivek', 'rohit', 'neeraj', 'deepak', 'aman', 'aditya', 'vaibhav', 'saurabh', 'john', 'mike', 'alex'];

  const isFemale = femaleNames.includes(firstName) || femaleEndings.some(e => firstName.endsWith(e));
  const isMale = !isFemale && (maleNames.includes(firstName) || maleEndings.some(e => firstName.endsWith(e)));

  const baseSeed = encodeURIComponent(name);

  if (isFemale) {
    // Force feminine hair styles (curvy, bob, frizzle are typical for avataaars)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${baseSeed}&top=curvy,frizzle,shaggy,bob&facialHairProbability=0&backgroundColor=b6e3f4`;
  } else if (isMale) {
    // Force typical masculine hair styles
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${baseSeed}&top=shortFlat,shortRound,shortWaved,theCaesar&facialHairProbability=10&backgroundColor=d1d5db`;
  } else {
    // Neutral/Difficult: Bot style
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${baseSeed}&backgroundColor=e2e8f0`;
  }
};
