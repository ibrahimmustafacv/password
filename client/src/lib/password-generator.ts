type StrengthLevel = 'easy' | 'medium' | 'strong' | 'random';

export function generatePassword(strength: StrengthLevel, answers: string[]): string {
  switch (strength) {
    case 'easy':
      return generateEasyPassword(answers);
    case 'medium':
      return generateMediumPassword(answers);
    case 'strong':
      return generateStrongPassword(answers);
    default:
      return generateRandomPassword();
  }
}

function generateEasyPassword(answers: string[]): string {
  if (answers.length < 3) return '';
  
  const birth = answers[0]?.slice(0, 2) || '';
  const phone = answers[1]?.slice(-4) || '';
  const memory = answers[2]?.slice(0, 4) || '';
  
  return birth + phone + memory;
}

function generateMediumPassword(answers: string[]): string {
  if (answers.length < 2) return '';
  
  const name = answers[0] || '';
  const number = answers[1] || '';
  const currentYear = new Date().getFullYear().toString().slice(-2);
  
  return name + number + '@' + currentYear;
}

function generateStrongPassword(answers: string[]): string {
  if (answers.length < 6) return '';
  
  const [engName, specialNum, initials, char1, digits, char2] = answers;
  
  return `${engName}.${specialNum}${initials}*#${char1.toUpperCase()}${char1.toLowerCase()}${digits}${char2.toUpperCase()}${char2.toLowerCase()}@2024`;
}

export function generateRandomPassword(): string {
  // Ensure at least one of each type
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const allChars = lowercase + uppercase + numbers + symbols;
  
  let password = '';
  
  // Add at least one of each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = 4; i < 16; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function calculatePasswordStrength(password: string): number {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;
  
  return Math.min(score, 100);
}
