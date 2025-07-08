import {QueryCache} from "@tanstack/query-core";
import {QueryClient} from '@tanstack/react-query'

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache()
});

export function useQueryClient() {
  return queryClient;
}