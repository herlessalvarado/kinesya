import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserDetails from "../components/UserDetails"
import { getUserByUsername } from "../network/UserService"
import { UserDTO } from "../dto/user"
import { UserViewModel } from "../models/user"
import { mapUserDTOToViewModel } from "../helpers/user_mapper"

export default function Profile() {
    let { username } = useParams()
    const [user, setUser] = useState<UserViewModel>()

    useEffect(() => {
        let active = true
        if (active) {
            getUserByUsername(username!).then((res: UserDTO) => {
                setUser(mapUserDTOToViewModel(res))
            })
        }
        return () => {
            active = false
        }
    }, [username])

    return <React.Fragment>{!!user && <UserDetails user={user!} />}</React.Fragment>
}
