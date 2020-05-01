import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { CssBaseline } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            textAlign: "center",
            backgroundColor: "black",
            width: "100%",
            boxSizing: "border-box",
        },
        cover: {
            display: "block",
            position: "relative",
            height: "250px",
            overflow: "hidden",
            zIndex: 1,
        },
        coverPhoto: {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        },
        profile: {
            display: "block",
            position: "relative",
            border: `#BF953F solid 3px`,
            borderRadius: "5px",
            width: "200px",
            height: "200px",
            objectFit: "contain",
            margin: `-150px 0 10px 20px`,
            zIndex: 999,
            marginLeft: "auto",
            marginRight: "auto",
        },
        profilePhoto: {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        },
        name: {
            textAlign: "center",
        },
        container2: {
            flexGrow: 1,
        },
        grid: {
            "&.MuiGrid-spacing-xs-3": {
                width: "100%",
            },
        },
        box: {
            width: "100%",
            overflow: "hidden",
            breakInside: "avoid",
            paddingLeft: "2vw",
        },
        info: {
            textAlign: "left",
        },
        container3: {
            width: "100%",
            columns: "4",
            columnGap: "2vw",
            [theme.breakpoints.down("sm")]: {
                columns: "1",
            },
        },
        box2: {
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

interface UserByUsernameProps {
    cover?: string
    profile?: string
    references?: Array<string>
    name?: string
    description?: string
    orientation?: string
    location?: string
    birthPlace?: string
    age?: Number
    height?: number
    weight?: number
    eyes?: string
    hair?: string
    fakeBoobs?: boolean
    birthday?: Date
    zodiac?: string
    measurements?: string
    ethnicity?: string
}

export default function UserByUsername(props: UserByUsernameProps) {
    const classes = useStyles()
    const path = process.env.REACT_APP_API_URL!
    return (
        <React.Fragment>
            <CssBaseline>
                <div className={classes.container}>
                    <div className={classes.cover}>
                        <CardMedia
                            component="img"
                            image={props.cover}
                            className={classes.coverPhoto}
                        />
                    </div>
                    <div className={classes.profile}>
                        <CardMedia
                            component="img"
                            image={props.profile}
                            className={classes.profilePhoto}
                        />
                    </div>
                    <div className={classes.name}>
                        <Typography variant="h5" gutterBottom>
                            {props.name}
                        </Typography>
                    </div>
                    <div className={classes.container2}>
                        <Grid container spacing={3} className={classes.grid}>
                            <Grid item xs={6}>
                                <div className={classes.box}>
                                    <Typography
                                        style={{ color: "white", textAlign: "justify" }}
                                        gutterBottom
                                    >
                                        {props.description}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={3} className={classes.grid}>
                                    <Grid item xs={6}>
                                        <div className={classes.info}>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Interesada en:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.orientation}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Distrito y ciudad:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.location}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Sexo:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    Mujer
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Lugar de Nacimiento:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.birthPlace}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Edad:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.age}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Signo Zodiacal:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.zodiac}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.info}>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Medidas:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.measurements}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Altura:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.height + "cm"}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Peso:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.weight + "kg"}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Etnia:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.ethnicity}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Color de cabello:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.hair}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        marginRight: "10px",
                                                        color: "white",
                                                    }}
                                                >
                                                    Tetas falsas:
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: "inline-block",
                                                        color: "darkGray",
                                                    }}
                                                >
                                                    {props.fakeBoobs}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.container3}>
                            {props.references?.map((reference, index) => (
                                <div key={reference} className={classes.box2}>
                                    <img key={index} alt="complex" src={path + reference} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CssBaseline>
        </React.Fragment>
    )
}
