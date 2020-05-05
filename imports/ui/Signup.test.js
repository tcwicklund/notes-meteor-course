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

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages when error exists', function () {
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={() => {}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).to.equal(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call createUser with the form data', function () {
      const email = 'travis@test.com';
      const password = 'password123';
      const spy = chai.spy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.__spy.calls[0][0]).to.deep.equal({ email, password });
    });

    it('should set error if short password', function () {
      const email = 'travis@test.com';
      const password = '123                           ';
      const spy = chai.spy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).to.not.equal(0);
    });

    it('should set createUser callback errors', function () {
      const password = 'password123!';
      const reason = 'This is why it failed';
      const spy = chai.spy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      spy.__spy.calls[0][1]({ reason });
      expect(wrapper.state('error')).to.equal(reason);

      spy.__spy.calls[0][1]();
      expect(wrapper.state('error').length).to.equal(0);
    });
  });
}
