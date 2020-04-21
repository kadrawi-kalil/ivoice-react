import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DropzoneAreaExample from './DropzoneAreaExample';
import { makeStyles } from '@material-ui/core/styles';
import DataFormat from '../util/DateFormat'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
 class CompanyForm extends Component {
    constructor(props){  
        super(props)
        this.state = {
            societe:'',
            adresse:'',
            phone:'',
            country:'',
            email:'',
            taxNumber:'',
            logo1:'',
            logo2:''
        }
        this.props.parentCallback(this.state);  
        this.onChange = this.onChange.bind(this);  
        const useStyles = makeStyles({
          root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
          label: {
            textTransform: 'capitalize',
          },
        });
     
         
    }
    
    onChange(e) {
       
        this.setState({ [e.target.name]: e.target.value});
         
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.parentCallback(this.state); 
        }
      }
      getImage1Data = (imageData) => {
      
        this.setState({logo1: imageData.imagePreviewUrl})
    }
    getImage2Data = (imageData) => {
      
      this.setState({logo2: imageData.imagePreviewUrl})
  }
     
    render() {
      
        return (
            <React.Fragment>
              <Container>
                
      <Typography variant="h6" >
      Votre société:
      </Typography>
      <Grid container spacing={3}>
      
      <Grid item xs={12} >
        Logo :
      <DropzoneAreaExample parentCallback={this.getImage1Data} ></DropzoneAreaExample>
        Tompon :
      <DropzoneAreaExample parentCallback={this.getImage2Data} ></DropzoneAreaExample>
        </Grid>
        <Grid item xs={12} >
          <TextField
           required
           color="secondary"
           
           classes={{
            root: {
              background: 'red',
              borderRadius: 3,
              border: 0,
              color: 'white',
              height: 48,
              padding: '0 30px',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }// class name, e.g. `classes-nesting-label-x`
          }}
           id="societe"
           name="societe"
           variant="outlined"
           size="small"
           value={this.state.societe}
           onChange={this.onChange}
           label="Nom de la société:"
           fullWidth
           autoComplete="societe"
          />
        </Grid>
        
        
        
        <Grid item xs={12} >
          <TextField
            required
            variant="outlined"
            size="small"
            id="country"
            label="Pays :"
            name="country"
            value={this.state.country}
            onChange={this.onChange}
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="adresse"
            variant="outlined"
            size="small"
            value={this.state.adresse}
            onChange={this.onChange}
            label="L'adresse :"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address2"
            name="phone"
            variant="outlined"
            size="small"
            value={this.state.phone}
            onChange={this.onChange}
            label="Numéro de téléphone :"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>   
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            variant="outlined"
            size="small"
            value={this.state.email}
            onChange={this.onChange}
            label="E-Mail :"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>   
        <Grid item xs={12}>
          <TextField
            required
            id="taxNumber"
            name="taxNumber"
            variant="outlined"
            size="small"
            value={this.state.taxNumber}
            onChange={this.onChange}
            label="Matricule Fiscal :"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid> 
      </Grid>
      </Container>
    </React.Fragment>
         )
    }
}


export default CompanyForm;