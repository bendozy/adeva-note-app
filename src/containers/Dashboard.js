import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Home from '../components/Home';
import Note from '../components/Note';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';
import EmptyPage from '../components/EmptyPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  homeIconButton: {
    color: 'white',
  },
  paper: {
    padding: theme.spacing(2),
    height: '100vh',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              className={classes.homeIconButton}
              aria-label="Home"
              component={Link}
              to="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Adeva Note App
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm={3}>
              <NotesList />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper className={classes.paper}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/notes/add" component={NoteForm} />
                  <Route exact path="/notes/:noteId" component={Note} />
                  <Route exact path="/notes/:noteId/edit" component={NoteForm} />
                  <Route component={EmptyPage} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    </Router>
  );
};

export default Dashboard;
