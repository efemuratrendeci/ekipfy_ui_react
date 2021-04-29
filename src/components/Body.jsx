import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Summary from "./Summary";
import TeamSummary from "./TeamSummary";
import EventTimeLine from "./EventTimeLine";
import ProjectsGrid from "./ProjectsGrid";
import CategorySummary from "./CategorySummary";
import CustomerSummary from "./CustomerSummary";
import Chat from "./Chat";

const Body = ({ socket, user }) => {
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
            <ProjectsGrid socket={socket} />
            <br />
            <Chat user={user} socket={socket} />
          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Container maxWidth="sm">
            <EventTimeLine socket={socket} />
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
