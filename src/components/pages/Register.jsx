// https://github.com/mui/material-ui/blob/master/docs/src/pages/premium-themes/onepirate/SignUp.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/auth';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from '../other/Copyright';
import useStyles from '../../utils/formStyles';
import { MenuItem } from '@material-ui/core';

const Register = () => {
  const roles = [
    {
      value: 1,
      label: 'Developer',
    },
    {
      value: 2,
      label: 'Admin',
    },
    {
      value: 3,
      label: 'Staff',
    },
    {
      value: 4,
      label: 'HR',
    },
  ]
  const classes = useStyles();

  const [signedUp, setsignedUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role_id: 1
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'CodeCorners PMA| Sign Up';
  }, []);

  const { name, email, password, password2, role_id } = formData;

  const onChange = (e) => {
    // console.log(formData)
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("The entered passwords do not match")
    } else {
      dispatch(register( name, email, password, role_id ));
      setsignedUp(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  if(signedUp){
    return <Navigate to='/login' />;
  }

  console.log(formData.role_id, "role_id value in number")

  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          CodeCorners PMA
        </Typography>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                label='Your Name'
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='Confirm Password'
                type='password'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='role_id'
                  label='Your Role'
                  value={role_id}
                  onChange={(e) => onChange(e)}
                  select
                >
                  {roles?.map((role, index) => (
                      <MenuItem key={index} value={role.value}>
                        {role.label}
                      </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
