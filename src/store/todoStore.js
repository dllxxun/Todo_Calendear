// src/store/todoStore.js
import { atom } from 'recoil';
import { initialTodos } from '../utils/models';

export const todoListState = atom({
  key: 'todoListState', 
  default: initialTodos, 
});