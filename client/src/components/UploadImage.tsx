import Typography from "@material-ui/core/Typography"
import { FC, forwardRef } from "react"
import React from "react"
import BackupIcon from "@material-ui/icons/Backup"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import createStyles from "@material-ui/core/styles/createStyles"
import Grid from "@material-ui/core/Grid"
import { CardMedia } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            objectFit: "contain",
        },
        grid: {
            marginTop: theme.spacing(1),
        },
        root: {
            width: "100%",
            height: "100%",
            border: "1px solid #BF953F",
            borderRadius: "4px",
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
    })
)

interface UploadImageProps {
    text?: string
    onChange: (event: any) => void
    value: Array<Photo>
    multiple?: boolean
}

export interface Photo {
    url?: string
    file?: any
}

export default forwardRef<any, UploadImageProps>(
    ({ text, onChange, value, multiple }: UploadImageProps, ref: any) => {
        const classes = useStyles()
        function touched() {
            let classes = ""
            if (value.length > 0) {
                classes += "touched"
            }
            return classes
        }
        function renderImage() {
            if (multiple) {
                return (
                    <Grid container spacing={3}>
                        {value?.map((photo: Photo, index: number) => (
                            <Grid key={index} item xs={12} sm={3}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    className={classes.media}
                                    image={photo.url}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            } else {
                return value?.map((photo: Photo, index: number) => (
                    <Grid key={index} item xs={12}>
                        <CardMedia
                            component="img"
                            height="200"
                            className={classes.media}
                            image={photo.url}
                        />
                    </Grid>
                ))
            }
        }

        return (
            <Grid container spacing={3} className={classes.grid} justify="center">
                <Grid item xs={12} sm={6}>
                    <label className={classes.root}>
                        <BackupIcon color="inherit"></BackupIcon>
                        <Typography variant="h6" color="textSecondary" component="span">
                            {text}
                        </Typography>
                        <input
                            ref={ref}
                            className={touched()}
                            type="file"
                            multiple={multiple}
                            onChange={onChange}
                        />
                    </label>
                </Grid>
                {renderImage()}
            </Grid>
        )
    }
)
