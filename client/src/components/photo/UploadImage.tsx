import Typography from "@material-ui/core/Typography"
import { useState } from "react"
import React from "react"
import Grid from "@material-ui/core/Grid"
import { CardMedia, DialogContent, Dialog } from "@material-ui/core"
import CropperImage from "../profile/images/CropperImage"
import { DEFAULT_PHOTO } from "../../commons/constants"
import {useStyles} from "./styles"
import { useTranslation } from "react-i18next";

type UserImage = "profile" | "cover"

interface UploadImageProps {
    text?: string
    onChange: (photo: Photo) => void
    value: Array<Photo>
    type: UserImage
}

export interface Photo {
    srcUrl?: string
    file?: any
}

export default ({ text, onChange, value, type }: UploadImageProps) => {
    const classes = useStyles();
    const { t } = useTranslation("common");
    const [dialog, setDialog] = useState(false);

    function handleChangeInputImage(event: any) {
        if (!!event.target.files && event.target.files.length > 0) {
            const _photo: Photo = {
                file: event.target.files[0] as File,
                srcUrl: window.URL.createObjectURL(event.target.files[0]),
            }
            onChange(_photo)
            setDialog(true)
        }
    }
    function imageContainer() {
        switch (type) {
            case "cover":
                return (
                    <Grid item container justify="center">
                        <Grid item style={{ width: "30vw", marginTop: "0.5vw" }}>
                            <CardMedia
                                component="img"
                                image={value.length > 0 ? value[0].srcUrl : DEFAULT_PHOTO}
                            />
                        </Grid>
                    </Grid>
                )
            case "profile":
                return (
                    <Grid item container justify="center">
                        <Grid item style={{ width: "20vw", marginTop: "0.5vw" }}>
                            <CardMedia
                                component="img"
                                image={value.length > 0 ? value[0].srcUrl : DEFAULT_PHOTO}
                            />
                        </Grid>
                    </Grid>
                )
        }
    }

    return (
        <Grid item container direction="column" justify="space-between">
            <Grid item container justify="space-between">
                <Grid item>
                    <Typography variant="h6">
                        {" "}
                        {type === "cover" ? t("dashboard.profile.image.cover") : t("dashboard.profile.image.profile")}
                    </Typography>
                </Grid>
                <Grid item>
                    <label className={classes.root}>
                        <Typography variant="button" display="block">
                            {t("dashboard.profile.image.upload")} 
                        </Typography>
                        <input type="file" onChange={handleChangeInputImage} />
                    </label>
                </Grid>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="md"
                    open={dialog}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent>
                        <CropperImage
                            origin={value[0]}
                            onChange={(photo: Photo) => {
                                onChange(photo)
                                setDialog(false)
                            }}
                            ratio={type === "cover" ? "16:9" : "1:1"}
                        />
                    </DialogContent>
                </Dialog>
            </Grid>
            {imageContainer()}
        </Grid>
    )
}
