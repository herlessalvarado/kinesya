import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            // border: `1px solid #DF6F7F`,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            // "&:hover": {
            //     backgroundColor: fade(theme.palette.common.white, 0.25),
            // },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
            transition: theme.transitions.create("width"),
            [theme.breakpoints.up("sm")]: {
                width: "30ch",
                "&:focus": {
                    width: "40ch",
                },
            },
        },
        input: {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create("width"),

            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
            "&&&:before": {
                borderBottom: "none",
            },
            "&&:after": {
                borderBottom: "none",
            },
        },
        grid: {
            padding: "0.5em",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gridGap: "2vh",
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    })
)
