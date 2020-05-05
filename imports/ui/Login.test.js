import { Meteor } from 'meteor/meteor';
import React from 'react';
//import expect from 'expect';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);
// test file

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {

    it('should show error messages when error exists', function () {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).to.equal(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'travis@test.com';
      const password = 'password123';
      const spy = chai.spy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.__spy.calls[0][0]).to.deep.equal({ email });
      expect(spy.__spy.calls[0][1]).to.equal(password);
    });

    it('should call loginWithPassword with errors', function () {
      const spy = chai.spy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.find('form').simulate('submit');

      spy.__spy.calls[0][2]({});
      expect(wrapper.state('error').length).to.not.equal(0);

      spy.__spy.calls[0][2]();
      expect(wrapper.state('error').length).to.equal(0);
    });
  });
}
