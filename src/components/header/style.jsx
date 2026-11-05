import { makeStyles } from '@material-ui/core/styles'

export const useStyle  = makeStyles((theme) => ({
    menu:{
        backgroundColor: '#12624F',
        alignItems: 'center',
        position: 'fixed',
        top:'0%',
        width: '100%',
        padding:'10px 0 10px 15px',
        zIndex:99999
    },

    /* PARTE DO MENU */
    logo:{
        height: '32px',
    },

    flex:{
        display:'flex',
        justifyContent:'space-between'
    }
}))
