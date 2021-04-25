import { useState, useEffect } from "react";
import { BarChart, Bar, Tooltip, XAxis, YAxis } from "recharts";
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
    bar: {
        margin: 'auto'
    }
});

const GiroChart = () => {
    const classes = useStyles();
    const [customer, setCustomer] = useState({});
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
            url = `http://localhost:8080/manager/customer_summary?top=3`;

        let response = await fetch(url, options);

        if (response.status === 200) {
            response = await response.json();

            setCustomer(response.content.customer);
            setPeriod(response.content.period);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Paper>
            <Grid container direction="row">
                <Box pt={2} className={classes.bar}>
                    <BarChart width={300} height={285} data={customer.projects}>
                        <Tooltip />
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Bar dataKey="price" fill="orange" />
                    </BarChart>
                </Box>

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
                                {customer.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                color="textSecondary"
                                gutterBottom
                                className={classes.description}
                            >
                                <strong className={classes.price}>{isNaN(customer.giro) ? 0 : new Intl.NumberFormat().format(customer.giro)} TL</strong> ile <br />{period}. dönemin en iyi müşterisi
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Paper>
    );
};

export default GiroChart;
