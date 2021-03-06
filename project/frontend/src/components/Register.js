// /* global console */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { compose } from "redux";
import { connect } from "react-redux";
import { userActions } from "../js/actions/userActions";
import {
    AppBar, Button, Card, CardActions, FormControl, Input, InputAdornment, InputLabel, Toolbar,
    Typography, FormHelperText
} from "material-ui";
import {AccountCircle, Email, Lock, PermIdentity} from "material-ui-icons";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    }
});


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user : {
              firstName: '',
              lastName: '',
              username: '',
              password: '',
              confirmPassword: '',
              email: ''
            },
            error: {
                firstName: false,
                lastName: false,
                username: false,
                password: false,
                confirmPassword: false,
                email: false
            },
            direction: 'row',
            justify: 'center',
            alignItems: 'center',
            submitted: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = event => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
              ...user,
              [name]: value
            }
        });
    };

    handleSubmit(event){
        this.setState({error: {}});

        event.preventDefault();

        this.setState({ submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        const validEmail = user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const equalPassword = user.confirmPassword === user.password;
        const longPassword = user.password.length > 6;
        if(!equalPassword){
            this.setState({error: {...this.state.error, password: 'Password does not match'} })
        }else if(!longPassword){
            this.setState({error: {...this.state.error, password: 'Password too short'} })
        }
        if(!validEmail){
          this.setState({error: {...this.state.error, email: 'Invalid email'} })

        }
        if(equalPassword && longPassword && validEmail){
          dispatch(userActions.register(user));
        }
    }

    render() {
        const { classes } = this.props;
        const { alignItems, direction, justify, user, } = this.state;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={16}
                        alignItems={alignItems}
                        direction={direction}
                        justify={justify}
                        style={{height: 700}}
                    >
                        <Grid item xs={3}>
                            <Card>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Typography variant="title" color="inherit">
                                            Register
                                        </Typography>
                                    </Toolbar>
                                </AppBar>


                                <form onSubmit={this.handleSubmit}>
                                    <Grid container
                                          alignItems={alignItems}
                                          direction={direction}
                                          justify={justify} sytle={{padding: 100}}>


                                        <Grid item xs={10}>
                                            <Grid container spacing={16}>
                                                <Grid item xs={6}>
                                                    <FormControl fullWidth className={classes.margin} required>
                                                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                                                        <Input
                                                            id="firstName"
                                                            name="firstName"
                                                            value={user.firstName}
                                                            onChange={this.handleChange}
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <PermIdentity />
                                                                </InputAdornment>
                                                            }
                                                        />
                                                        <FormHelperText id="name-error-text">{this.state.error.firstName}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl fullWidth className={classes.margin} required>
                                                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                                        <Input
                                                            id="lastName"
                                                            name="lastName"
                                                            value={user.lastName}
                                                            onChange={this.handleChange}
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <PermIdentity />
                                                                </InputAdornment>
                                                            }
                                                        />
                                                        <FormHelperText id="name-error-text">{this.state.error.lastName}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={10}>
                                            <FormControl fullWidth className={classes.margin} required>
                                                <InputLabel htmlFor="username">Username</InputLabel>
                                                <Input
                                                    id="username"
                                                    name="username"
                                                    value={user.username}
                                                    onChange={this.handleChange}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    }
                                                />
                                                <FormHelperText id="name-error-text">{this.state.error.username}</FormHelperText>
                                            </FormControl>
                                        </Grid>


                                      <Grid item xs={10}>
                                        <FormControl fullWidth className={classes.margin} required error={this.state.error.password} aria-describedby="name-error-text">
                                          <InputLabel htmlFor="password">Password</InputLabel>
                                          <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={user.password}
                                            onChange={this.handleChange}
                                            startAdornment={
                                              <InputAdornment position="start">
                                                <Lock/>
                                              </InputAdornment>
                                            }
                                          />
                                          <FormHelperText id="name-error-text">{this.state.error.password}</FormHelperText>
                                        </FormControl>
                                      </Grid>




                                      <Grid item xs={10}>
                                        <FormControl fullWidth className={classes.margin} required error={this.state.error.password}
                                                     aria-describedby="name-error-text">
                                          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                          <Input
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            onChange={this.handleChange}
                                            startAdornment={
                                              <InputAdornment position="start">
                                                <Lock/>
                                              </InputAdornment>
                                            }
                                          />
                                          <FormHelperText id="name-error-text">{this.state.password_error}</FormHelperText>
                                        </FormControl>
                                      </Grid>


                                      <Grid item xs={10}>
                                        <FormControl fullWidth className={classes.margin} required error={this.state.error.email}
                                                     aria-describedby="name-error-text">
                                          <InputLabel htmlFor="email">Email</InputLabel>
                                          <Input
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={this.handleChange}
                                            startAdornment={
                                              <InputAdornment position="start">
                                                <Email/>
                                              </InputAdornment>
                                            }
                                          />
                                          <FormHelperText id="name-error-text">{this.state.error.email}</FormHelperText>
                                        </FormControl>

                                      </Grid>

                                      </Grid>


                                    <CardActions>
                                        <Button  type="submit" size="small" color="primary" >
                                            Submit
                                        </Button>

                                    </CardActions>
                                </form>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    register: PropTypes.object,
};



function mapStateToProps(state){
    const register  = state.register;
    return { register };
}

export default compose(withStyles(styles), connect(mapStateToProps))(Register);