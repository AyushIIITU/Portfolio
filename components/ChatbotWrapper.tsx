"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function ChatbotWrapper({ children }: { children: (chatOpen: boolean) => React.ReactNode }) {
  const searchParams = useSearchParams();
  const [chatOpen, setChatOpen] = useState(true);
  useEffect(() => {
    const openParam = searchParams.get('open');
    if (openParam !== null) {
      setChatOpen(openParam === 'true');
    }
  }, [searchParams]);

  return children(chatOpen);
}

export default ChatbotWrapper;
