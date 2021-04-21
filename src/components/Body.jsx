import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Summary from "./Summary";
import TeamSummary from "./TeamSummary";
import EventTimeLine from "./EventTimeLine";
import ProjectsGrid from "./ProjectsGrid";
import CategorySummary from "./CategorySummary";
import CustomerSummary from "./CustomerSummary";

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
        <Grid item xs={12} sm={6}>
          <Container maxWidth="lg">
            <ProjectsGrid />
            <br />
            <Grid container direction="row" justify="space-between" >

            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Container maxWidth="sm">
            <EventTimeLine />
            <CategorySummary />
            <br />
            <CustomerSummary />
          </Container>
        </Grid>
      </Grid>
      <br />
      <br />
    </>
  );
};

export default Body;
