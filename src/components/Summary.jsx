import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  item: {
    textAlign: "center",
  },
  paper: {
    padding: 20
  },
  giro: {
    backgroundColor: "mediumseagreen",
  },
  closed: {
    backgroundColor: "dodgerblue",
  },
  canceled: {
    backgroundColor: "red",
  },
  content: {
    fontSize: 42,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "#eee",
  },
});

const Summary = () => {
  const classes = useStyles();
  const [summary, setSummary] = useState({
    period: 0,
    giro: 0,
    done: 0,
    cancel: 0,
  });

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
        url = `${process.env.REACT_APP_API_URL}/manager/summary`;

      let response = await fetch(url, options);

      if (response.status === 200) {
        response = await response.json();

        setSummary({
          ...response.content.summary,
        })
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
        {summary.period || 0}. Dönem
      </Typography>
      <Paper className={classes.paper}>
        <Box mt={2} className={classes.item}>
          <Card className={classes.giro}>
            <CardContent>
              <Typography
                variant="h6"
                component="h6"
                color="textSecondary"
                gutterBottom
                className={classes.content}
              >
                {summary.giro || 0}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                color="textSecondary"
                gutterBottom
                className={classes.description}
              >
                Ciro elde edildi
            </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box mt={2} className={classes.item}>
          <Card className={classes.closed}>
            <CardContent>
              <Typography
                variant="h6"
                component="h6"
                color="textSecondary"
                gutterBottom
                className={classes.content}
              >
                {summary.done || 0}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                color="textSecondary"
                gutterBottom
                className={classes.description}
              >
                Proje tamamlandı
            </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box mt={2} className={classes.item}>
          <Card className={classes.canceled}>
            <CardContent>
              <Typography
                variant="h6"
                component="h6"
                color="textSecondary"
                gutterBottom
                className={classes.content}
              >
                {summary.cancel || 0}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                color="textSecondary"
                gutterBottom
                className={classes.description}
              >
                Proje İptal edildi
            </Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </div>
  );
};

export default Summary;
