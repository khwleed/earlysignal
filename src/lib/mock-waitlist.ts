// This is a mock implementation for development purposes
// It simulates the waitlist functionality without requiring actual API keys

interface WaitlistResponse {
  success: boolean;
  message?: string;
  count?: number;
}

// Simulated delay for mock API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data store
let waitlistCount = 0;
const joinedEmails = new Set<string>();

// Mock join waitlist function
export async function mockJoinWaitlist(email: string): Promise<void> {
  await delay(1000); // Simulate network delay

  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }

  if (joinedEmails.has(email)) {
    throw new Error('This email is already on the waitlist');
  }

  joinedEmails.add(email);
  waitlistCount++;
}

// Mock get waitlist count function
export async function mockGetWaitlistCount(): Promise<number> {
  await delay(1000); // Simulate network delay
  return waitlistCount;
} 