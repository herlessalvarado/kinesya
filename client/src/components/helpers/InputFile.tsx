import { useStyles } from "./styles";
import React from "react"

interface FileProps{
    onChange:(event:any)=>void,
    text:string
}

export function FileButton({text,onChange}:FileProps){
    const classes = useStyles()

    return (
        <label className={classes.root} >
                {text}
        <input type="file" multiple onChange={onChange} />
                    </label>
    )
}