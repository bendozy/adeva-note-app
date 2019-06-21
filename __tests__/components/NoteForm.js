import React from 'react';
import toJson from 'enzyme-to-json';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EmptyPage from '../../src/components//EmptyPage';
import { NoteForm, mapStateToProps, mapDispatchToProps } from '../../src/components/NoteForm';

describe('<NoteForm />', () => {
  it('should render a <Note /> component', () => {
    const wrapper = shallow(<NoteForm
      createNoteAction={jest.fn()}
      updateNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      isEditMode={false}
      nextId={2}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should render a <EmptyPage /> component when in Edit mode with no note', () => {
    const wrapper = shallow(<NoteForm
      createNoteAction={jest.fn()}
      updateNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      isEditMode
      nextId={2}
    />);

    expect(wrapper.find(EmptyPage)).toHaveLength(1);
    expect(wrapper.find(EmptyPage).first().props().title).toBe('Note Not Found');
    expect(wrapper.find(EmptyPage).first().props().text).toBe('The requested note is not available');
  });

  it('should render a form with initial values when in Edit mode with note', () => {
    const wrapper = shallow(<NoteForm
      createNoteAction={jest.fn()}
      updateNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      isEditMode
      nextId={2}
      note={{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }}
    />);

    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(TextField).first().props().value).toBe('Test Example');
    expect(wrapper.find(TextField).at(1).props().value).toBe('Testing detail');
  });

  it('should handle change events', () => {
    const wrapper = shallow(<NoteForm
      createNoteAction={jest.fn()}
      updateNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      isEditMode={false}
      nextId={2}
    />);

    wrapper.find(TextField).first().simulate('change', { target: { value: 'dope title' } });
    wrapper.find(TextField).at(1).simulate('change', { target: { value: 'dope detail' } });

    expect(wrapper.find(TextField).first().props().value).toBe('dope title');
    expect(wrapper.find(TextField).at(1).props().value).toBe('dope detail');
  });

  it('should handle blur events', () => {
    const wrapper = shallow(<NoteForm
      createNoteAction={jest.fn()}
      updateNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      isEditMode={false}
      nextId={2}
    />);

    wrapper.find(TextField).first().simulate('change', { target: { value: '   title' } });
    wrapper.find(TextField).first().simulate('blur', { target: { value: '   title' } });

    expect(wrapper.find(TextField).first().props().value).toBe('title');
  });

  it('should show validation errors if required fields are not filled', () => {
    const wrapper = shallow(<NoteForm
      createNoteAction={jest.fn()}
      updateNoteAction={jest.fn()}
      history={{
        push: jest.fn(),
      }}
      isEditMode={false}
      nextId={2}
    />);

    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(wrapper.find(TextField).first().props().error).toBe('Enter Note Title');
    expect(wrapper.find(TextField).at(1).props().error).toBe('Enter Note Details');
  });

  it('should create note if required fields have values', () => {
    const createNoteAction = jest.fn();
    const updateNoteAction = jest.fn();

    const wrapper = shallow(<NoteForm
      createNoteAction={createNoteAction}
      updateNoteAction={updateNoteAction}
      history={{
        push: jest.fn(),
      }}
      isEditMode={false}
      nextId={2}
    />);

    wrapper.find(TextField).first().simulate('change', { target: { value: 'My new title' } });
    wrapper.find(TextField).at(1).simulate('change', { target: { value: 'My new details' } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(createNoteAction).toHaveBeenCalled();
    expect(updateNoteAction).not.toHaveBeenCalled();
  });

  it('should update note if required fields have values', () => {
    const createNoteAction = jest.fn();
    const updateNoteAction = jest.fn();

    const wrapper = shallow(<NoteForm
      createNoteAction={createNoteAction}
      updateNoteAction={updateNoteAction}
      history={{
        push: jest.fn(),
      }}
      note={{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }}
      isEditMode
      nextId={2}
    />);

    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(createNoteAction).not.toHaveBeenCalled();
    expect(updateNoteAction).toHaveBeenCalled();
  });

  it('check for the correct note title and editMode', () => {
    const mapStatFunc = mapStateToProps({
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
    });

    expect(mapStatFunc.note.title).toBe('Test Example');
    expect(mapStatFunc.isEditMode).toBe(true);
  });

  it('should discpatch createNote action', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).createNoteAction();
    expect(dispatch.mock.calls[0][0].type).toEqual('CREATE_NOTE');
  });

  it('should discpatch updateNote action', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).updateNoteAction();
    expect(dispatch.mock.calls[0][0].type).toEqual('UPDATE_NOTE');
  });
});
