import React from 'react';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import App from '../../src/containers/App';
import Dashboard from '../../src/containers//Dashboard';

describe('<App />', () => {
  it('should render a <App /> component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Provider)).toHaveLength(1);
    expect(wrapper.find(Dashboard)).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
