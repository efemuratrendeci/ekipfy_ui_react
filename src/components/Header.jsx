import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NavigationMenu from './NavigationMenu';
import { useState } from "react";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Header = ({ user, theme, themePref }) => {
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
                        handleClose={handleClose} />
                </div>

            </div>
        </>
    );
};

export default Header;
