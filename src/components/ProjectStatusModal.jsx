import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import DialogContent from "@material-ui/core/DialogContent";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from "react";

const theme = createMuiTheme({
    overrides: {
        MuiTimelineItem: {
            missingOppositeContent: {
                "&:before": {
                    display: "none"
                }
            },
        },
    },
});

const ProjectSummaryModal = ({ open, handleClose, status, project_id }) => {
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleChange = (e) => {
        setStatusMessage(e.target.value)
    }

    const sendStatus = async () => {
        try {
            let token = localStorage.getItem("token");
            const body = {
                _id: project_id,
                status_history: {
                    status: statusMessage,
                    status_date: new Date()
                }
            }

            const options = {
                method: "PATCH",
                timeout: 1000,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            },
                url = `${process.env.REACT_APP_API_URL}/common/project`;

            let response = await fetch(url, options);

            if (response.status === 201) {
                let res = await response.json();

                setSuccess('Başarılı');
                setStatusMessage('');

                return res.content;
            }

            setError(`StatusCode : ${response.status}`)

        } catch (error) {
            setError(error.message)
        }
    }

    const handleRemoveError = () => {
        setError('');
    };

    const handleRemoveSuccess = () => {
        setSuccess('');
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
                aria-labelledby="form-dialog-project">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                >
                    <Typography
                        style={{
                            color: "orange",
                            margin: "0.8rem 1.5rem",
                            fontSize: 16,
                        }}
                    >
                        Proje Durum Tarihçesi
                </Typography>
                    <div>
                        <Tooltip title="Kapat" aria-label="close">
                            <IconButton color="secondary" component="span" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
                <DialogContent>
                    <Paper style={{
                        maxHeight: "30rem",
                        overflowY: "scroll",
                        marginBottom: "1rem"
                    }}>
                        <ThemeProvider theme={theme}>
                            <Timeline>
                                {status.map((stat, index) => (
                                    <TimelineItem key={index}>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary" />
                                            {index + 1 === status.length ? '' : <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                style={{ width: "100%" }}>
                                                <Typography
                                                    style={{
                                                        fontSize: 20,
                                                    }}
                                                >
                                                    {stat.status}
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: 14,
                                                        color: 'grey'
                                                    }}
                                                >
                                                    {stat.username}:{new Date(stat.status_date).toLocaleDateString()}
                                                </Typography>
                                            </Box>

                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </ThemeProvider>
                    </Paper>
                    <Box display="flex"
                        justifyContent="space-between"
                        style={{ width: "100%" }}>
                        <TextField
                            margin="dense"
                            id="status"
                            label="Son Durumu Yazın"
                            variant="outlined"
                            value={statusMessage}
                            onChange={handleChange}
                            fullWidth
                            autoFocus
                        />
                        <Button style={{ marginLeft: "1rem" }} onClick={sendStatus} color="primary" endIcon={<SendIcon />}>
                            Gönder
                        </Button>
                    </Box>

                </DialogContent>
            </Dialog>
            {error ? (
                <Snackbar
                    open={error ? true : false}
                    autoHideDuration={6000}
                    onClose={handleRemoveError}
                >
                    <Alert onClose={handleRemoveError} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            ) : (
                " "
            )}
            {success ? (
                <Snackbar
                    open={success ? true : false}
                    autoHideDuration={6000}
                    onClose={handleRemoveSuccess}
                >
                    <Alert onClose={handleRemoveSuccess} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            ) : (
                " "
            )}
        </>

    )
}

export default ProjectSummaryModal
