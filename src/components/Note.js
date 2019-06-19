import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import EmptyPage from './EmptyPage';
import { deleteNote as deleteNoteAction } from '../actions/notes';

const useStyles = makeStyles(theme => ({
  details: {
    marginTop: theme.spacing(5),
  },
  fab: {
    margin: theme.spacing(1),
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabEdit: {
    right: theme.spacing(10),
  },
  fabDelete: {
    right: theme.spacing(2),
  },
}));

const Note = ({
  history,
  deleteNoteAction: deleteNote,
  note,
  note: {
    id,
    title,
    details,
  } = {},
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    deleteNote(note.id);
    setOpen(false);
    setSnackOpen(true);
    history.push('/');
  };

  if (!note) {
    return (
      <EmptyPage
        title="Note Not Found"
        text="The requested note is not available"
      />
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid>
          <Typography variant="h4" color="inherit" noWrap>
            {title}
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant="body1"
            component="p"
            color="inherit"
            className={classes.details}
          >
            {details}
          </Typography>
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="Edit Note"
        className={classNames(classes.fab, classes.fabEdit)}
        component={Link}
        to={`/notes/${id}/edit`}
      >
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab
        color="secondary"
        aria-label="Delete Note"
        className={classNames(classes.fab, classes.fabDelete)}
        onClick={handleOpen}
      >
        <DeleteIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Note?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={4000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note deleted successfully</span>}
      />
    </React.Fragment>
  );
};

Note.defaultProps = {
  note: undefined,
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deleteNoteAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notes }, { match: { params } }) =>
  ({
    note: notes.find(note => note.id === parseInt(params.noteId, 10)),
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteNoteAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Note);
