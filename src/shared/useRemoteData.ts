import * as React from 'react';

export type Status<A, E = any> =
  | { type: 'NotAsked' }
  | { type: 'Loading' }
  | { type: 'Success'; value: A }
  | { type: 'Failure'; error: E };

export function useRemoteData<A, E = any>() {
  const [status, setStatus] = React.useState<Status<A, E>>({ type: 'NotAsked' });

  const notAsked = () => setStatus({ type: 'NotAsked' });
  const loading = () => setStatus({ type: 'Loading' });
  const success = (value: A) => setStatus({ type: 'Success', value });
  const failure = (error: E) => setStatus({ type: 'Failure', error });

  return { status, notAsked, loading, success, failure };
}
