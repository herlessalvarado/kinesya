import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserDetails from "../components/UserDetails"
import { getUserByUsername } from "../network/UserService"
import { UserDTO } from "../dto/user"

export default function Profile() {
    let { username } = useParams()
    const [user, setUser] = useState<UserDTO>()

    useEffect(() => {
        let active = true
        if (active) {
            getUserByUsername(username!).then((res: UserDTO) => {
                setUser(res)
            })
        }
        return () => {
            active = false
        }
    }, [username])

    return <React.Fragment>{!!user && <UserDetails user={user!} />}</React.Fragment>
}
