import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(spies);

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = chai.spy();
      browserHistory = {
        push: chai.spy()
      }
    });

    it('should render pick note message', function(){
      const wrapper = mount(<Editor history={browserHistory} call={call}/> );

      expect(wrapper.find('p').text()).to.equal('Pick or create a note to get started.');

      // expect(spy).to.have.been.called.with('notes.insert');
    });

    it('should render not found message', function(){
      const wrapper = mount(<Editor history={browserHistory} call={call} selectedNoteId={notes[0]._id}/> );

      expect(wrapper.find('p').text()).to.equal('Note not found.');

      // expect(spy).to.have.been.called.with('notes.insert');
    });

    it('should remove note', function(){
      const wrapper = mount(<Editor history={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/> );

      wrapper.find('button').simulate('click');

      expect(browserHistory.push).to.have.been.called.with('/dashboard');
      expect(call).to.have.been.called.with('notes.remove',notes[0]._id);
    });

    it('should update note body on textarea change', function(){
      const newBody = 'This is my new body text';
      const wrapper = mount(<Editor history={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/> );

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).to.equal(newBody);
      expect(call).to.have.been.called.with('notes.update',notes[0]._id, {body: newBody});
    });

    it('should update note title on input change', function(){
      const newTitle = 'This is my new Title';
      const wrapper = mount(<Editor history={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/> );

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).to.equal(newTitle);
      expect(call).to.have.been.called.with('notes.update',notes[0]._id, {title: newTitle});
    });

    it('should set state for new note', function(){
      const wrapper = mount(<Editor history={browserHistory} call={call} /> );

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      })

      expect(wrapper.state('title')).to.equal(notes[0].title);
      expect(wrapper.state('body')).to.equal(notes[0].body);
    });

    it('should not set state if note prop not provided', function(){
      const wrapper = mount(<Editor history={browserHistory} call={call} /> );

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      })

      expect(wrapper.state('title')).to.equal('');
      expect(wrapper.state('body')).to.equal('');
    });

  });
}
