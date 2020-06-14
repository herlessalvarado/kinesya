import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import LoginGirl from '../../../assets/loginGirl.jpg'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100vh",
        },
        image: {
            backgroundImage: `url(${LoginGirl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor:
                theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        typography: {
            margin: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(3, 0, 2),
            background: "linear-gradient(90deg,#e8d3af,#cda777)!important",
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        logo: {
            width: "30%"
        },
        registerUrl:{
            textDecoration: "none",
            color:theme.palette.primary.main
        }
    })
)