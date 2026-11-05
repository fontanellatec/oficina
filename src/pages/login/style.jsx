import { makeStyles } from '@material-ui/core/styles'
import { height } from '@mui/system'
import Back from '../../assets/img/loginimg.png'

export const useStyle  = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Back})`,
        width:'100vw',
        height:'100vh',
        display:'flex',
        flexDirection:'Column',
        alignItems:'center',
        justifyContent:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center center'

    },

    bodyLogin:{
        width:'85%',
        background:'rgba(13,86,86,52%)',
        margin:'auto',
        padding:'45px',
        borderRadius:'5px',
        color:'white',
    },

    alignTitleFontanella:{
        textAlign:'right', 
        marginBottom:'40px'
            
    },
    
    subtitleFontanella:{
         color:'white',
         fontFamily:'Arial',
         fontWeight: '900' 
    },
    
    alignTitleLogin:{
        marginBottom:'60px',
        fontSize:'1.5rem'
    },
      
    entrar:{
        margin:'40px auto 40px',
        width:'100%',
        height:'35px',
        background:'#33AEAE',
        border:'none'
    },
      
    alignEsqueciSenha:{
        color:'white',
        textDecoration:'none',
        textAlign:'center'
    },

    colorWhite:{
        color:'white',
        textDecoration:'none'
    },

    teste:{
      width:'350px'  
    },

    alignCenter:{
        justifyContent:'center'
    },

    fixedFontanella:{
        position:'fixed',
        bottom: '3%',
        color:'white'
    },

    fixedViaToken:{
        position:'fixed',
        bottom: '3%',
        color:'white',
        cursor:'pointer'
    },

    loginToken:{
        marginTop:'30px',
        position:'fixed',
        bottom: '7%',
        color:'white',
        cursor:'pointer'
    },

    "@media (max-width: 500px)": {
        fixedFontanella:{display:'none'},
        fixedViaToken:{position:'sticky', marginTop: '50px'},
        loginToken:{bottom: '3%'},
    },

    "@media (max-height: 768px)": {
        alignTitleFontanella:{marginBottom:'30px'},
        alignTitleLogin:{marginBottom:'40px'},
        bodyLogin:{padding:'30px'},
    },

    "@media (max-height: 720px)": {
        entrar:{margin:'30px auto 40px'},
        alignTitleLogin:{marginBottom:'20px'},
    },

    "@media (max-height: 600px)": {
        entrar:{margin:'20px auto 40px'},
        alignTitleLogin:{marginBottom:'15px'},
    }
}))

