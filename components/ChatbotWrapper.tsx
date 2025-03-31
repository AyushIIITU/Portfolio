"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function ChatbotWrapper({ children }: { children: (chatOpen: boolean) => React.ReactNode }) {
  const searchParams = useSearchParams();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    setChatOpen(searchParams.get('open') === 'true');
  }, [searchParams]);

  return children(chatOpen);
}

export default ChatbotWrapper;
