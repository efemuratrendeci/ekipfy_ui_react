import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NavigationMenu from './NavigationMenu';
import { useState } from "react";

const Header = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="navbar d-flex">
                {user.is_manager ? (
                    <img src="./ekipfy-manager.png" className="ekipfy-brand" alt=""></img>
                ) : (
                    <img src="./ekipfy.png" className="ekipfy-brand" alt=""></img>
                )}
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
        </>
    );
};

export default Header;
