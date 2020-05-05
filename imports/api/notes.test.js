import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function (){
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      userId: 'testUserId1',
      createdAt: 0,
      lastUpdatedAt: 0
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to Buy',
      body: 'Couch',
      userId: 'testUserId2',
      createdAt: 0,
      lastUpdatedAt: 0
    };
    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function (){
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).to.be.an('object');
    });

    it('should not insert new note if not authenticated', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).to.throw();
    });

    it('should remove note if authenticated', function (){
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).to.be.undefined;
    });

    it('should not remove note if not authenticated', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).to.throw();
    });

    it('should not remove note if noteId does not exist', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).to.throw();
    });

    it('should update note', function () {
      const title = 'This is the updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.lastUpdatedAt).to.be.at.least(0);
      expect(note.title).to.equal(title);
      expect(note.body).to.equal(noteOne.body);
        // body: noteOne.body);
    });

    it('should throw error if extra updates provided', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { title: 'new title', name: 'Travis' }
        ]);
      }).to.throw();
    });

    it('should not update note if user was not creator', function () {
      const title = 'This is the updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testid'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne({ _id: noteOne._id });

      expect(note).to.deep.equal(noteOne);
        // body: noteOne.body);
    });


    it('should not update note if not authenticated', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).to.throw();
    });

    it('should not update note if noteId does not exist', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).to.throw();
    });

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      expect(notes.length).to.equal(1);
      expect(notes[0]).to.deep.equal(noteOne);
    });

    it('should return no notes for user that has none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testid' });
      const notes = res.fetch();

      expect(notes.length).to.equal(0);
    });

  });
}
