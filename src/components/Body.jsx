import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Summary from "./Summary";
import TeamSummary from "./TeamSummary";

const Body = () => {
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} sm={2}>
          <Summary />
          <TeamSummary />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper>xs=12</Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Body;
