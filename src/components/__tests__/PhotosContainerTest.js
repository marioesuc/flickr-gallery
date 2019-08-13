import React from 'react';
import { shallow, configure } from 'enzyme';
import PhotosContainer from '../PhotosContainer/PhotosContainer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('PhotosContainer', () => {
  const props = {
    data: [
      {
        id: 'id',
        farm: 'farm',
        server: 'server',
        secret: 'secret',
        title: 'title'
      }
    ],
    onPhotoClick: jest.fn()
  };

  it('renders correctly', () => {
    const wrapper = shallow(<PhotosContainer {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
