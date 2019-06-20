import React from 'react';
import toJson from 'enzyme-to-json';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import { NotesList, mapStateToProps } from '../../src/components/NotesList';

describe('<NotesList />', () => {
  it('should render a <NoteList /> component', () => {
    const wrapper = shallow(<NotesList />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).first().text()).toBe('Add New Note');
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(InputBase)).toHaveLength(1);
  });

  it('should render a <ListItem /> when there is no result', () => {
    const wrapper = shallow(<NotesList />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(ListItem)).toHaveLength(1);
    expect(wrapper.find(ListItemText)).toHaveLength(1);
    expect(wrapper.find(ListItemText).first().props().primary).toBe('Notes List is Empty');
  });

  it('should render multiple <ListItem /> when there is multiple results', () => {
    const notes = [{
      id: 1,
      title: 'Test Example',
      details: 'Testing detail',
    }, {
      id: 2,
      title: 'Second Example',
      details: 'Second Testing detail',
    }];
    const wrapper = shallow(<NotesList notes={notes} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(ListItem)).toHaveLength(2);
    expect(wrapper.find(ListItemText)).toHaveLength(2);
    expect(wrapper.find(ListItemText).first().props().primary).toBe('Test Example');
    expect(wrapper.find(ListItemText).at(1).props().primary).toBe('Second Example');
  });

  it('should filter with search results', () => {
    const notes = [{
      id: 1,
      title: 'Test Example',
      details: 'Testing detail',
    }, {
      id: 2,
      title: 'Second Example',
      details: 'Second Testing detail note',
    }];
    const event = {
      preventDefault() {},
      target: {
        value: 'note',
      },
    };

    const wrapper = shallow(<NotesList notes={notes} />);

    wrapper.find(InputBase).simulate('change', event);
    expect(wrapper.find(ListItem)).toHaveLength(1);
    expect(wrapper.find(ListItemText)).toHaveLength(1);
    expect(wrapper.find(ListItemText).first().props().primary).toBe('Second Example');
  });

  it('should filter without search results', () => {
    const notes = [{
      id: 1,
      title: 'Test Example',
      details: 'Testing detail',
    }, {
      id: 2,
      title: 'Second Example',
      details: 'Second Testing detail note',
    }];
    const event = {
      preventDefault() {},
      target: {
        value: 'smart',
      },
    };

    const wrapper = shallow(<NotesList notes={notes} />);

    wrapper.find(InputBase).simulate('change', event);
    expect(wrapper.find(ListItem)).toHaveLength(1);
    expect(wrapper.find(ListItemText)).toHaveLength(1);
    expect(wrapper.find(ListItemText).first().props().primary).toBe('Search Result is Empty');
  });

  it('check for the correct notes list', () => {
    expect(mapStateToProps({
      notes: [{
        id: 1,
        title: 'Test Example',
        details: 'Testing detail',
      }],
    }).notes.length).toBe(1);
  });
});
