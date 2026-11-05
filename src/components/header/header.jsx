/*Páginas e relacionados ao react*/
import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import { useStyle } from './style'
import Logo from '../../assets/img/fontanella-oficina-logo-branco.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/*Imports da raiz*/
//import Logo from '../../assets/img/logo_s.png';

const Header = () => {
    let navigate = useNavigate()
    const classes = useStyle()

    const handleQuit = () =>{
      navigate("/login")
      localStorage.removeItem('TOKEN_KEY'); 
    }
    
    return (
      <div>
        <section name='menu' className={classes.menu}>
          <div className={classes.alignMenu}>
            <div className={classes.flex}>
              <div><img src={Logo} className={classes.logo} /></div>
              <div style={{marginRight:'20px', color:'#ffffff', cursor:'pointer'}} onClick={handleQuit}>Sair <ExitToAppIcon /></div>
            </div>
          </div>
        </section>
      </div>
    );
}
 
export default Header;
