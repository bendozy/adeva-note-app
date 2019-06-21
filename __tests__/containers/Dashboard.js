import React from 'react';
import toJson from 'enzyme-to-json';
import AppBar from '@material-ui/core/AppBar';
import Dashboard from '../../src/containers//Dashboard';
import NotesList from '../../src/components/NotesList';

describe('<Dashboard />', () => {
  it('should render a <Dashboard /> component', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(NotesList)).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
