import React, { Component } from 'react';
import saadLogo from '../images/logo192.png';
import jsPDF from 'jspdf'
import CompanyClient from './companyClient';
import CompanyForm from './companyForm';
import MaterialTableUI from './MaterialTable';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import CompanyBankAccount from './companyBankAccount'

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import DataFormat from '../util/DateFormat'
import 'jspdf-autotable';

 class pdfGenerate extends Component {
    constructor(props){
        super(props)
        this.state ={
            columns : [
                { title: "Qté", dataKey: "A" },
                { title: "Désignation", dataKey: "B" },
                { title: "Prix unitaire", dataKey: "C" },
                { title: "Total", dataKey: "D" , }
            ],
            rows : [],
            company:{},
            client:{},
            bankAccount:{},
            file:[],
            total:0,
            totalLettres:''
        }
        
       this.onChange = this.onChange.bind(this);
       this.getDataTable=this.getDataTable.bind(this)
       
  }

  getCompanyData = (companyData) => {
    
      this.setState({client: companyData})
  }
  getCompanyForm = (companyForm) => {
   
    this.setState({company: companyForm})
   
}
getCompanyBankAccount = (companyBankAccData) => {
   console.log(companyBankAccData)
  this.setState({bankAccount: companyBankAccData})
 
} 
getImageData = (fileData) => {
    this.setState({file: fileData.files[0]})
    console.log(fileData.files[0])
}
 
  getDataTable(table){
  
        let total=0;
        const array=[];
        
        table.forEach(e=>{
        total=total+e.D
        array.push(e);
        if(e.E){
          array.push({B: " Commentaire : "+e.E})
        }
      
      })
        
        this.setState({total: total})
      console.log(this.state.total)
      this.setState({rows: array})
 
  }

  onChange(e) {
      console.log(this.state)
        this.setState({ totalLettres: e.target.value}); 
  }

  createDataFormat(){
    const allRows= this.state.rows;
    allRows.forEach(e=>{
      if (e.E) {
        this.setState(prevState => {
          const data = [...prevState.rows];
         
          let number =data.indexOf(e)+1;
         data.splice(number, 0, {A:"ff",B:"fff"});
        console.log(data)
          return { ...prevState, data };
        });

      }})
  }

 

        
  jsPdfGenerator = () => {
  //  this.createDataFormat()
    console.log(this.state)
        const doc = new jsPDF('p', 'pt');
        doc.setFontSize(14);
        doc.setTextColor(40);
        //saad info
        doc.addImage(this.state.company.logo1, 'JPEG', 50, 40,140, 140); 
        doc.setFontType('bold');
        doc.text(this.state.company.societe, 60, 200);
        doc.setFontStyle('normal');
        doc.setFontSize(11);
        doc.text(this.state.company.adresse, 60, 213);
        doc.text(this.state.company.country, 60, 225);
        doc.text(this.state.company.phone, 60, 237);
        doc.text(this.state.company.email, 60, 249);
        doc.text(this.state.company.taxNumber, 60, 261);
        //company info
        doc.setFontSize(11);
        doc.text("Facture N° :"+this.state.client.invoiceNum, 400, 213);


        doc.text("Tunis, le :"+DataFormat(this.state.client.date).dd_mm_yyyy , 400, 225);
        doc.text("Facture adressé à :"+this.state.client.societe, 300, 300);
        doc.text(""+this.state.client.adresse, 300, 312);
        doc.text(""+this.state.client.country, 300, 324);
        doc.text("Libellé :"+this.state.client.libelle, 60, 340);
        //table invoice
         doc.autoTable(this.state.columns, this.state.rows, {
          startY: 300+ 70,
          headStyles: [5, 5, 0] ,
          margin: { horizontal: 50 },
          styles: { overflow: 'linebreak' },
          bodyStyles: { valign: 'top' },
          columnStyles: { B: { cellWidth: 'wrap' } },
         
          
        });
        doc.text("Arrêtée la présente facture à la somme de :", 60, doc.lastAutoTable.finalY +25);
        doc.setFontType('bold');
        doc.text("TOTAL : "+this.state.total +" $", 450, doc.lastAutoTable.finalY +25);
        
        doc.text(""+this.state.totalLettres, 100, doc.lastAutoTable.finalY + 40);
//startY: doc.lastAutoTable.finalY + 50,
doc.autoTable({
   // head: [['Name', 'Email', 'Country']],
   startY: doc.lastAutoTable.finalY + 60,
    body: [
      ['Compte',this.state.bankAccount.compte],
      ['IBAN', this.state.bankAccount.iban],
      ['BIC', this.state.bankAccount.bic],
      // ...
    ],
    margin: { horizontal: 50 },
    styles: { overflow: 'linebreak' },
    bodyStyles: { valign: 'top', fontStyle: 'bold'},
   
          theme: "grid"
  })
  
 
  doc.addImage(this.state.company.logo2, 'JPEG', 400,doc.lastAutoTable.finalY + 60,100, 100);
        doc.save(this.state.client.date+'--'+this.state.client.societe+'.pdf');
    }
 
    render(){      
       
      return(
      <div >
         <Grid container spacing={2}>
           <Grid item md={8} sm={12} >
              <Paper > 
                    <Grid container item  >
                        <Grid  item sm={6}  >
                          <CompanyForm parentCallback = {this.getCompanyForm}  ></CompanyForm>
                        </Grid>
                        <Grid item sm={6} >
                          <CompanyClient parentCallback = {this.getCompanyData}  ></CompanyClient>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} >
                            <MaterialTableUI   sendData={this.getDataTable}></MaterialTableUI>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} >
                        <Paper > 
                            <CompanyBankAccount parentCallback = {this.getCompanyBankAccount}  ></CompanyBankAccount>
                        </Paper > 
                       </Grid>
                         </Grid>
              </Paper>
            </Grid>
            <Grid display="flex" item md={4} sm={12} >
              
              <Paper > 
                 <form>
                    <TextField variant="outlined"   size="small" id="standard-basic" value={this.state.totalLettres} onChange={this.onChange} fullWidth label="Total en toute lettre :"  />
                    <TextField            variant="outlined"
           size="small" id="filled-basic"  style={{ margin: 8 }}  value={" TOTALE : "+this.state.total +" $"}  disabled/>
                    <Button onClick={this.jsPdfGenerator} style={{ margin: 24 }}  variant="contained" color="primary" > Generate PDF </Button> 
                
                 </form>
              </Paper>
          </Grid> 
              <Grid item md={12} sm={12} xs={12} >
           
                <Paper >
                
                
                </Paper>
                
                </Grid>
              <Grid item md={12} sm={12} >
                <Paper >
                 
               </Paper >
                </Grid>
            </Grid>
             
        
       </div>   
      )
     }

}
export default pdfGenerate;

