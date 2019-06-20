import reducer, { initialState } from '../src/reducers';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle CREATE_NOTE', () => {
    expect(reducer(
      initialState,
      {
        type: 'CREATE_NOTE',
      },
    )).toMatchSnapshot();
  });

  it('should handle UPDATE_NOTE', () => {
    const state = {
      notes: [{
        id: 1,
        title: 'First Example',
        details: 'First Testing detail',
      }, {
        id: 2,
        title: 'Example',
        details: 'Testing detail',
      }],
      nextId: 3,
    };

    expect(reducer(
      state,
      {
        type: 'UPDATE_NOTE',
        note: {
          id: 2,
          title: 'Update Example',
          details: 'Testing detail updated',
        },
      },
    )).toMatchSnapshot();
  });

  it('should handle DELETE_NOTE', () => {
    const state = {
      notes: [{
        id: 3,
        title: 'Delete Example',
        details: 'Delete Testing detail',
      }],
      nextId: 3,
    };

    expect(reducer(
      state,
      {
        type: 'DELETE_NOTE',
        id: 3,
      },
    )).toMatchSnapshot();
  });
});
