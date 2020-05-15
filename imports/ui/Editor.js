import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body })
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title })
    this.props.call('notes.update', this.props.note._id, { title });
  }

  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    Session.set('isNavOpen', !Session.get('isNavOpen'));
    this.props.history.push('/dashboard');
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }

  componentDidMount() {
    Session.set('selectedNoteId', this.props.selectedNoteId);
  }

  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title"
            value={this.state.title}
            placeholder="Note Title"
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea className="editor__body"
            value={this.state.body}
            placeholder="Enter note..."
            onChange={this.handleBodyChange.bind(this)}>
          </textarea>
          <div>
            <button
              className="button button--secondary"
              onClick={this.handleRemoval.bind(this)}>Delete Note</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { this.state.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.' }
          </p>
        </div>
      );
    }
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
})(Editor));
