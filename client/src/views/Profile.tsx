import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserByUsername from "../components/UserByUsername"
import { getUserByUsername } from "../network/UserService"

interface User {
    cover?: string
    profilePhoto?: string
    references?: Array<string>
    name?: string
    description?: string
    orientation?: string
    location?: string
    birthPlace?: string
    age?: Number
    height?: number
    weight?: number
    eyes?: string
    hair?: string
    fakeBoobs?: boolean
    birthday?: Date
    zodiac?: string
    measurements?: string
    ethnicity?: string
}

export default function Profile(){
    const path = process.env.REACT_APP_API_URL!
    let { username } = useParams();
    const [user, setUser] = useState<User>()

    useEffect(() => {
        getUserByUsername(username!).then((res: User) => {
            setUser(res)
        })
    }, [])

    return(
        <React.Fragment>
            <UserByUsername
                name={user?.name}
                description={user?.description}
                location={user?.location}
                profile={path + user?.profilePhoto}
                age={user?.age}
            />
        </React.Fragment>
    )
}