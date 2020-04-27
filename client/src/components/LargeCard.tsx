import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { ButtonBase, GridList } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(0.2),
            height: "40vw",
            overflowY: "auto",
            overflowX: "hidden",
            margin: "auto",
            width: "50vw",
            "&::-webkit-scrollbar": {
                width: "0.5em",
            },
            "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                outline: "1px solid slategrey",
            },
        },

        textField: {
            margin: "1.5vh",
        },

        img: {
            width: "100%",
            objectFit: "cover",
            height: "100%",
        },
        button: {
            flex: 1,
        },
        container: {
            borderSizing: "contenxt-box",
            textAlign: "center",
            width: "100%",
            columns: "2",
            columnGap: "0.2vw"
        },
        box: {
            width: "100%",
            padding: "10px",
            overflow: "hidden",
            breakInside: "avoid",
            "& img": {
                objectFit: "contain",
                height: "100%",
                width: "100%",
            },
        },
    })
)

interface CardProps {
    name?: string
    description?: string
    age?: Number
    location?: string
    phone?: Number
    price?: Number
    profile?: string
    references?: Array<string>
}

export default React.forwardRef((props: CardProps, ref) => {
    const classes = useStyles()
    const path = process.env.REACT_APP_API_URL!
    return (
        <Card ref={ref} className={classes.card}>
            <div className={classes.container}>
                <div className={classes.box}>
                    <img className={classes.img} alt="complex" src={`${props.profile}`} />
                </div>
                <div className={classes.box}>
                    <Typography variant="h3" component="h2">
                            {props.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.age + " años"}
                        </Typography>
                </div>
            </div>
        </Card>
    )
})
