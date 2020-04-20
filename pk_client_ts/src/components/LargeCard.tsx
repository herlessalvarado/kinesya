import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { ButtonBase } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
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

export default React.forwardRef((props:CardProps,ref)=>{
    const classes = useStyles()
    const path = process.env.REACT_APP_API_URL!
    return (
        <Card ref={ref} className={classes.card}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item sm md={6} container alignItems="center">
                        <ButtonBase>
                            <img className={classes.img} alt="complex" src={`${props.profile}`} />
                        </ButtonBase>
                    </Grid>
                    <Grid item md={6} sm container>
                        <Grid item xs={12}>
                            <Typography variant="h3" component="h2">
                                {props.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.age + " años"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container alignContent="center">
                            <Typography variant="h5" component="h2">
                                {props.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" component="h2">
                                {"Tarifa: 1 hora S/. " + props.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container alignContent="center">
                            <Button size="large" className={classes.button}>
                                {props.phone}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} wrap="wrap">
                    {props.references?.map((reference, index) => (
                        <Grid item sm md={6}>
                            <ButtonBase>
                                <img
                                    key={index}
                                    className={classes.img}
                                    alt="complex"
                                    src={path + reference}
                                />
                            </ButtonBase>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
})


