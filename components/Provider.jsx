"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Provider({ children, session }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>{children}</SessionProvider>;
    </QueryClientProvider>
  );
}
