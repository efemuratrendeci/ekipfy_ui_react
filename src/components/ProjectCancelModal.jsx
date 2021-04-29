import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const ProjectCancelModal = ({ open, handleClose, handleCloseProject, project_id }) => {

    const cancelProjectRequest = async () => {
        let token = localStorage.getItem("token");
        const body = {
            _id: project_id,
            is_active: false,
            is_canceled: true,
            closed_reason: "İptal"
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

        if (response.status === 200) {
            response = await response.json();

            return response.content;
        }
    };

    const handleCancelProject = () => {
        cancelProjectRequest();
        handleClose();
        handleCloseProject();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                style={{ width: "100%" }}
            >
                <Typography color="secondary"
                    style={{
                        margin: "0.8rem 1.5rem",
                        fontSize: 20,
                    }}
                >
                    Projeyi iptal etmek üzeresiniz
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
                <DialogContentText id="alert-dialog-description">
                    Onaylamanız durumunda proje kapama nedeni iptal olarak kaydedilerek kapatılacaktır.
                    Bu eylem geri alınamaz.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelProject} color="secondary" endIcon={<CancelIcon />}>
                    projeyi iptal et
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectCancelModal
