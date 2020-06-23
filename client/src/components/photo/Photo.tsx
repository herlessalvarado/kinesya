import { Photo } from "./UploadImage";
import {useStyles} from "./_styles"
import React from "react";

export interface PhotoProps {
    value:Photo
    index:number
    onChange: (photo: Photo,index:number) => void
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
            <input type="file" className={classes.input} onChange={setImage}/>
            <img  className={classes.img} alt="" src={value.srcUrl}/>
        </div>
    )
}