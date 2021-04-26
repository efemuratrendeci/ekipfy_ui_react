import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { generateRandomColorHex } from "../helpers/css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    item: {
        width: '13rem',
        margin: 'auto'
    },
    info: {
        backgroundColor: "#001f3f",
    },
    content: {
        fontSize: 36,
        color: "pink",
    },
    description: {
        fontSize: 16,
        color: 'white'
    },
    price: {
        color: 'mediumseagreen'
    },
    pie: {
        margin: 'auto'
    }
});

const GiroChart = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const COLORS = useRef([]);
    const [period, setPeriod] = useState(0);

    const getCategories = async () => {
        let token = localStorage.getItem("token");

        const options = {
            method: "GET",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
            url = `${process.env.REACT_APP_API_URL}/manager/category_summary?top=5`;

        let response = await fetch(url, options);

        if (response.status === 200) {
            response = await response.json();

            response.content.categories.forEach((category) => {
                COLORS.current.push(generateRandomColorHex());
            });

            setCategories(response.content.categories);
            setPeriod(response.content.period);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Paper>
            <Grid container direction="row">
                <PieChart width={300} height={300} className={classes.pie}>
                    <Tooltip />
                    <Legend />
                    <Pie dataKey="price" data={categories} fill="#8884d8">
                        {categories.map((category, index) => (
                            <Cell
                                key={`cell-${category.name}`}
                                fill={COLORS.current[index]}
                            />
                        ))}
                    </Pie>
                </PieChart>
                <Box mt={6} mr={2} className={classes.item}>
                    <Card className={classes.info}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                component="h6"
                                color="textSecondary"
                                gutterBottom
                                className={classes.content}
                            >
                                {categories[0]?.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                color="textSecondary"
                                gutterBottom
                                className={classes.description}
                            >
                                <strong className={classes.price}>{isNaN(categories[0]?.price) ? 0 : new Intl.NumberFormat().format(categories[0]?.price)} TL</strong> ile <br />{period}. dönemin en iyi kategorisi
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Paper>
    );
};

export default GiroChart;
