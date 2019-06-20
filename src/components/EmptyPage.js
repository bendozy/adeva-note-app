import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(5),
  },
}));

const EmptyPage = ({ title, text }) => {
  const classes = useStyles();

  return (
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
          className={classes.body}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

EmptyPage.defaultProps = {
  title: 'Page Not Found',
  text: 'The requested url could not be found',
};

EmptyPage.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default EmptyPage;
