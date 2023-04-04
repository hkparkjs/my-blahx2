import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import { AuthUserProvider } from '@/contexts/auth_user.context';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ChakraProvider>
        <AuthUserProvider>
          <Component {...pageProps} />
        </AuthUserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
