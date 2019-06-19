import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  search: {
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  list: {
    // height: '93vh',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const NotesList = ({ notes }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  return (
    <Grid>
      <Grid>
        <Paper className={classes.search}>
          <IconButton className={classes.iconButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search Notes"
            inputProps={{ 'aria-label': 'Search Notes' }}
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid>
        <List component="nav" aria-label="Secondary mailbox folders">
          {notes
            .filter(note =>
              note.title.toLowerCase().includes(searchText.toLowerCase())
                || note.details.toLowerCase().includes(searchText.toLowerCase()))
            .map((note, index) => (
              <ListItem
                key={note.id}
                button
                divider={notes.length !== index + 1}
                component={Link}
                to={`/notes/${note.id}`}
              >
                <ListItemText primary={note.title} />
              </ListItem>
            ))
          }
        </List>
      </Grid>
      <Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to="/notes/add"
        >
          Add New Note
        </Button>
      </Grid>
    </Grid>
  );
};

NotesList.defaultProps = {
  notes: [],
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = ({ notes }) => ({ notes });

export default connect(mapStateToProps)(NotesList);
