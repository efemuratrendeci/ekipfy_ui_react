import { useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@material-ui/lab";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CategoryIcon from '@material-ui/icons/Category';
import DescriptionIcon from '@material-ui/icons/Description';

const actions = [
  { icon: <HomeIcon />, name: 'Ev' },
  { icon: <BarChartIcon />, name: 'Raporlar' },
  { icon: <DescriptionIcon />, name: 'Projeler' },
  { icon: <AssignmentIndIcon />, name: 'Ekibim' },
  { icon: <PeopleIcon />, name: 'Müşteriler' },
  { icon: <CategoryIcon />, name: 'Kategoriler' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="Menu"
          className={classes.speedDial}
          icon={<SpeedDialIcon openIcon={<ClearIcon />} />}
          onClick={open ? handleClose : handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div>
    </>);
};

Header.defaultProps = {
  isLogin: false
}

export default Header;
