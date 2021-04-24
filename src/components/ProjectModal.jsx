import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useState, useEffect } from 'react'

const ProjectModal = ({ handleClose, open, project }) => {
    const [isPreProject, setIsPreProject] = useState(project.is_pre_project ? true : false);
    const [isInternal, setIsInternal] = useState(project.is_internal ? true : false);

    useEffect(() => {
        setIsInternal(project.is_internal);
        setIsPreProject(project.is_pre_project);
    }, [project])

    if (project && Object.keys(project).length === 0 && project.constructor === Object)
        return (
            <></>
        )

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
                aria-labelledby="form-dialog-title"
            >
                <Typography style={{ color: 'orange', margin: '1.5rem 1.5rem 0.5rem 1.5rem', fontSize: 26 }}>{project.customer.name} {project.title}</Typography>
                <DialogContent>
                    <DialogContentText>
                        {project.status_history.length === 0 ? '' : `${project.category.name} kategorisine ait projenin son güncellemesi ${new Date(
                            project.status_history.reverse()[0]?.status_date
                        ).toLocaleDateString()} tarihinde ${project.status_history.reverse()[0]?.username} tarafından girildi: ${project.status_history.reverse()[0]?.status}`}
                    </DialogContentText>
                    <Grid container spacing={1}>
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="title"
                                label="Proje Adı"
                                variant="outlined"
                                value={project.title}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="price"
                                label="Fiyat"
                                variant="outlined"
                                value={new Intl.NumberFormat().format(project.price)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="effort_day"
                                label="Efor"
                                variant="outlined"
                                value={Math.floor(project.effort_min / 480)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="contact"
                                label="Görüşülecek Kişi"
                                variant="outlined"
                                value={project.contact_name}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="deathline"
                                label="Termin Tarihi"
                                type="date"
                                variant="outlined"
                                value={new Date(project.deathline_actual).toISOString().split('T')[0]}
                            />
                        </Grid>
                    </Grid >
                    <FormControlLabel
                        control={<Checkbox icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckCircleIcon style={{ color: 'mediumseagreen' }} />} name="is_pre_project" checked={isPreProject} onChange={() => setIsPreProject(!isPreProject)} />}
                        label="Proje adayı"
                    />
                    <FormControlLabel
                        control={<Checkbox icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckCircleIcon style={{ color: 'mediumseagreen' }} />} name="is_pre_project" checked={isInternal} onChange={() => setIsInternal(!isInternal)} />}
                        label="Dahili Proje"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        proje iptal
                        </Button>
                    <Button onClick={handleClose}>
                        tamamlandı
                        </Button>
                    <Button onClick={handleClose} color="primary">
                        kaydet
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default ProjectModal
