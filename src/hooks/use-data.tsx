import React from 'react';
import Todo from '../models/todo';

export const useData = <T extends {}>(type: string, name: string):[
    fetchData: () => T[] | undefined,
    updateData: (data: T[]) => void,
    cleanData: () => void
  ] => {

  const fetchData = <T extends {}>():T[] | undefined  => {
    if ('localStorage' === type) {
      const reference = localStorage.getItem(name);
      if (reference) {
        const LocalTodos: T[] = JSON.parse(reference);
        return LocalTodos;
      }
    }
  };

  const updateData= <T extends {}>(data: T[]):void => {
    if ('localStorage' === type) {
      localStorage.setItem(name, JSON.stringify(data));
    }
  };

  const cleanData=():void => {
    localStorage.removeItem(name);
  };
  
  return [fetchData, updateData, cleanData];
};
