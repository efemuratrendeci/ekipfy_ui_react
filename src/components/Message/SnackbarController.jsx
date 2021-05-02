import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useState } from "react";

const SnackbarController = ({ outerOpen, severity, message, duration }) => {
    const [open, setOpen] = useState(outerOpen);

    const handleRemoveSnackbar = () => {
        setOpen(false);
    }

    return open ? (
        <Snackbar
            open={open}
            autoHideDuration={duration === 0 ? null : 5000}
            onClose={handleRemoveSnackbar}>
            <Alert onClose={handleRemoveSnackbar} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    ) : ('')
}

export default SnackbarController
