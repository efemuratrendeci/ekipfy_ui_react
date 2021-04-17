import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Summary from "./Summary";
import TeamSummary from "./TeamSummary";
import EventTimeLine from "./EventTimeLine";
import ProjectsGrid from "./ProjectsGrid";

const Body = () => {
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} sm={2}>
          <Container maxWidth="sm">
            <Summary />
            <br />
            <TeamSummary />
          </Container>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Container maxWidth="sm">
            <ProjectsGrid />
          </Container>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Container maxWidth="sm">
            <EventTimeLine />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Body;
