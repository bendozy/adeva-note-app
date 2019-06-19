import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(5),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Grid>
        <Typography variant="h4" color="inherit" noWrap>
          Welcome
        </Typography>
      </Grid>
      <Grid>
        <Typography
          variant="body1"
          component="p"
          color="inherit"
          className={classes.body}
        >
          Hello there, thanks you for checking out this simple notes application.
          With this app, you can create, update, delete and search for notes.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="inherit"
          className={classes.body}
        >
          This appliction uses localStorage for persistence. To get startted,
          click on the &quot;Add New Note&quot; button on the sidebar.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
