import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    let meteorCall, Session;

    beforeEach(function() {
      meteorCall = chai.spy();
      Session = {
        set: chai.spy()
      }
    });

    it('should call meteorCall on click', function(){
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session}/> );

      wrapper.find('button').simulate('click');
      meteorCall.__spy.calls[0][1](undefined, notes[0]._id)

      expect(meteorCall.__spy.calls[0][0]).to.equal('notes.insert');
      expect(Session.set).to.have.been.called.with('selectedNoteId', notes[0]._id);
    });

    it('should not set session for failed insert', function(){
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session}/> );

      wrapper.find('button').simulate('click');
      meteorCall.__spy.calls[0][1]({}, undefined);

      expect(meteorCall.__spy.calls[0][0]).to.equal('notes.insert');
      expect(Session.set).to.not.have.been.called();
    });

  });
}
