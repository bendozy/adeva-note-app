import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from '../constants';

export const createNote = note => ({
  type: CREATE_NOTE,
  note,
});

export const updateNote = note => ({
  type: UPDATE_NOTE,
  note,
});

export const deleteNote = id => ({
  type: DELETE_NOTE,
  id,
});
