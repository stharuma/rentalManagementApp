import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(1),
        // minWidth: 700,
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.contrastText,
            height:'10px',
            padding: "0px"
        },
        '& tbody td': {
            fontWeight: '300',
            fontSize: 12,
            height:'10px',
            padding: "0px"
        },
        '& tbody tr:hover': {
            backgroundColor: '#CEE3F6',
            cursor: 'pointer',
        },
        // '& tbody tr': {
        //     height: "10px", 
        //     padding: "0px"
        // },
    },
}));
