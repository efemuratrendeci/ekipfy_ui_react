import { useState, useEffect } from "react";
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
    fontSize: 18
  },
});

const TeamSummary = () => {
  const classes = useStyles();
  const [summaryTeam, setSummaryTeam] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      let token = localStorage.getItem("token");

      const options = {
        method: "GET",
        timeout: 1000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
        url = "http://localhost:8080/manager/team_summary";

      let response = await fetch(url, options);

      if (response.status === 200) {
        response = await response.json();

        setSummaryTeam([
          ...response.content.team,
        ])
      }
    };
    fetchdata();
  }, []);

  return (
    <div className={classes.root}>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
      >
        Ekip Durumu
      </Typography>
      {summaryTeam.map((team) => (
        <Chip
          key={team._id}
          className={classes.chips}
          avatar={<Avatar>{team.suffix}</Avatar>}
          label={team.count}
          color="primary"
          variant="outlined"
        />
      ))}

    </div>
  );
};

export default TeamSummary;