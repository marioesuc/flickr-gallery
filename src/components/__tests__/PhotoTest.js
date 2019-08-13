import React from 'react';
import { shallow, configure } from 'enzyme';
import Photo from '../Photo/Photo';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Photo', () => {
  const props = {
    url: 'url',
    title: 'title'
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Photo {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
