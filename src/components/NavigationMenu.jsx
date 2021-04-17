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

const actions = [
    { icon: <BarChartIcon />, name: "Raporlar" },
    { icon: <DescriptionIcon />, name: "Projeler" },
    { icon: <AssignmentIndIcon />, name: "Ekibim" },
    { icon: <PeopleIcon />, name: "Müşteriler" },
    { icon: <CategoryIcon />, name: "Kategoriler" },
];

const NavigationMenu = ({ anchorEl, handleClose, open }) => {
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
            {actions.map((action) => (
                <Grid key={action.name} container>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>{action.icon}</ListItemIcon>
                        <Typography variant="inherit" noWrap>
                            {action.name}
                        </Typography>
                    </MenuItem>
                </Grid>
            ))}
        </Menu>
    );
};

export default NavigationMenu;
