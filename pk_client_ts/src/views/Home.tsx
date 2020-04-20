import React, { useState, useEffect, useRef } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Container from "@material-ui/core/Container"
import SmallCard from "../components/SmallCard"
import LargeCard from "../components/LargeCard"
import Copyright from "../components/Copyright"
import Grid from "@material-ui/core/Grid"
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
            if (mountedRef.current) setUsers(res)
            mountedRef.current = false
        })
    }, [])

    return (
        <div>
            <Header title="Kinesya"></Header>
            <SearchBar></SearchBar>
            <main>
                <Container maxWidth="lg">
                    <React.Fragment>
                        <Grid container spacing={3}>
                            {users?.map((user, index) => (
                                <React.Fragment key={index}>
                                    <Grid
                                        item
                                        xs={6}
                                        sm={3}
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
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                        <Modal
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
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
                        </Modal>
                    </React.Fragment>
                </Container>
            </main>
            <Copyright></Copyright>
        </div>
    )
}
