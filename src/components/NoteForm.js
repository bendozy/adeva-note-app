import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EmptyPage from './EmptyPage';
import {
  createNote as createNoteAction,
  updateNote as updateNoteAction,
} from '../actions/notes';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const NoteForm = ({
  note,
  nextId,
  history,
  isEditMode,
  createNoteAction: createNote,
  updateNoteAction: updateNote,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: note ? note.title : '',
    details: note ? note.details : '',
  });

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const formatInput = name => (event) => {
    setValues({ ...values, [name]: event.target.value.trim() });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (note) {
      updateNote(Object.assign({}, note, values));
      history.push(`/notes/${note.id}`);
    } else {
      createNote(values);
      history.push(`/notes/${nextId}`);
    }
  };

  if (isEditMode && !note) {
    return (
      <EmptyPage
        title="Note Not Found"
        text="The requested note is not available"
      />
    );
  }

  return (
    <Grid>
      <Grid>
        <Typography variant="h4" color="inherit" noWrap>
          {note ? 'Update' : 'New'} Note
        </Typography>
      </Grid>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Grid>
          <TextField
            required
            id="title"
            label="Note Title"
            value={values.title}
            fullWidth
            onChange={handleChange('title')}
            onBlur={formatInput('title')}
            margin="normal"
          />
        </Grid>
        <Grid>
          <TextField
            required
            id="title"
            label="Note Details"
            value={values.details}
            fullWidth
            onChange={handleChange('details')}
            multiline
            rows={20}
            margin="normal"
          />
        </Grid>
        <Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {note ? 'Update' : 'Create'} Note
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

NoteForm.defaultProps = {
  note: undefined,
};

NoteForm.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  nextId: PropTypes.number.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  createNoteAction: PropTypes.func.isRequired,
  updateNoteAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notes, nextId }, { match: { params } }) =>
  ({
    note: notes.find(note => note.id === parseInt(params.noteId, 10)),
    isEditMode: !!params.noteId,
    nextId,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNoteAction,
      updateNoteAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
