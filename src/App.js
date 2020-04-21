import React from 'react';
import PdfGenerate from './components/pdfGenerate';
import Container from '@material-ui/core/Container';
import './App.css';

function App()  {
  
  return (
    <div className="App">
    <div className="container-fluid pt-5">   
        <Container >
         <PdfGenerate ></PdfGenerate> 
        </Container>
    </div>
    </div>
  );
}

export default App;
