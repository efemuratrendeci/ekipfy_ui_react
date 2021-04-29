import Grid from "@material-ui/core/Grid";
import Zoom from '@material-ui/core/Zoom';
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";

const Loading = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setShow(!show);
        }, 500)
    }, [show])


    return (
        <Grid container
            justify="center"
            alignItems="center"
            style={{ height: '100vh' }}
        >
            <Zoom in={show}>
                <Paper style={{ width: '50px', height: '50px', backgroundColor: 'mediumseagreen', borderRadius: '50px', margin: '0.2rem' }}>
                </Paper>
            </Zoom>

            <Zoom in={!show} >
                <Paper style={{ width: '50px', height: '50px', backgroundColor: 'orange', borderRadius: '50px', margin: '0.2rem' }}>
                </Paper>
            </Zoom>

            <Zoom in={show} >
                <Paper style={{ width: '50px', height: '50px', backgroundColor: 'dodgerblue', borderRadius: '50px', margin: '0.2rem' }}>
                </Paper>
            </Zoom>

        </Grid>

    )
}

export default Loading
