import { makeStyles } from '@material-ui/core/styles'
import { fontWeight } from '@mui/system'

export const useStyle  = makeStyles((theme) => ({
    root: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    
    notFound:{
        paddingTop:'8%',
        width:'40%',
        // height:'300px'
    },

    linkHome:{
        marginTop:'40px',
        color:'#0D5656',
    },

    "@media (max-width: 768px)": {
        notFound:{
            paddingTop:'23%',
            width:'50%',
        }
    },

    "@media (max-width: 600px)": {
        notFound:{paddingTop:'30%', width:'70%',},
        
    },

    "@media (max-width: 500px)": {
        notFound:{paddingTop:'30%', width:'70%',},
        notFounSize:{fontSize:'1.5rem'}
    },
}))

