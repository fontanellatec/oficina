/*Páginas e relacionados ao react*/
import React, { useState, forwardRef} from "react";
//
import { Grid } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
// import { ModalMessage} from '../frontmessage/frontmessage'
//
//
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export function ModalMessage(props) {
    const [open, setOpen] = useState(true);
    let message = props.messageProp
    let messageError = props.messageError
    
    if (message === true){
        message = <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <Alert severity="success" action={
              <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false);}}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            } sx={{ mb: 2 }}>
            Salvo com sucesso!
          </Alert>
        </Collapse>
      </Box>
    } else if(message === false) {
        message = <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert severity="error" action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false);}}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              } sx={{ mb: 2 }}>
              Erro! Não foi possível salvar: {messageError}
            </Alert>
          </Collapse>
        </Box>
    }else{
        message = ''
    }
    
    return(
    <>
      {message}
    </>
  )
}

export function FalseConfirmSenha(props) {
  const [open, setOpen] = useState(true);

  let messageError = props.messageError
  let message = ''
  if(messageError != ''){
    message = <Box sx={{ width: '100%' }}>
    <Collapse in={open}>
      <Alert severity="error" action={
        <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false);}}>
        <CloseIcon fontSize="inherit" />
          </IconButton>
        } sx={{ mb: 2 }}>
          {messageError}
        </Alert>
      </Collapse>
    </Box> 
  }else{
    message = ''
  }
  
  return(
  <>
    {message}
  </>
)
}





