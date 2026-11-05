import { makeStyles } from '@material-ui/core/styles'

export const useStyle  = makeStyles((theme) => ({
    formCadastro:{
        width: '65%',
        margin: 'auto',
        background:'#ffff',
        padding:'15px 20px 15px 20px',
        borderRadius:'10px',
    },

    sizeSubTitle:{
        fontSize:'1.2rem',
        background:'#15755e',
        borderRadius:'3px',
        textAlign:'center',
        color:'#ffff',
        marginBottom:'25px',
        marginTop:'25px',
        padding:'10px 0 10px 0',
    },

    widthBox:{
        width:'90%',
        margin:'auto'
    },

    "@media (max-width: 1366px)": {
        formCadastro:{width: '90%'},
    },

    "@media (max-width: 1224px)": {
        widthBox:{width:'100%'}
    },

    "@media (max-width: 1024px)": {
        widthBox:{width:'100%'},
        formCadastro:{width: '98%',}
    }
}))