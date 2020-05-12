import { useRef } from 'react';
import { v4 } from 'uuid';

const useUuid = (): string => {
  const { current: uniqueId } = useRef(v4());

  return uniqueId;
};

export default useUuid;
