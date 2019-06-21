import React from 'react';
import toJson from 'enzyme-to-json';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
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

    wrapper.find(Fab).at(1).simulate('click');

    expect(wrapper.find(Dialog).props().open).toBe(true);
  });

  it('should close a dialog if the cancel button is clicked', () => {
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

    wrapper.find(Fab).at(1).simulate('click');

    expect(wrapper.find(Dialog).props().open).toBe(true);

    wrapper.find(Dialog).dive().find(Button).first()
      .simulate('click');

    expect(wrapper.find(Dialog).props().open).toBe(false);
  });

  it('should delete a note if delete button in dialog is clicked', () => {
    const deleteNoteAction = jest.fn();
    const push = jest.fn();

    const wrapper = shallow(<Note
      deleteNoteAction={deleteNoteAction}
      history={{
        push,
      }}
      note={{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }}
    />);

    wrapper.find(Fab).at(1).simulate('click');

    expect(wrapper.find(Dialog).props().open).toBe(true);

    wrapper.find(Dialog).dive().find(Button).at(1)
      .simulate('click');

    expect(deleteNoteAction).toHaveBeenCalled();
    expect(wrapper.find(Dialog).props().open).toBe(false);
    expect(push).toHaveBeenCalled();
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

  it('should discpatch deleteNote action', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).deleteNoteAction();
    expect(dispatch.mock.calls[0][0].type).toEqual('DELETE_NOTE');
  });
});
