import { useState, useEffect, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const COLORS = ['mediumseagreen', '#A52A2A', '#6495ED', '#8B008B', '#2F4F4F', 'pink', 'orange', 'dodgerblue', 'Tomato', 'Tan', 'Teal']

const useStyles = makeStyles((theme) => ({
    leftMessage: {
        margin: theme.spacing(1),
        color: "white",
        padding: theme.spacing(1),
        float: "left",
        maxWidth: "15rem",
        minWidth: "12rem",
    },
    rightMessage: {
        margin: theme.spacing(1),
        color: "white",
        padding: theme.spacing(1),
        float: "right",
        maxWidth: "15rem",
        minWidth: "12rem",
    },
    rightMessageContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
    leftMessageContainer: {
        display: "flex",
        justifyContent: "flex-start"
    },
    messageArea: {
        width: "100%",
        height: "30rem",
        padding: theme.spacing(2),
        overflowY: "scroll",
        position: "relative"
    },
    margin: {
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2),
    },
    fullWidth: {
        width: "100%"
    },
    activeUser: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(0.25),
        color: "mediumseagreen",
        border: "1px solid mediumseagreen",
        borderRadius: "20px",
        textAlign: "center",
    }
}));

const Chat = ({ user, socket }) => {
    const classes = useStyles();
    const messageEl = useRef(null);
    const [chatScroll, setChatScroll] = useState(false);
    const [chat, setChat] = useState([]);
    const [userColors, setUserColors] = useState(new Map());
    const [message, setMessage] = useState({});
    const [messageValue, setMessageValue] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);

    const getChat = async () => {
        let token = localStorage.getItem("token");

        const options = {
            method: "GET",
            timeout: 2000,
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

    const sendMessage = async () => {
        setChatScroll(true);
        let token = localStorage.getItem("token");

        const options = {
            method: "POST",
            timeout: 2000,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...message
            })
        },
            url = `http://localhost:8080/common/message`;

        let response = await fetch(url, options);

        setMessage({});
        setMessageValue("");

        if (response.status !== 201) {
            throw new Error('Mesaj Gönderilemedi')
        }
    }

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: chatScroll ? 'auto' : 'smooth' });
            });
        }

    }, [chatScroll]);

    useEffect(() => {
        getChat();
    }, []);

    useEffect(() => {
        socket.on('active_users', (_user) => {
            setActiveUsers(_user);
        });

        socket.on('new_message', (message) => {
            let _chat = [...chat];
            _chat.push(message);

            setChat(_chat);
        });
    });

    useEffect(() => {

        chat.forEach(message => {
            !userColors.get(message.from) && userColors.set(message.from, COLORS[Math.ceil(Math.random() * 10)]);
        });

        user.username && userColors.set(user.username, COLORS[0]);

        let map = new Map(userColors)

        setUserColors(map);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat, user.username])

    return (
        <>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Sohbet
            </Typography>
            <Paper>
                <Box p={2}>
                    <Grid container direction="row">
                        <Grid item xs={10}>
                            <Box className={classes.messageArea} ref={messageEl}>
                                {chat.map(messageObj => {
                                    return (
                                        <Box key={`${messageObj.from}${messageObj.date}`} className={messageObj.from === user.username ? classes.rightMessageContainer : classes.leftMessageContainer}>
                                            <Paper style={{ backgroundColor: userColors.get(messageObj.from) }} className={messageObj.from === user.username ? classes.rightMessage : classes.leftMessage}>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="caption" display="block" gutterBottom>
                                                        {messageObj.from}
                                                    </Typography>
                                                    <Typography variant="caption" display="block" gutterBottom>
                                                        {new Date(messageObj.date).toLocaleDateString()} {new Date(messageObj.date).toLocaleTimeString()}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="subtitle1" display="block" gutterBottom>
                                                    {messageObj.message}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box pl={4} mb={3}>
                                <Typography variant="caption" display="block" gutterBottom >
                                    Aktif Kullanıcılar
                                </Typography>
                            </Box>

                            {activeUsers.map(username => {
                                return (
                                    <Typography key={`au-${username}`} variant="subtitle1" display="block" gutterBottom className={classes.activeUser}>
                                        {username}
                                    </Typography>)
                            })}
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
                                    onChange={(e) => {
                                        setMessage({ message: e.target.value, from: user.username, date: new Date() });
                                        setMessageValue(e.target.value)
                                    }}
                                    value={messageValue}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<SendIcon />}
                                    onClick={sendMessage}
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
