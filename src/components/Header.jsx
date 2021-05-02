import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NavigationMenu from './NavigationMenu';
import { useState } from "react";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from "@material-ui/core/Typography";


const Header = ({ user, theme, themePref, verifyJWT }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleThemeSwitch = () => {
        theme(!themePref);
    };

    return (
        <>
            <div className="navbar d-flex">
                {user.is_manager ? (
                    <img src="./ekipfy-manager.png" className="ekipfy-brand" alt=""></img>
                ) : (
                    <img src="./ekipfy.png" className="ekipfy-brand" alt=""></img>
                )}
                <Typography variant="overline" style={{ fontSize: 16, padding: '0 1rem', borderLeft: '5px solid dodgerblue', borderRight: '5px solid mediumseagreen', borderRadius: 50 }} display="block" gutterBottom>
                    {user.fullname.length === 0 ? user.username : user.fullname}
                </Typography>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={themePref}
                                onChange={handleThemeSwitch}
                                name="theme"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                label="Tema"
                            />
                        }
                        label="Tema"
                    />
                    <IconButton
                        aria-label="more"
                        aria-controls="nav-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MenuOpenIcon />
                    </IconButton>
                    <NavigationMenu
                        anchorEl={anchorEl}
                        open={open}
                        handleClose={handleClose}
                        verifyJWT={verifyJWT} />
                </div>

            </div>
        </>
    );
};

export default Header;
