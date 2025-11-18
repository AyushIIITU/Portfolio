"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function ChatbotWrapper({ children }: { children: (chatOpen: boolean) => React.ReactNode }) {
  const searchParams = useSearchParams();
  const [chatOpen, setChatOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if URL parameter is set
    const openParam = searchParams.get('open');
    if (openParam !== null) {
      setChatOpen(openParam === 'true');
    } else {
      // Default behavior: close on mobile, open on desktop
      const isMobile = window.innerWidth < 640;
      setChatOpen(!isMobile);
    }
  }, [searchParams]);

  // Don't render children until client-side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return children(chatOpen);
}

export default ChatbotWrapper;
