import React from 'react';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListSearch = (props) => {
  return (
    <div className="item-list__search">
      <input type="search" placeholder="Search notes" 
        onChange={(e) => Session.set('searchText', e.target.value.trim().toLowerCase())}
      />
    </div>
  );
};

NoteListSearch.propType = {
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    Session
  };
})(NoteListSearch);
