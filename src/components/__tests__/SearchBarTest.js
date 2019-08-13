import React from 'react';
import { shallow, configure } from 'enzyme';
import SearchBar from '../SearchBar/SearchBar';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('SearchBar', () => {
  it('renders correctly', () => {
    const props = {
      onSubmit: jest.fn()
    };

    const wrapper = shallow(<SearchBar {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
