import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

const useObservable = <T>(observable: Observable<T>) => {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const subs = observable.subscribe(setValue);

    return () => {
      subs.unsubscribe();
    };
  }, []);

  return value;
}

export default useObservable;
