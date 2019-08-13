import React from 'react';
import { shallow, configure } from 'enzyme';
import Button from '../Button/Button';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Button', () => {
  const props = {
    text: 'text',
    onClick: jest.fn()
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
