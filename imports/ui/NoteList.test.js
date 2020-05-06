import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';

configure({ adapter: new Adapter() });
chai.use(spies);

if (Meteor.isClient) {
  describe('NoteList', function () {

    it('should render NoteListItem for each note', function(){
      const wrapper = mount( <NoteList notes={notes}/> );

      expect(wrapper.find('NoteListItem').length).to.equal(2);
      expect(wrapper.find('NoteListEmptyItem').length).to.equal(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount( <NoteList notes={[]}/> );

      expect(wrapper.find('NoteListItem').length).to.equal(0);
      expect(wrapper.find('NoteListEmptyItem').length).to.equal(1);
    });
  });
}
