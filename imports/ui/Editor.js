import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }

  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }

  handleDeleteButtonClick() {
    this.props.call('notes.remove', this.props.note._id);
  }

  render() {
    if (this.props.note) {
      return (
        <div>
        <input
          value={this.props.note.title}
          onChange={this.handleTitleChange.bind(this)}/>
        <textarea
          value={this.props.note.body}
          placeholder="Enter note..."
          onChange={this.handleBodyChange.bind(this)}>
        </textarea>
        <button onClick={this.handleDeleteButtonClick.bind(this)}>Delete Note</button>
      </div>
      )
    } else {
      return (
        <p>
          { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.' }
        </p>
      );
    }
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string
};

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
})(Editor);
