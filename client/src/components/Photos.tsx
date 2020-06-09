import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {
    createMuiTheme,
    ThemeProvider,
    CardMedia,
    makeStyles,
    createStyles,
    Theme,
    Button,
} from "@material-ui/core"
import UploadImage, { Photo } from "./UploadImage"
import { IMAGE_LIMITS, MAX_STEPS_PROFILE } from "../utils/constants"
import { UserStateProps } from "../models/user"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            "& span": {
                marginLeft: "1vw",
                color: "#BF953F",
            },
            backgroundColor: "white",
            color: "#BF953F",
            display: "flex",
            "&:hover": {
                cursor: "pointer",
            },
            justifyContent: "center",
            "& input": {
                width: "0.1px",
                height: "0.1px",
                opacity: "0",
                overflow: "hidden",
                position: "absolute",
                zIndex: "-1",
            },
        },
        layout: {
            width: "auto",
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: "auto",
                marginRight: "auto",
            },
        },
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
        },
        stepper: {
            padding: theme.spacing(3, 0, 5),
        },
        buttons: {
            display: "flex",
            justifyContent: "flex-end",
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
    })
)

export default function Photos(props: UserStateProps) {
    const classes = useStyles()

    const [profilePhoto, setProfile] = useState(props.user.profilePhoto)
    const [bannerPhoto, setBanner] = useState(props.user.bannerPhoto)
    const [referencePhotos, setReferences] = useState(props.user.referencePhotos)

    const handleProfile = (photo: Photo) => {
        setProfile([photo])
    }
    const handleBanner = (photo: Photo) => {
        setBanner([photo])
    }

    const handleReferences = (event: any) => {
        let _references = Array.from(event.target.files).map(
            (file): Photo => ({
                file: file as File,
                url: window.URL.createObjectURL(file),
            })
        )
        if (!!referencePhotos) {
            if (referencePhotos.length < IMAGE_LIMITS) setReferences(_references)
        }
    }
    function areAllValid() {
        return profilePhoto.length > 0 && bannerPhoto.length > 0 && referencePhotos.length > 0
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid container direction="column" spacing={1}>
                    <UploadImage type="profile" onChange={handleProfile} value={profilePhoto} />
                    <UploadImage type="cover" onChange={handleBanner} value={bannerPhoto} />
                    <Grid item container direction="column" justify="space-between">
                        <Grid item container justify="space-between">
                            <Grid item>
                                <Typography variant="h6">Destacados</Typography>
                            </Grid>
                            <Grid item>
                                <label className={classes.label}>
                                    <Typography variant="button" display="block">
                                        Agregar
                                    </Typography>
                                    <input type="file" multiple onChange={handleReferences} />
                                </label>
                            </Grid>
                        </Grid>
                        <Grid item container justify="space-between">
                            {referencePhotos?.map((photo: Photo) => (
                                <Grid item key={photo.url} md={3} xs={3}>
                                    <CardMedia component="img" image={photo.url} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <div className={classes.buttons}>
                    {props.stepId > 0 && (
                        <Button
                            onClick={() => {
                                props.onClick(
                                    { ...props.user, profilePhoto, bannerPhoto, referencePhotos },
                                    props.stepId - 1
                                )
                            }}
                            className={classes.button}
                        >
                            Atrás
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!areAllValid()}
                        onClick={() => {
                            props.onClick(
                                { ...props.user, profilePhoto, bannerPhoto, referencePhotos },
                                props.stepId + 1
                            )
                        }}
                    >
                        {props.stepId === MAX_STEPS_PROFILE ? "Confirmar" : "Siguiente"}
                    </Button>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}
