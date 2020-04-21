import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DataFormat from '../util/DateFormat'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
 class CompanyClient extends Component {
    constructor(props){  
        super(props)
        this.state = {
            societe:'',
            adresse:'',
            libelle:'',
            country:'',
            date:DataFormat(new Date()).yyyy_mm_dd,
            invoiceNum:''
        }
        this.props.parentCallback(this.state);  
        this.onChange = this.onChange.bind(this); 
        this.handleDateChange = this.handleDateChange.bind(this); 
         
    }
  
    onChange(e) {
       
        this.setState({ [e.target.name]: e.target.value});
         
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.parentCallback(this.state); 
        }
      }

      handleDateChange = (date) => {
         
        this.setState({ date: DataFormat(date).yyyy_mm_dd});
      };
    render() {

        return (
            <React.Fragment>
              <Container>
                
      <Typography variant="h6" gutterBottom>
        Facture :
      </Typography>
      <Grid container spacing={3}>
       
        <Grid item xs={12} >
          <TextField
            required
            id="invoiceNum"
            name="invoiceNum"
            variant="outlined"
            size="small"
            value={this.state.invoiceNum}
            onChange={this.onChange}
            label="Numéro de  Facture :"
            fullWidth
            autoComplete="invoiceNum"
          />
        </Grid>
        
        <Grid item xs={12}  >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="outlined"
          size="small"
          fullWidth
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.date}
          onChange={this.handleDateChange}
          
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider >
        </Grid>
        <Grid item xs={12}  >
          <TextField
            required
            id="societe"
            name="societe"
            variant="outlined"
            size="small"
            value={this.state.societe}
            onChange={this.onChange}
            label="Facture adressé à :"
            fullWidth
            autoComplete="societe"
          />
        </Grid>
        <Grid item xs={12}  >
          <TextField
            required
            id="country"
            label="Pays :"
            name="country"
            variant="outlined"
            size="small"
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
            name="libelle"
            variant="outlined"
            size="small"
            value={this.state.libelle}
            onChange={this.onChange}
            label="Libellé :"
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
export default CompanyClient;