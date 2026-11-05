/*Páginas e relacionados ao react*/
import React from 'react';

import './style.jsx';
import { useStyle } from './style'

/*Imports da raiz*/
import error from '../../assets/img/notFoundStory.png'

/*Components*/
import {Button, Accordion, AccordionDetails, AccordionSummary, Box,
Drawer, IconButton, List, ListItemButton, ListItemIcon} from '@mui/material';
import { Grid } from "@material-ui/core";
import {Link} from "react-router-dom";

const NotFound = () => {
    const classes = useStyle()

    return (
        <div className={classes.root}>
                <img src={error} className={classes.notFound}/>
                <h1 className={classes.notFounSize}>Página não encontrada</h1>
                <Link to="/" className={classes.linkHome}><h3>Voltar ao Início</h3></Link>
        </div>
    );
}
 
export default NotFound;
