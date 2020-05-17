import React, { useState, useEffect } from "react"
import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles"
import Header from "../components/Header"
import SmallCard from "../components/SmallCard"
import Copyright from "../components/Copyright"
import { getUsersByPaginator } from "../network/UserService"
import { useHistory } from "react-router-dom"
import Toolbar from "@material-ui/core/Toolbar"
import SearchIcon from "@material-ui/icons/Search"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { DISTRICTS } from "../utils/constants"
import { getUsersByDistrict } from "../network/UserService"
import { TextField } from "@material-ui/core"
import InfiniteScroll from 'react-infinite-scroller';

interface Profile {
    username: string
    name: string
    description: string
    location: string
    age: number
    price: number
    phone: number
    profilePhoto: string
    referencePhotos: Array<string>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        container: {
            borderSizing: "contenxt-box",
            textAlign: "center",
            width: "100%",
            columns: "4",
            columnGap: "0.2vw",
            [theme.breakpoints.down("md")]: {
                columns: "4",
            },
            [theme.breakpoints.down("sm")]: {
                columns: "3",
            },
            [theme.breakpoints.down("xs")]: {
                columns: "2",
            },
        },
        box: {
            width: "100%",
            padding: "1vw",
            overflow: "hidden",
            breakInside: "avoid",
            "& img": {
                objectFit: "contain",
                height: "100%",
                width: "100%",
                border: "1px",
            },
        },
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
        input: {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create("width"),

            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
            "&&&:before": {
                borderBottom: "none",
            },
            "&&:after": {
                borderBottom: "none",
            },
        },
    })
)

export default function Home() {
    const classes = useStyles()
    const history = useHistory()
    const [users, setUsers] = useState(new Array<Profile>())
    const [hasMore, setHasMore] = useState(true)
    const limit = 4

    const path = process.env.REACT_APP_API_URL!

    const handleOpen = (username: string) => {
        history.push("/user/" + username)
    }
    const handleSelected = (event: any) => {
        getByDistrict(event.target.textContent)
    }
    const getByDistrict = (district: any) => {
        getUsersByDistrict(district).then((res: Profile[]) => {
            setUsers(res)
        })
    }

    function loadItems(page: Number){
        getUsersByPaginator(page, limit).then((res: Profile[]) => {
            if(res.length == 0) setHasMore(false)
            else{
                setUsers(users.concat(res))
            }
        })
    }

    return (
        <div>
            <Header title="Kinesya"></Header>
            <Toolbar className={classes.root}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <Autocomplete
                        id="combo-box-demo"
                        options={DISTRICTS}
                        freeSolo
                        classes={{ inputRoot: classes.input }}
                        getOptionLabel={(option) => option}
                        onChange={handleSelected}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    placeholder="Search..."
                                />
                            )
                        }}
                    />
                </div>
            </Toolbar>
            <div className={classes.container}>
                <InfiniteScroll
                pageStart={0}
                loadMore={loadItems}
                hasMore={hasMore}>
                <div>
                    {users?.map((user) => (
                    <div
                        key={user.username}
                        className={classes.box}
                        onClick={() => {
                            handleOpen(user.username)
                        }}
                    >
                        <SmallCard
                            name={user.name}
                            location={user.location}
                            image={path + user.profilePhoto}
                            phone={user.phone}
                        ></SmallCard>
                    </div>
                ))}
                </div>
            </InfiniteScroll>
            </div>
            <Copyright></Copyright>
        </div>
    )
}