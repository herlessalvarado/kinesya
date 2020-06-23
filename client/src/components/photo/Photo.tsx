
import {useStyles} from "./styles"
import React, {  useState, forwardRef } from "react";
import { DialogContent, Dialog } from "@material-ui/core"
import CropperImage, {  ImageRatio } from "../profile/images/CropperImage";

export interface PhotoProps {
    value:Photo
    index:number
    onChange: (photo: Photo,index:number) => void
}
export interface Photo {
    srcUrl?: string
    file?: any
}



export default ({value,onChange,index}:PhotoProps)=>{
    const classes = useStyles();

    function setImage(event:React.ChangeEvent<HTMLInputElement>) {
        if (!!event.target.files) {
            const _photo: Photo = {
                file: (event.target.files[0] as File),
                srcUrl: window.URL.createObjectURL(event.target.files[0]),
            }
            onChange(_photo,index)
        }
    }

    return (
        <div className={classes.root}>
            <input type="file" className={classes.input} title=" " onChange={setImage}/>
            <img  className={classes.img} alt="" src={value.srcUrl}/>
        </div>
    )
}

type CropperPhoto = PhotoProps & { ratio: ImageRatio}

export const CropperPhoto = forwardRef<HTMLInputElement,CropperPhoto>((props:CropperPhoto,ref)=>{
    const [dialog,setDialog] = useState(false)
    const [photo,setPhoto] = useState(props.value)
    const classes = useStyles();
    function setImage(event:React.ChangeEvent<HTMLInputElement>) {
        if (!!event.target.files) {
            const _photo: Photo = {
                file: (event.target.files[0] as File),
                srcUrl: window.URL.createObjectURL(event.target.files[0]),
            }
            setPhoto(_photo)
            setDialog(true)

        }
    }
    
    return (
        <React.Fragment>
             <div className={classes.root}>
            <input ref={ref} type="file" title=" " className={classes.input} onChange={setImage}/>
            <img  className={classes.img} alt="" src={props.value.srcUrl}/>
             </div>
             <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="md"
                    open={dialog}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent>
                        <CropperImage
                            origin={photo}
                            onChange={(photo: Photo) => {
                                setDialog(false)
                                props.onChange(photo,props.index)
                                
                            }}
                            ratio={props.ratio}
                        />
                    </DialogContent>
                </Dialog>
        </React.Fragment>
        
    )
    
})