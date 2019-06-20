import React from 'react';
import toJson from 'enzyme-to-json';
import Typography from '@material-ui/core/Typography';
import EmptyPage from '../../src/components/EmptyPage';

describe('<EmptyPage />', () => {
  it('should render a <EmptyPage /> component with default props', () => {
    const wrapper = shallow(<EmptyPage />);

    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

