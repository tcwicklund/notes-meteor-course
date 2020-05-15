import React from 'react';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListSearch = (props) => {
  return (
    <div className="item-list__search">
      <input type="text" placeholder="Search notes" value={props.Session.get('searchText')}
        onChange={(e) => props.Session.set('searchText', e.target.value.trim().toLowerCase())}
      />
      <button className="button button--secondary" onClick={() => props.Session.set('searchText','')}>Clear</button>
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
