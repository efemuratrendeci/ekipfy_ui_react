import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const EVENT_COUNT = 5;

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    item: {
        textAlign: "center",
    },
    paper: {
        padding: '6px 16px',
        backgroundColor: 'dodgerblue',
        textAlign: 'center',
        color: 'white'
    }
});

const EventTimeLine = () => {
    const classes = useStyles();
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        let token = localStorage.getItem("token");

        const options = {
            method: "GET",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
            url = `http://localhost:8080/manager/events?take=${EVENT_COUNT}`;

        let response = await fetch(url, options);

        if (response.status === 200) {
            response = await response.json();

            setEvents([...response.content.events]);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className={classes.root}>
            <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
            >
                Olaylar
            </Typography>
            <Paper>
                <Timeline align="alternate" >
                    {events.map((event, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    {new Date(event.created_date).toLocaleDateString()} {new Date(event.created_date).toLocaleTimeString()}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot variant="outlined" color="primary" />
                                {index + 1 === events.length ? '' : <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper className={classes.paper}>
                                    {event.description}
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Paper>
        </div>

    );
};

export default EventTimeLine;
