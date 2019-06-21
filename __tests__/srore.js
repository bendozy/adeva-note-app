import store from '../src/store';
import { createNote, updateNote, deleteNote } from '../src/actions/notes';

describe('store actions', () => {
  it('dispatches a createNote action', () => {
    const note = {
      title: 'test title',
      details: 'test details',
    };

    store.dispatch(createNote(note));

    expect(store.getState().notes).toHaveLength(1);
    expect(store.getState().notes[0]).toEqual(Object.assign({}, note, { id: 1 }));
  });

  it('dispatches a updateNote action', () => {
    const note = {
      id: 1,
      title: 'updated title',
      details: 'updated details',
    };

    store.dispatch(updateNote(note));

    expect(store.getState().notes).toHaveLength(1);
    expect(store.getState().notes[0]).toEqual(note);
  });

  it('dispatches a deleteNote action', () => {
    const id = 1;

    store.dispatch(deleteNote(id));

    expect(store.getState().notes).toHaveLength(0);
  });
});
