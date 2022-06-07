import { makeStyles } from "@material-ui/core";

export default makeStyles(()=>({
    btn: {
        '& .Mui-selected': {
          backgroundColor: '#070fed',
          color:'#ffffff',
         },
         
    },
    ul: {
        justifyContent: 'center',
    },

}));