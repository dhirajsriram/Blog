import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import {
    DatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router';

interface State {
    title: any;
    date: any;
    content: any;
    author: any;
    submitted: boolean
}

const Addblog = (props: any) => {

    const [values, setValues] = React.useState<State>({
        title: true,
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        content: true,
        author: true,
        submitted: false
    });

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                padding: 24
            },
            checkmarkImg:{
                display:props.submitted?"block":"none"
            },
            button: {
                margin: theme.spacing(1),
            },
            date: {
                width: "100%"
            },
            success:{
                paddingTop:"10%",
                paddingBottom:"10%",
            },
            successMsg :{
                marginTop:"20px",
                fontWeight:100
            },
            textField: {
                width: "100%",
            },
        }),
    );
    const classes = useStyles();
    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleDateChange = (date: any) => {
        setValues({ ...values, date: date });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.persist();
        let blogObj = {
            "kind": "blogger#post",
            "id": (Math.floor(Math.random() * (999999999999999999 - 100000000000000000 + 1)) + 100000000000000000).toString(),
            "published": values.date.toString(),
            "title": values.title,
            "content": values.content,
            "labels": [values.author],
            "label": [values.author],
            "author": {
                "displayName": values.author,
            },
        }
        props.addBlog(blogObj)
        setValues({ ...values, submitted: true })
        setTimeout(() => {
            props.history.push("/")
        }, 1500);
    }


    return (
        <div className="add-blog-page">
            <Paper>
                {!values.submitted ?
                    <form className={classes.container} noValidate autoComplete="off">
                        <Typography variant="h6" component="h6" color="primary">Add Blog</Typography>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={12} item><TextField
                                id="blog-title"
                                label="Title"
                                required={true}
                                error={values.title ? undefined : true}
                                className={classes.textField}
                                defaultValue=""
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
                            <Grid item xs={6} md={6}>
                                <TextField
                                    id="blog-author"
                                    label="Author"
                                    error={values.author ? undefined : true}
                                    className={classes.textField}
                                    defaultValue=""
                                    onChange={handleChange('author')}
                                    margin="normal"
                                    variant="outlined"
                                    required={true}
                                /></Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="blog-content"
                                    label="Content"
                                    error={values.content ? undefined : true}
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
                                <Button disabled={values.author && values.content && values.date && values.title ? undefined : true} onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
                                    SUBMIT
                            </Button>
                            </Grid>
                        </Grid>
                    </form> :
                    <Typography align="center" className={classes.success}>
                        <img src={require("../assets/checkmark.gif")} alt="checkmark-gif" />
                        <Typography className={classes.successMsg} variant="h5" component="h5">Blog added, Redirecting to home page</Typography>
                    </Typography>}</Paper></div>
    );
}

export default withRouter(Addblog) 