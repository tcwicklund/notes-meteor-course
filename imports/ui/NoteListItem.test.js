import React from 'react';
import { Meteor } from 'meteor/meteor';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });
chai.use(spies);

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: chai.spy()
      };
    });

    it('should render title and timestamp', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/> );

      expect(wrapper.find('h5').text()).to.equal(notes[0].title);
      expect(wrapper.find('p').text()).to.equal('5/04/2020');
    });

    it('should set default title if no title set', function() {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).to.equal('Untitled Note');
    });

    it('should call set on click', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/> );

      wrapper.find('div').simulate('click');

      expect(Session.set).to.have.been.called.with('selectedNoteId',notes[0]._id);
    });

  });
}
