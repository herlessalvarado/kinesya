import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(0.2),
            height: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
            margin: "auto",
            width: "60vw",
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
            padding: "1vw",
        },
        button: {
            flex: 1,
        },
        container: {
            width: "100%",
            columns: "2",
            columnGap: "1vw",
            [theme.breakpoints.down("sm")]: {
                columns: "1",
            },
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
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
                padding: "5px",
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
                    <img alt="complex" src={`${props.profile}`} />
                </div>
                <div className={classes.box}>
                    <Paper className={classes.img} variant="outlined">
                        <Grid container wrap="nowrap" direction="column">
                            <Grid item>
                                <Typography variant="h3" component="h2">
                                    {props.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.location}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.age + " años"}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" component="h2">
                                    {props.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="textSecondary" component="h2">
                                    {"Tarifa: 1 hora S/. " + props.price}
                                </Typography>
                            </Grid>
                            <Grid item container alignContent="center">
                                <Button size="large" className={classes.button}>
                                    {props.phone}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
            <div className={classes.container}>
                {props.references?.map((reference, index) => (
                    <div key={reference} className={classes.box}>
                        <img key={index} alt="complex" src={path + reference} />
                    </div>
                ))}
            </div>
        </Card>
    )
})
