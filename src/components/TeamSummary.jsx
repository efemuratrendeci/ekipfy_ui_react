import React from "react";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  chips: {
    margin: 2,
  },
});

const TeamSummary = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        component="h6"
        color="textSecondary"
        gutterBottom
      >
        Ekip
      </Typography>
      <Chip
        className={classes.chips}
        avatar={<Avatar>EMR</Avatar>}
        label="25"
        variant="outlined"
      />
      <Chip
        className={classes.chips}
        avatar={<Avatar>SC</Avatar>}
        label="21"
        variant="outlined"
      />
      <Chip
        className={classes.chips}
        avatar={<Avatar>GC</Avatar>}
        label="15"
        variant="outlined"
      />
      <Chip
        className={classes.chips}
        avatar={<Avatar>SF</Avatar>}
        label="32"
        variant="outlined"
      />
      <Chip
        className={classes.chips}
        avatar={<Avatar>BK</Avatar>}
        label="7"
        variant="outlined"
      />
      <Chip
        className={classes.chips}
        avatar={<Avatar>YÖ</Avatar>}
        label="2"
        variant="outlined"
      />
    </div>
  );
};

export default TeamSummary;
