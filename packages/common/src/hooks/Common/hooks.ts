/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ServiceResponse } from "../../models";

interface IDataLoaderState<T, E> {
  loading: boolean;
  data?: T;
  error?: E;
}

interface IUseDataLoaderParams<T, E> {
  loader: (...args: any[]) => Promise<ServiceResponse<T, E>> | undefined;
  staleWhileRevalidate?: boolean;
  deps: any[];
  debounce?: number;
  onError?: (error: E) => void;
}

export type IDataLoader<T, E> = IUseDataLoaderParams<T, E>["loader"];

export interface IServiceCallerState<T> {
  processing: boolean;
  result?: T;
}

interface IUseDebouncedEffectParams {
  effect: () => void;
  delay: number;
  deps: any[];
}

function useDebouncedEffect({
  effect,
  delay,
  deps,
}: IUseDebouncedEffectParams): boolean {
  // State and setters for debounced value
  const [debounceAwaiting, setDebounceAwaiting] = useState(false);
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      effect();
      initialized.current = true;
    } else {
      setDebounceAwaiting(true);
      const handler = setTimeout(() => {
        effect();
        setDebounceAwaiting(false);
      }, delay);
      return () => clearTimeout(handler);
    }
  }, [delay, ...deps]);
  return debounceAwaiting;
}

export interface IUseDataLoaderResult<T, E> extends IDataLoaderState<T, E> {
  debounceAwaiting: boolean;
  refresh: () => void;
}

export function useDataLoader<T, E>({
  loader,
  debounce = 0,
  onError,
  staleWhileRevalidate = true,
  deps,
}: IUseDataLoaderParams<T, E>) {
  const [state, setState] = useState<IDataLoaderState<T, E>>({
    loading: true,
  });

  const previousCallCancellation = useRef<(() => void) | null>(null);

  const load = useCallback(async () => {
    setState((oldState) => ({
      ...(staleWhileRevalidate ? oldState : {}),
      loading: true,
      error: undefined,
    }));

    const loaderPromise = loader();

    if (!loaderPromise) {
      setState((oldState) => ({ ...oldState, loading: false }));
      return;
    }

    const cancellationPromise = new Promise<null>((resolve) => {
      previousCallCancellation.current?.();
      previousCallCancellation.current = () => resolve(null);
    });

    const response = await Promise.race([loaderPromise, cancellationPromise]);
    if (!response) {
      // promise cancelled
      setState((oldState) => ({ ...oldState, loading: false }));
      return;
    }

    // clear cancellation promise to avoid infinite pending promise
    previousCallCancellation.current?.();
    previousCallCancellation.current = null;

    if (response.ok) {
      setState({
        data: response.data,
        loading: false,
      });
    } else {
      setState((oldState) => ({
        ...(staleWhileRevalidate ? oldState : {}),
        loading: false,
        error: response.error,
      }));
      onError?.(response.error);
    }
  }, [loader]);

  const debounceAwaiting = useDebouncedEffect({
    effect: load,
    delay: debounce,
    deps,
  });

  return useMemo(
    () => ({
      ...state,
      debounceAwaiting,
      refresh: load,
    }),
    [state, load]
  );
}

export function useServiceCaller<A extends any[], T>(
  func: (...args: A) => Promise<T>,
  deps: any[]
): [(...args: A) => Promise<T | void>, IServiceCallerState<T>] {
  const [state, setState] = useState<IServiceCallerState<T>>({
    processing: false,
  });

  const execute = useCallback((...args: A) => {
    setState({ processing: true });
    const funcPromise = func(...args);

    return funcPromise
      .then((result) => {
        setState({ result, processing: false });
        return result;
      })
      .catch(() => {
        setState({
          processing: false,
        });
      });
  }, deps);
  return [execute, state];
}
