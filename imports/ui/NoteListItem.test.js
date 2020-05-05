import React from 'react';

import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Adapter from 'enzyme-adapter-react-16';
import { Meteor } from 'meteor/meteor';
import { configure, shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });
chai.use(spies);
// test file

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function () {
      const title = 'My title';
      const lastUpdatedAt = 1588650875457;
      const wrapper = mount(<NoteListItem note={{ title, lastUpdatedAt }}/> );

      expect(wrapper.find('h5').text()).to.equal(title);
      expect(wrapper.find('p').text()).to.equal('5/04/2020');
    });

    it('should set default title if no title set', function() {
      const title = '';
      const lastUpdatedAt = 1588650875457;
      const wrapper = mount(<NoteListItem note={{ title, lastUpdatedAt }}/> );

      expect(wrapper.find('h5').text()).to.equal('Untitled Note');
    });

  });
}
