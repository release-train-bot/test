import React, {useEffect, useRef, useState} from 'react';
import {BaseViewModel} from './BaseViewModel';

export function useViewModel<T, VM extends BaseViewModel<T>>(
  ViewModelClass: new (setState: React.Dispatch<React.SetStateAction<T>>, initialState: T) => VM,
  initialState: T
): [T, VM] {
  const [state, setState] = useState<T>(initialState);

  const viewModelRef = useRef<VM | null>(null);

  if (!viewModelRef.current) {
    viewModelRef.current = new ViewModelClass(setState, initialState);
  }

  useEffect(() => {
    const viewModel = viewModelRef.current!;
    const dispose = viewModel.init();

    return () => {
      dispose();
    };
  }, []);

  return [state, viewModelRef.current!];
}