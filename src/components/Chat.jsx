import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    leftMessage: {
        float: "left",
        display: "block",
        backgroundColor: "dodgerblue",
        maxWidth: '20rem',
        color: "white",
        padding: theme.spacing(1),
    },
    rightMessage: {
        float: "right",
        display: "block",
        maxWidth: '20rem',
        backgroundColor: "mediumseagreen",
        color: "white",
        padding: theme.spacing(1),
    },
    messageArea: {
        width: "100%",
        minHeight: "30rem",
    },
    margin: {
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2),
    }
}));

const Chat = ({ user }) => {
    const classes = useStyles();
    const [chat, setChat] = useState([]);

    const getChat = async () => {
        let token = localStorage.getItem("token");

        const options = {
            method: "GET",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
            url = `http://localhost:8080/common/messages`;

        let response = await fetch(url, options);

        if (response.status === 200) {
            response = await response.json();
            setChat(response.content.chats);
        }
    };

    useEffect(() => {
        getChat();
    }, []);

    return (
        <>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Sohbet
            </Typography>
            <Paper>
                <Box p={2}>
                    <Grid container direction="row">
                        <Grid item xs={10}>
                            <Paper className={classes.messageArea}>
                                <Box p={2}>
                                    {chat.map(messageObj => {
                                        return (
                                            <Paper key={messageObj._id} className={messageObj.from === user.username ? classes.rightMessage : classes.leftMessage}>
                                                {messageObj.message}
                                            </Paper>)
                                    })}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={2}>
                        <Grid container direction="row">
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Mesaj"
                                    style={{ marginTop: 8 }}
                                    placeholder="..."
                                    fullWidth
                                    multiline
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<SendIcon />}
                                >
                                    Gönder
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default Chat;
