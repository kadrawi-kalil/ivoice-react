import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
 class CompanyBankAccount extends Component {
    constructor(props){  
        super(props)
        this.state = {
            compte:'',
            iban:'',
            bic:''
        }
        this.props.parentCallback(this.state);  
        this.onChange = this.onChange.bind(this); 
         
    }
  
    onChange(e) {
       
        this.setState({ [e.target.name]: e.target.value});
         
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.parentCallback(this.state); 
        }
      }

    
    render() {

        return (
            <React.Fragment>
              <Container>
                
      <Typography variant="h6" gutterBottom>
        Compte Bancaire :
      </Typography>
      <Grid container spacing={3}>
       
        <Grid item xs={12}>
          <TextField
            required
            id="compte"
            name="compte"
            variant="outlined"
            size="small"
            value={this.state.adresse}
            onChange={this.onChange}
            label="Compte:"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="iban"
            name="iban"
            variant="outlined"
            size="small"
            value={this.state.libelle}
            onChange={this.onChange}
            label="IBAN :"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid> 
        <Grid item xs={12}>
          <TextField
            required
            id="bic"
            name="bic"
            variant="outlined"
            size="small"
            value={this.state.libelle}
            onChange={this.onChange}
            label="BIC :"
            fullWidth
          />
        </Grid>     
      </Grid>
      </Container>
    </React.Fragment>
         )
    }
}
export default CompanyBankAccount;