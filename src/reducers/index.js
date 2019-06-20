import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from '../constants';

export const initialState = {
  notes: [],
  nextId: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return Object.assign({}, state, {
        nextId: state.nextId + 1,
        notes: [...state.notes, {
          id: state.nextId,
          ...action.note,
        }],
      });
    case UPDATE_NOTE:
      return Object.assign({}, state, {
        notes: state.notes.map((note) => {
          if (note.id === action.note.id) {
            return action.note;
          }

          return note;
        }),
      });
    case DELETE_NOTE:
      return Object.assign({}, state, {
        notes: state.notes.filter(({ id }) => id !== action.id),
      });
    default:
      return state;
  }
};
