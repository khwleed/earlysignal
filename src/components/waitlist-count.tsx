import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { mockGetWaitlistCount } from '@/lib/mock-waitlist';

export function WaitlistCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const waitlistCount = await mockGetWaitlistCount();
        setCount(waitlistCount);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch waitlist count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading waitlist count...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="text-sm text-muted-foreground">
      <span className="font-medium text-blue-600">{count}</span> people on the waitlist
    </div>
  );
} 