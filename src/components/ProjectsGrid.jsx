import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";

const useStyles = makeStyles({
    root: {
        margin: 20,
    },
    item: {
        textAlign: "center",
    },
});

const columns = [
    { field: "title", headerName: "Başlık", width: 130 },
    { field: "customer_name", headerName: "Müşteri", width: 130 },
    { field: "category_name", headerName: "Kategori", width: 130 },
    {
        field: "deathline_actual",
        headerName: "Termin",
        type: "date",
        width: 130,
    },
];

const ProjectsGrid = () => {
    const classes = useStyles();
    const [projects, setProject] = useState([]);
    const [rows, setRows] = useState([]);
    const [isProjectsFilled, setIsProjectsFilled] = useState(false);

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

            setProject(response.content.projects);

            console.log(response.content.projects);
            console.log(projects)
        }
    };

    useEffect(() => {
        getProjects();

        projects.map((project) => {
            setRows([...rows, { id: project._id, title: project.title, customer_name: project.customer.name, category_name: project.category.name, deathline_actual: project.deathline_actual }])
        });
    }, []);

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
};

export default ProjectsGrid;
