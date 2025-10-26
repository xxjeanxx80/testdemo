import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

type MutationOptions<TData, TError, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

type MutationState<TError> = {
  isPending: boolean;
  error: TError | null;
};

class QueryClient {}

const QueryClientContext = createContext<QueryClient | null>(null);

export { QueryClient };

export function QueryClientProvider({ client, children }: { client: QueryClient; children: ReactNode }) {
  const memoisedClient = useMemo(() => client, [client]);
  return <QueryClientContext.Provider value={memoisedClient}>{children}</QueryClientContext.Provider>;
}

export function useMutation<TData = unknown, TError = Error, TVariables = void>(
  options: MutationOptions<TData, TError, TVariables>,
) {
  useContext(QueryClientContext);
  const [state, setState] = useState<MutationState<TError>>({ isPending: false, error: null });
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState({ isPending: true, error: null });
      try {
        const data = await optionsRef.current.mutationFn(variables);
        optionsRef.current.onSuccess?.(data);
        setState({ isPending: false, error: null });
        return data;
      } catch (error) {
        optionsRef.current.onError?.(error as TError);
        setState({ isPending: false, error: error as TError });
        throw error;
      }
    },
    [],
  );

  return {
    mutate,
    isPending: state.isPending,
    error: state.error,
  } as const;
}
