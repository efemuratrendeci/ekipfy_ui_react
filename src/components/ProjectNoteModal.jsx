import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useState, useEffect } from "react";

const ProjectNotesModal = ({ handleClose, open, note, project_id }) => {
    const [projectNote, setProjectNote] = useState(note ? note : '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setProjectNote(note ? note : '')
    }, [note])

    const handleChange = (e) => {
        setProjectNote(e.target.value);
    }

    const sendNote = async () => {
        try {
            let token = localStorage.getItem("token");
            const body = {
                _id: project_id,
                project_note: projectNote
            }

            const options = {
                method: "PUT",
                timeout: 1000,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            },
                url = `${process.env.REACT_APP_API_URL}/manager/project`;

            let response = await fetch(url, options);

            if (response.status === 201) {
                response = await response.json();

                setSuccess('Başarılı');

                return response.content;
            }

            setError('Somethings went wrong')

        } catch (error) {
            setError(error.message)
        }

    };

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
                        Not
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
                        height: "20rem"
                    }}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            fullWidth
                            rows={15}
                            value={projectNote}
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={sendNote} color="primary">
                        Kaydet
                    </Button>
                </DialogActions>
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

export default ProjectNotesModal
