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
import DoneIcon from '@material-ui/icons/Done';
import Typography from "@material-ui/core/Typography";

const ProjectCloseModal = ({ open, handleClose, handleCloseProject, project_id }) => {

    const doneProjectRequest = async (closedReason) => {
        let token = localStorage.getItem("token");
        const body = {
            _id: project_id,
            is_active: false,
            closed_reason: closedReason
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

    const handleDoneProject = (reason) => {
        doneProjectRequest(reason);
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
                    Projeyi kapatmak üzeresiniz
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
                    Onaylamanız durumunda proje kapatılacaktır. Olumlu veya Olumsuz olarak projeyi kapatabilirsiniz.
                    Bu eylem geri alınamaz.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button name="Olumsuz" onClick={() => handleDoneProject("Olumsuz")} color="secondary" endIcon={<CancelIcon />}>
                    olumsuz
                </Button>
                <Button name="Olumlu" onClick={() => handleDoneProject("Olumlu")} color="primary" endIcon={<DoneIcon />}>
                    olumlu
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectCloseModal
