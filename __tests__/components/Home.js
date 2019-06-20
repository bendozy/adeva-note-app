import React from 'react';
import toJson from 'enzyme-to-json';
import Typography from '@material-ui/core/Typography';
import Home from '../../src/components/Home';

describe('<Home />', () => {
  it('should render a <Home /> component with Typography components', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find(Typography)).toHaveLength(3);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
