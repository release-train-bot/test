import React from 'react';

export abstract class BaseViewModel<T> {
  protected _state: T;
  protected _setState: React.Dispatch<React.SetStateAction<T>>;

  constructor(setState: React.Dispatch<React.SetStateAction<T>>, initialState: T) {
    this._setState = setState;
    this._state = initialState;
  }

  get state(): T {
    return this._state;
  }

  init(): () => void {
    return () => {
    };
  }

  protected updateState(partialState: Partial<T>) {
    this._state = {...this._state, ...partialState};
    this._setState(this._state);
  }
}