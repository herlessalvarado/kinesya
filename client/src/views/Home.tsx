import React, { useState, useEffect, useRef } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import SmallCard from "../components/SmallCard"
import LargeCard from "../components/LargeCard"
import Copyright from "../components/Copyright"
import Modal from "@material-ui/core/Modal"
import { getUsers } from "../network/UserService"

interface Profile {
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
    })
)

export default function Home() {
    const classes = useStyles()
    const [users, setUsers] = useState(new Array<Profile>())
    const [open, setOpen] = useState(false)
    const mountedRef = useRef(true)
    const [selectedUser, setSelectedUser] = useState<Profile>()

    const path = process.env.REACT_APP_API_URL!

    const handleOpen = (user: Profile) => {
        setSelectedUser(user)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getUsers().then((res: Profile[]) => {
            console.log(res)
            if (mountedRef.current) setUsers(res)
            mountedRef.current = false
        })
    }, [])

    return (
        <div>
            <Header title="Kinesya"></Header>
            <SearchBar></SearchBar>
            <div className={classes.container}>
                {users?.map((user) => (
                    <div
                        key={user.profilePhoto}
                        className={classes.box}
                        onClick={() => {
                            handleOpen(user)
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
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <LargeCard
                        name={selectedUser?.name}
                        description={selectedUser?.description}
                        age={selectedUser?.age}
                        profile={path + selectedUser?.profilePhoto}
                        location={selectedUser?.location}
                        price={selectedUser?.price}
                        phone={selectedUser?.phone}
                        references={selectedUser?.referencePhotos}
                    ></LargeCard>
                </div>
            </Modal>
            <Copyright></Copyright>
        </div>
    )
}
