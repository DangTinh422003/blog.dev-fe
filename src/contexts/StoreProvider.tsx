'use client';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { type Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { type AppStore, makePersistor, makeStore } from '@/stores/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = makePersistor(storeRef.current);
  }

  return persistorRef.current ? (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  ) : (
    children
  );
}
