import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { CssBaseline, fade } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { Districts } from "../utils/constants"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        search: {
            display: "flex",
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            border: `1px solid #BF953F`,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
            },
            alignItems: "center",
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
        },
    })
)

export default function SearchBar() {
    const classes = useStyles()
    return (
        <React.Fragment>
            <CssBaseline>
                <Toolbar className={classes.root}>
                    <div className={classes.search}>
                        <span className={classes.searchIcon}>
                            <SearchIcon />
                        </span>

                        <Autocomplete
                            id="combo-box-demo"
                            options={Districts}
                            freeSolo
                            getOptionLabel={(option) => option.value}
                            style={{ width: 300 }}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        InputProps={{ disableUnderline: true }}
                                        placeholder="Search..."
                                    />
                                )
                            }}
                        />
                    </div>
                </Toolbar>
            </CssBaseline>
        </React.Fragment>
    )
}
