import React, { useState, useRef, useEffect } from "react"
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
import { isDirty } from "../helpers/html_validators"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    const refBanner = useRef<HTMLElement>()
    const refProfile = useRef<HTMLElement>()
    const refReferences = useRef<HTMLElement>()

    const [valid, setValid] = useState(false)
    const [profilePhoto, setProfile] = useState(props.user.profilePhoto)
    const [bannerPhoto, setBanner] = useState(props.user.bannerPhoto)
    const [referencePhotos, setReferences] = useState(props.user.referencePhotos)

    const handleProfile = (event: any) => {
        let _photos: Array<Photo> = Array.from(event.target.files).map(
            (photo): Photo => ({
                file: photo,
                url: window.URL.createObjectURL(photo),
            })
        )
        
        setProfile(_photos)
    }
    const handleBanner = (event: any) => {
        let _photos: Array<Photo> = Array.from(event.target.files).map(
            (photo): Photo => ({
                file: photo,
                url: window.URL.createObjectURL(photo),
            })
        )
        setBanner(_photos)
    }

    const handleReferences = (event: any) => {
        let _references = Array.from(event.target.files).map(
            (photo): Photo => ({
                file: photo,
                url: window.URL.createObjectURL(photo),
            })
        )
        if (!!referencePhotos) {
            if (referencePhotos.length < IMAGE_LIMITS) setReferences(_references)
        }
    }
    function areAllTouched() {
        return isDirty(refBanner) && isDirty(refProfile) && isDirty(refReferences)
    }
    useEffect(() => {
        if (areAllTouched()) {
            setValid(true)
        }
    })
    

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>
                    Fotos
                </Typography>
                <UploadImage
                    ref={refBanner}
                    text="Foto de Portada"
                    value={bannerPhoto!}
                    onChange={(event:any)=>{handleBanner(event)}}
                />
                <UploadImage
                    ref={refProfile}
                    text="Foto de Perfil"
                    value={profilePhoto!}
                    onChange={(event:any)=>{handleProfile(event)}}
                />
                <UploadImage
                    ref={refReferences}
                    text="Fotos de Referencia"
                    value={referencePhotos!}
                    multiple
                    onChange={(event:any)=>{handleReferences(event)}}
                />

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
                        disabled={!valid}
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
