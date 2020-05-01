import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import React from "react";
import BackupIcon from "@material-ui/icons/Backup"
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
            border:"1px solid #BF953F",
            borderRadius:"4px",
            alignItems: "center",
            "& span":{
                marginLeft: "1vw",
                color:"#BF953F"
            },
            backgroundColor: "white",
            color:"#BF953F",
            display: "flex",
            "&:hover": {
                cursor:"pointer"
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
    text?:string,
    onChange?:(event:any)=>void,
    multiple?:boolean
}
const UploadImage: FC<UploadImageProps> = function CustomizedSnackbars(props: UploadImageProps) {
    const classes = useStyles()


    return (
    <label className={classes.root}>
                                        <BackupIcon color="inherit"></BackupIcon>
                                        <Typography
                                            variant="h6"
                                            color="textSecondary"
                                            component="span"
                                        >
                                            {props.text}
                                        </Typography>
                                        <input
                                            id="secondaries"
                                            name="secondaries"
                                            type="file"
                                            multiple={props.multiple}
                                            onChange={props.onChange}
                                        />
                                    </label>
    )
}

export default UploadImage