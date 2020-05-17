import Typography from "@material-ui/core/Typography"
import { FC, forwardRef, useRef, useEffect, useState } from "react"
import React from "react"
import BackupIcon from "@material-ui/icons/Backup"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import createStyles from "@material-ui/core/styles/createStyles"
import Grid from "@material-ui/core/Grid"
import { CardMedia, DialogContent,Dialog } from "@material-ui/core"
import CropperImage from "./CropperImage"
import { DEFAULT_PHOTO } from "../utils/constants"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
                cursor: "pointer"
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

type UserImage = "profile" | "cover"

interface UploadImageProps {
    text?: string
    onChange: (photo: Photo) => void
    value: Array<Photo>
    type:UserImage

}

export interface Photo {
    url?: string
    file?: any
}

export default ({ text, onChange, value, type}: UploadImageProps) => {
    const classes = useStyles()
    const [dialog, setDialog] = useState(false)
    
    function handleChangeInputImage(event: any) {
        if (!!event.target.files && event.target.files.length > 0) {
            const _photo: Photo = {
                file: event.target.files[0] as File,
                url: window.URL.createObjectURL(event.target.files[0]),
            }
            onChange(_photo)
            setDialog(true)
        }
    }
    function imageContainer(){
        switch (type) {
            case "cover":
                return <Grid item container justify="center" >
                    <Grid item style={{width:"30vw",marginTop:"0.5vw"}}>
                        <CardMedia
                        component="img"
                        image={(value.length > 0) ? value[0].url : DEFAULT_PHOTO}
                        />    
                    </Grid>
                         
                </Grid> 
            case "profile":
                return <Grid item container  justify="center" >
                    <Grid item style={{width:"20vw" ,marginTop:"0.5vw"}} >
                    <CardMedia
                        component="img"
                        image={(value.length > 0) ? value[0].url : DEFAULT_PHOTO}
                    />
                    </Grid>
                   
            </Grid>

        }
   
            
    }
    

    return (
        <Grid item container direction="column" justify="space-between">
            <Grid item container justify="space-between">
                <Grid item>
                <Typography variant="h6"> {(type === "cover") ? "Foto de Portada" : "Foto de Perfil"}</Typography>
                </Grid>
                <Grid item>
                    <label className={classes.root}>
                        <Typography variant="button" display="block">Agregar</Typography>
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
                    <CropperImage origin={value[0]} onChange={(photo:Photo)=>{onChange(photo);setDialog(false)}} ratio={(type === "cover") ? "16:9" : "1:1"}/>
            </DialogContent>
        </Dialog>
            </Grid>
            {imageContainer()}
        </Grid>
    )
}
