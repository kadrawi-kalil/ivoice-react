import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import saadLogo from '../images/logo192.png';
import TextField from '@material-ui/core/TextField';
import jsPDF from 'jspdf'
export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
          file: '',
          imagePreviewUrl: ''
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }


    
      handleDelete(e) {
        e.preventDefault();
        console.log(this.state)
        this.setState({
            file: '',
            imagePreviewUrl: ''
          });

      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.parentCallback(this.state); 
        }
      }
    
      handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    
      render() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<div><img width ='80%' height='80px' src={imagePreviewUrl} />  </div>);
        }
    
        return (
          <div>
          <Button
  variant="contained"
  component="label" onChange={this.handleImageChange} 
>
  Upload Image
  <input
    type="file"
    style={{ display: "none" }}
  />
</Button>
            
              
            {$imagePreview}
          </div>
        )
      }
}