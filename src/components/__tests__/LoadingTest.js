import React from 'react';
import { shallow, configure } from 'enzyme';
import Loading from '../Loading/Loading';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper).toMatchSnapshot();
  });
});
