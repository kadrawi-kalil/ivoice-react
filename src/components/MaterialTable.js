import React,{ Component } from 'react';
import MaterialTable ,{ MTableToolbar }  from 'material-table';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

class MaterialTableUI extends Component {
    constructor(props){
    super(props)
        this.state = {
    data: [ ],
   
  }}
  onclick(data){
    this.props.sendData(data);
  }

 
  handleChange(event, row) {
    
    row.E=event.target.value
    console.log(event.target.value);
    console.log(row);
    this.setState(prevState => {
      const data = [...prevState.data];
      
      data[data.indexOf(row)] = row;
      this.onclick(data)
      return { ...prevState, data };
    });
    
}
  render() {

  return (
    <MaterialTable   options={{
        search: false,
        paging: false,
        
        
      }}
      title=""
      columns= {[
        { title: 'Qte', field: 'A',type: 'numeric', initialEditValue : 1  },
        { title: 'Désignation', field: 'B' ,initialEditValue : 'Désignation',
        editComponent: props => (
          <TextField
          id="standard-multiline-flexible"
          placeholder="Désignation ..."
          multiline
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          />
        )
        },
        { title: 'Prix unitaire', field: 'C', type: 'numeric', initialEditValue : 10 },
        {
          title: 'Total',
          field: 'D',
          editable: 'never' ,
          initialEditValue : 0
        },
       /* { title: 'hedden', field: 'E',type: 'text', initialEditValue : '' ,hidden:true ,defaultSort: 'asc'},
      */]}
      data={this.state.data} 
      
      editable={{

        onRowAdd: newData =>{
          
       
       return   new Promise(resolve => {
         
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                newData.D=newData.A*newData.C;
               
                data.push(newData);
                this.onclick(data);
                return { ...prevState, data };
              });
            }, 600);
          }) },
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                this.setState(prevState => {
                  const data = [...prevState.data];
                  newData.D=newData.A*newData.C;
                  data[data.indexOf(oldData)] = newData;
                  this.onclick(data)
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                this.onclick(data)
                return { ...prevState, data };
              });
            }, 600);
          }),
      }
    }  detailPanel={[
      {
        tooltip: 'Show Name',
        render: rowData => {
         
          return (
            
           <div>
              <TextField type="text" 
               id="standard-multiline-flexible"
               placeholder="Commentaire..........."
               multiline
               fullWidth
                value={rowData.E?rowData.E:""} onChange={(e, val) => this.handleChange(e, rowData)} /> 
             <Button variant="outlined" color="secondary" >Delete</Button>
             </div>
          )
        },
      },
     
     
    ]}
    
    
    />
  )}
}

export default  MaterialTableUI;