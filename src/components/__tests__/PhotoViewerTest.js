import React from 'react';
import { shallow, configure } from 'enzyme';
import PhotoViewer from '../PhotoViewer/PhotoViewer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('PhotoViewer', () => {
  it('renders correctly when active', () => {
    const props = {
      visible: true,
      photo: {
        source: 'source',
        title: 'title'
      },
      onViewerClose: jest.fn()
    };

    const wrapper = shallow(<PhotoViewer {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when inactive', () => {
    const props = {
      visible: false,
      photo: null,
      onViewerClose: jest.fn()
    };

    const wrapper = shallow(<PhotoViewer {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
