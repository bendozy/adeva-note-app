import React from 'react';
import toJson from 'enzyme-to-json';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import { Note, mapStateToProps, mapDispatchToProps } from '../../src/components/Note';
import EmptyPage from '../../src/components/EmptyPage';

describe('<Note />', () => {
  it('should render a <Note /> component', () => {
    const wrapper = shallow(<Note
      deleteNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      note={{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }}
    />);


    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Typography).first().text()).toBe('Test Example');
    expect(wrapper.find(Typography).at(1).text()).toBe('Testing detail');
    expect(wrapper.find(Fab)).toHaveLength(2);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should show a dialog if the delete button is clicked', () => {
    const wrapper = shallow(<Note
      deleteNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      note={{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }}
    />);

    wrapper.find(Fab).at(0).simulate('click');
  });

  it('should render a <EmptyPage /> component when no note is found', () => {
    const wrapper = shallow(<Note
      deleteNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(EmptyPage)).toHaveLength(1);
  });

  it('check for the correct note title', () => {
    expect(mapStateToProps({
      notes: [{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }],
    }, {
      match: {
        params: {
          noteId: 1,
        },
      },
    }).note.title).toBe('Test Example');
  });

  it('should discpatch searchMovie action', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).deleteNoteAction();
    expect(dispatch.mock.calls[0][0].type).toEqual('DELETE_NOTE');
  });
});
