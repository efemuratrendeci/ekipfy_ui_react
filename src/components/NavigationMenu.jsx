import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const NavigationMenu = ({ anchorEl, handleClose, open, verifyJWT }) => {
    const logOut = () => {
        localStorage.removeItem('token');
        verifyJWT();
    }
    return (
        <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    marginTop: 50,
                },
            }}
        >
            <Grid container>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><BarChartIcon /></ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Raporlar
                    </Typography>
                </MenuItem>
            </Grid>
            <Grid container>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><DescriptionIcon /></ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Proje
                    </Typography>
                </MenuItem>
            </Grid>
            <Grid container>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Ekibim
                    </Typography>
                </MenuItem>
            </Grid>
            <Grid container>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Müşteriler
                    </Typography>
                </MenuItem>
            </Grid>
            <Grid container>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Kategoriler
                    </Typography>
                </MenuItem>
            </Grid>
            <Grid container>
                <MenuItem onClick={logOut}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Çıkış
                    </Typography>
                </MenuItem>
            </Grid>
        </Menu>
    );
};

export default NavigationMenu;
