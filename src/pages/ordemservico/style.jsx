import { makeStyles } from '@material-ui/core/styles'

export const useStyle  = makeStyles((theme) => ({
    boxForm:{
        margin: 'auto',
        background:'#ffff',
        padding:'15px 20px 15px 20px',
        borderRadius:'10px',
    },

    boxGrafico:{
        margin: 'auto',
        background:'#ffff',
        padding:'15px 20px 15px 20px',
        borderRadius:'10px',
    },

    boxHoras:{
        margin: '20px auto',
        background:'#ffff',
        padding:'15px 20px 15px 20px',
        borderRadius:'10px',
    },

    select:{
        borderRadius:'.375rem!important',
        minHeight:'40px',
        width:'100%'
    },

    boxMovimentacao:{
        background:'#ffff',
        padding:'15px 20px 15px 20px',
        borderRadius:'10px',
    },

    heightChart:{
        height: '400px!important',
        width:'400px!important',
        margin:'10px auto'
    },

    sizeSubTitle:{
        fontSize:'1.2rem',
        background:'#15755e',
        borderRadius:'3px',
        textAlign:'center',
        color:'#ffff',
        marginBottom:'25px',
        marginTop:'25px',
        padding:'10px 0 10px 0'
    },

    logoWalk:{
        width:'30px',
        maxHeight:'29px'
    },

    justifyCenter:{
        display:'flex',
        justifyContent:'center'
    },

    row:{
        width:'90%',
        margin:'auto'
    },

    colMovimentacao:{
        width:'35%'
    },

    colOficina:{
        width:'65%'
    },

    corSim:{
        background:'#EDEDED'
    },

    txAlign:{
        textAlign:'center'
    },

    buttonSearch:{
        marginTop:'35px',
        maxHeight:'42px'
    },

    "@media (max-width: 1600px)": {
        row:{width:'98%'}
    },

    "@media (max-width: 1440px)": {
        colMovimentacao:{width:'40%'},
        colOficina:{width:'60%'},
    },

    "@media (max-width: 1366px)": {
        formCadastro:{width: '90%'}
    },

    "@media (max-width: 1280px)": {
        colMovimentacao:{width:'43%'},
        colOficina:{width:'57%'},
    },

    "@media (max-width: 1224px)": {
        heightChart:{
            height: '350px!important',
            width:'350px!important',
            margin:'20px auto'
        },
    },

    "@media (max-width: 1024px)": {
        widthBox:{width:'100%'},
        formCadastro:{width: '98%'},
        row:{flexDirection:'column'},
        colMovimentacao:{width:'100%'},
        colOficina:{width:'100%'},
        heightChart:{
            height: '300px!important',
            width:'300px!important'
        },
    }
}))