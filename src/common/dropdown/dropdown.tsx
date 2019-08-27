import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      float: "right"
    },
    formControl: {
      minWidth: 150,
      marginBottom: 24,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Dropdown = (props: any) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    author: "",
  });
  let category = decodeURIComponent(props.category)
  useEffect(() => {
    setValues({ author: category })
  }, [category])

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
    props.history.push("/category/" + event.target.value)
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="author">Author</InputLabel>
        <Select
          value={values.author}
          onChange={handleChange}
          inputProps={{
            name: 'author',
            id: 'author',
          }}
        >
          {props.categories.map((category: string, index: any) => {
            if (category !== "GTAC")
              return <MenuItem key={index} value={category}>{category}</MenuItem>
            return ""
          })}
        </Select>
      </FormControl>
    </form>
  );
}

export default withRouter(Dropdown);