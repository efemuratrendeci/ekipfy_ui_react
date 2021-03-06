import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import HistoryIcon from '@material-ui/icons/History';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import ProjectStatusModal from './ProjectStatusModal';
import ProjectNoteModal from './ProjectNoteModal';
import ProjectCancelModal from './ProjectCancelModal';
import ProjectDoneModal from './ProjectDoneModal';
import Chip from '@material-ui/core/Chip';
import InputBase from '@material-ui/core/InputBase';
import { useState, useEffect } from "react";

const ProjectModal = ({ handleClose, open, project, usernames }) => {
    const [body, setBody] = useState({ ...project });
    const [statusOpen, setStatusOpen] = useState(false);
    const [noteOpen, setNoteOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [doneOpen, setDoneOpen] = useState(false);

    const handleClickOpenStatus = () => {
        setStatusOpen(true);
    };

    const handleCloseStatus = () => {
        setStatusOpen(false);
    };

    const handleClickOpenNote = () => {
        setNoteOpen(true);
    };

    const handleCloseNote = () => {
        setNoteOpen(false);
    };

    const handleClickOpenCancel = () => {
        setCancelOpen(true);
    };

    const handleCloseCancel = () => {
        setCancelOpen(false);
    };

    const handleClickOpenDone = () => {
        setDoneOpen(true);
    };

    const handleCloseDone = () => {
        setDoneOpen(false);
    };

    useEffect(() => {
        setBody({ ...project });
    }, [project]);


    const handleChange = (e) => {
        const newBody = { ...body };
        e.target.id === 'effort_min' ? newBody[e.target.id] = Number(e.target.value) * 480 : newBody[e.target.id] = e.target.value;

        setBody(newBody);
    }

    const handleMemberChange = (e) => {
        const newBody = { ...body };

        if (e.target.checked) {
            newBody.project_members.push({ username: e.target.name });
        } else {
            newBody.project_members = newBody.project_members?.filter(member => member.username !== e.target.name);
        }

        setBody(newBody);
    }

    const handleDeleteTag = (e) => {

    }

    if (
        body &&
        Object.keys(body).length === 0 &&
        body.constructor === Object
    )
        return <></>;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="form-dialog-project"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                >
                    <Typography
                        style={{
                            color: "orange",
                            margin: "1.5rem 1.5rem 0.5rem 1.5rem",
                            fontSize: 26,
                        }}
                    >
                        {body.customer.name} {body.title}
                    </Typography>
                    <div>
                        <Tooltip title="Proje Notu" aria-label="note">
                            <IconButton color="primary" component="span" style={{ margin: "1rem 0.2rem" }} onClick={handleClickOpenNote}>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Proje Durum Ge??mi??i" aria-label="history">
                            <IconButton color="primary" component="span" style={{ margin: "1rem 0.2rem" }} onClick={handleClickOpenStatus}>
                                <HistoryIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Kapat" aria-label="close">
                            <IconButton color="secondary" component="span" style={{ margin: "1rem 0.2rem" }} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>

                <DialogContent>
                    <DialogContentText>
                        {body.status_history.length === 0
                            ? ""
                            : `${body.category.name
                            } kategorisine ait projenin son g??ncellemesi ${new Date(
                                body.status_history[body.status_history.length - 1]?.status_date
                            ).toLocaleDateString()} tarihinde ${body.status_history[body.status_history.length - 1]?.username
                            } taraf??ndan girildi: ${body.status_history[body.status_history.length - 1]?.status
                            }`}
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                style={{ width: "100%" }}
                            >
                                <TextField
                                    margin="dense"
                                    id="title"
                                    label="Proje Ad??"
                                    variant="outlined"
                                    value={body.title}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="price"
                                    label="Fiyat"
                                    variant="outlined"
                                    value={new Intl.NumberFormat().format(body.price)}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                style={{ width: "100%" }}
                            >
                                <TextField
                                    margin="dense"
                                    id="effort_min"
                                    label="Efor"
                                    variant="outlined"
                                    value={Math.floor(body.effort_min / 480)}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="dense"
                                    id="contact_name"
                                    label="G??r??????lecek Ki??i"
                                    variant="outlined"
                                    value={body.contact_name}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box style={{ width: "100%" }}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="deathline_actual"
                                    label="Termin Tarihi"
                                    type="date"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={
                                        body.deathline_actual && new Date(body.deathline_actual)
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                />
                            </Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon />}
                                        checkedIcon={
                                            <CheckCircleIcon style={{ color: "mediumseagreen" }} />
                                        }
                                        name="is_pre_project"
                                        checked={body.is_pre_project}
                                        onChange={handleChange}
                                    />
                                }
                                label="Proje aday??"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon />}
                                        checkedIcon={
                                            <CheckCircleIcon style={{ color: "mediumseagreen" }} />
                                        }
                                        name="is_pre_project"
                                        checked={body.is_internal}
                                        onChange={handleChange}
                                    />
                                }
                                label="Dahili Proje"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper
                                style={{
                                    marginTop: "0.3rem",
                                    padding: "1rem",
                                    overflowY: "scroll",
                                    width: "100%",
                                    height: "8rem"
                                }}
                            >
                                {usernames.map((name) => (
                                    <FormControlLabel
                                        key={name}
                                        control={
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon />}
                                                checkedIcon={
                                                    <CheckCircleIcon
                                                        style={{ color: "mediumseagreen" }}
                                                    />
                                                }
                                                name={name}
                                                checked={body.project_members ? body.project_members.some(x => x.username === name) : false}
                                                onChange={handleMemberChange}
                                            />
                                        }
                                        label={name}
                                    />
                                ))}
                            </Paper>
                            <br />
                            {body.tags.map(tag => (
                                <Chip color="primary" onDelete={() => { }} label={tag} />))}
                            <Box style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <InputBase style={{ height: '3rem', width: '80%' }} placeholder="Tag ekleyin" />
                                <IconButton color="primary" onClick={handleClose}>
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickOpenCancel} color="secondary">
                        proje iptal
                    </Button>
                    <Button onClick={handleClickOpenDone}>tamamland??</Button>
                    <Button onClick={handleClose} color="primary">
                        kaydet
                    </Button>
                </DialogActions>
            </Dialog>
            <ProjectStatusModal open={statusOpen} handleClose={handleCloseStatus} status={body.status_history} project_id={project._id} />
            <ProjectNoteModal open={noteOpen} handleClose={handleCloseNote} note={body.project_note} project_id={project._id} />
            <ProjectCancelModal open={cancelOpen} handleClose={handleCloseCancel} handleCloseProject={handleClose} project_id={project._id} />
            <ProjectDoneModal open={doneOpen} handleClose={handleCloseDone} handleCloseProject={handleClose} project_id={project._id} />
        </div>
    );
};

export default ProjectModal;
