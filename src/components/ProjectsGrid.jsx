import { useState, useEffect } from "react";
import {
    DataGrid,
    GridToolbarContainer,
    GridColumnsToolbarButton,
    GridFilterToolbarButton,
    GridToolbarExport,
} from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ProjectModal from "./ProjectModal"

const columns = [
    { field: "title", headerName: "Başlık", width: 200 },
    { field: "customer_name", headerName: "Müşteri", width: 130 },
    { field: "category_name", headerName: "Kategori", width: 130 },
    {
        field: "deathline_actual",
        headerName: "Termin",
        type: "date",
        width: 130,
    },
    { field: "members", headerName: "Sorumlular", width: 130 },
    {
        field: "status_date",
        headerName: "SD Tarihi",
        type: "date",
        width: 130,
    },
    { field: "status", headerName: "Son Durum", width: 800 },
];

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
});

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridColumnsToolbarButton />
            <GridFilterToolbarButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

const ProjectsGrid = () => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [projects, setProjects] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [project, setProject] = useState({});
    const [open, setOpen] = useState(false);
    const [reRender, setReRender] = useState(false);

    const handleClickOpen = (id) => {
        setOpen(true);
        setProject(projects.filter(x => x._id.toString() === id)[0]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getProjects = async () => {
        let token = localStorage.getItem("token");

        const options = {
            method: "GET",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
            url = `http://localhost:8080/common/projects?is_active=true`;

        let response = await fetch(url, options);

        if (response.status === 200) {
            response = await response.json();

            return response.content;
        }
    };

    const reRenderGrid = () => {
        setReRender(!reRender);
    }

    useEffect(() => {
        getProjects().then((content) => {
            const _rows = [];

            content.projects.forEach((project) => {
                _rows.push({
                    id: project._id,
                    title: project.title,
                    customer_name: project.customer.name,
                    category_name: project.category.name,
                    deathline_actual: new Date(
                        project.deathline_actual
                    ).toLocaleDateString(),
                    members: project.project_members
                        .map((x) => {
                            return x.username;
                        })
                        .join(","),
                    status:
                        project.status_history.length === 0
                            ? "Not Yok"
                            : project.status_history.slice(-1).pop().status,
                    status_date:
                        project.status_history.length === 0
                            ? new Date("1967-08-02")
                            : new Date(
                                project.status_history.slice(-1).pop().status_date
                            ).toLocaleDateString(),
                });
            });

            setRows(_rows);
            setProjects(content.projects);
            setUsernames(content.usernames);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        });
    }, [reRender]);

    return (
        <div className={classes.root}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Projeler
            </Typography>
            <Paper>
                <div style={{ height: 500, width: "100%" }}>
                    <DataGrid
                        onRowClick={(e) => handleClickOpen(e.id)}
                        rows={rows}
                        columns={columns}
                        pageSize={100}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    />
                </div>
            </Paper>
            <ProjectModal handleClose={handleClose} open={open} project={project} usernames={usernames} reRender={reRenderGrid} />
        </div>
    );
};

export default ProjectsGrid;
