import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  item: {
    textAlign: "center",
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
    title: "",
    giro: 0,
    closed: 0,
    canceled: 0,
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
        url = "http://localhost:8080/manager/get_summary";

      let response = await fetch(url, options);
    };
    fetchdata();
  }, []);

  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        component="h6"
        color="textSecondary"
        gutterBottom
      >
        2. Dönem
      </Typography>
      <Box mt={2} className={classes.item}>
        <Card className={classes.giro}>
          <CardContent>
            <Typography
              variant="p"
              component="p"
              color="textSecondary"
              gutterBottom
              className={classes.content}
            >
              615K
            </Typography>
            <Typography
              variant="p"
              component="p"
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
              variant="p"
              component="p"
              color="textSecondary"
              gutterBottom
              className={classes.content}
            >
              35
            </Typography>
            <Typography
              variant="p"
              component="p"
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
              variant="p"
              component="p"
              color="textSecondary"
              gutterBottom
              className={classes.content}
            >
              2
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
    </div>
  );
};

export default Summary;
