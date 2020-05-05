import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);
// test file

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}}/> );
      const buttonText = wrapper.find('.button').text();

      expect(buttonText).to.equal('Logout');
    });

    it('should be title prop as h1 text', function () {
      const title = 'Test title here';

      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).to.equal(title);
    });

    // it('should call the function', function(){
    //   const spy = chai.spy();
    //   spy(3,4,5);
    //
    //   expect(spy).to.have.been.called();
    //   expect(spy).to.have.been.called.with(3,4,5);
    // });
    //
    // it('should call the function', function(){
    //   const spy = chai.spy();
    //   spy(3,4,5);
    //   spy('Travis');
    //
    //   expect(spy.__spy.calls.length).to.equal(2)
    //   expect(spy).to.have.been.called();
    //   expect(spy).to.have.been.called.with('Travis');
    // });

    it('should call handleLogout on click', function(){
      const spy = chai.spy();
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );

      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.called();
    });
  });
}
