import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListSearch from './NoteListSearch';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = props => {

  return (
    <div className="item-list">
      <NoteListHeader/>
      <NoteListSearch/>
      { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
      {
        props.notes
        .filter((note) => {
          return note.title.toLowerCase().indexOf(props.searchText) > -1
        })
        .map((note) => {
          return <NoteListItem key={note._id} note={note}/>
        })
      }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    searchText: Session.get('searchText'),
    notes: Notes.find({},{
      sort: {
        lastUpdatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id == selectedNoteId
      }
    })
  };
})(NoteList);
