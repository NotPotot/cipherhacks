'use client';

import { MirageProvider } from 'mirage-shield/react';
import { ShieldStatus } from './ShieldStatus';
import type { ReactNode } from 'react';

export function ShieldWrapper({ children }: { children: ReactNode }) {
  return (
    <MirageProvider
      reportEndpoint="/api/mirage/report"
      protectSelectors={['[data-sensitive]', '#card-number', '#card-cvv', '#card-expiry']}
      honeypotFields={true}
      behaviorTracking={true}
    >
      {children}
      <ShieldStatus />
    </MirageProvider>
  );
}
