import React from 'react';
import { shallow, configure } from 'enzyme';
import PhotoVisor from '../PhotoVisor/PhotoVisor';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('PhotoVisor', () => {
  it('renders correctly when active', () => {
    const props = {
      visible: true,
      photo: {
        source: 'source',
        title: 'title'
      },
      onVisorClose: jest.fn()
    };

    const wrapper = shallow(<PhotoVisor {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when inactive', () => {
    const props = {
      visible: false,
      photo: null,
      onVisorClose: jest.fn()
    };

    const wrapper = shallow(<PhotoVisor {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
