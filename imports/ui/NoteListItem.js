import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{ props.note.title || 'Untitled Note'}</h5>
      <p>{ moment(props.note.lastUpdatedAt).format('M/DD/YYYY') }</p>
    </div>
  )
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  return { Session };
})(NoteListItem);
