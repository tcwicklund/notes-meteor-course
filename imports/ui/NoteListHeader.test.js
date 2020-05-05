import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader', function () {

    it('should call meteorCall on click', function(){
      const spy = chai.spy();
      const wrapper = mount( <NoteListHeader meteorCall={spy}/> );

      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.called.with('notes.insert');
    });
  });
}
