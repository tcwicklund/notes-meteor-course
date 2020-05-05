import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => props.meteorCall('notes.insert')}>
        Create Note
      </button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call
  };
})(NoteListHeader);
