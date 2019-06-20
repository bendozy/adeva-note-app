import configureMockStore from 'redux-mock-store';
import {
  createNote,
  updateNote,
  deleteNote,
} from '../src/actions/notes';

const mockStore = configureMockStore();

describe('Note action creators tests', () => {
  it('creates CREATE_NOTE when creating a note is successful', () => {
    const store = mockStore({});

    store.dispatch(createNote({
      title: 'Example',
      details: 'Testing detail',
    }));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('creates UPDATE_NOTE when updating a note is successful', () => {
    const initialState = {
      notes: [{
        id: 2,
        title: 'Example',
        details: 'Testing detail',
      }],
    };
    const store = mockStore(initialState);

    store.dispatch(updateNote({
      id: 2,
      title: 'Update Example',
      details: 'Testing detail updated',
    }));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('creates DELETE_NOTE when deleting a note is successful', () => {
    const initialState = {
      notes: [{
        id: 3,
        title: 'Delete Example',
        details: 'Testing detail',
      }],
    };
    const store = mockStore(initialState);

    store.dispatch(deleteNote(3));
    expect(store.getActions()).toMatchSnapshot();
  });
});
