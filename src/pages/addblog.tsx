import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import {
    DatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: 24
        },
        button: {
            margin: theme.spacing(1),
        },
        date: {
            width: "100%"
        },
        textField: {
            width: "100%",
        },
    }),
);

interface State {
    title: string;
    date: any;
    content: string;
}

export default function Addblog() {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        title: '',
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        content: '',
    });

    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleDateChange = (date: any) => {
        setValues({ ...values, date: date });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.persist();
        console.log(values)
    }


    return (
        <div className="add-blog-page">
            <Paper>
                <form className={classes.container} noValidate autoComplete="off">
                    <Typography variant="h6" component="h6" color="primary">Add Blog</Typography>
                    <Grid container spacing={2}>
                        <Grid xs={6} md={6} item><TextField
                            id="blog-title"
                            label="Title"
                            className={classes.textField}
                            value={values.title}
                            onChange={handleChange('title')}
                            margin="normal"
                            variant="outlined"
                        /></Grid>
                        <Grid item xs={6} md={6}><MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <DatePicker
                                    margin="normal"
                                    openTo="year"
                                    format="dd/MM/yyyy"
                                    inputVariant="outlined"
                                    className={classes.date}
                                    label="Date of birth"
                                    views={["year", "month", "date"]}
                                    value={values.date}
                                    onChange={handleDateChange}
                                /></Grid>
                        </MuiPickersUtilsProvider></Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                id="blog-content"
                                label="Content"
                                multiline
                                rows="10"
                                defaultValue=""
                                onChange={handleChange('content')}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={12} md={12} item>
                            <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                </form></Paper></div>
    );
}