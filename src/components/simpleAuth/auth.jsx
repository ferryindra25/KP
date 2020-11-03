import React from 'react'
import {useHistory} from 'react-router-dom'

const Auth = ({children}) => {
    let email = window.sessionStorage.getItem("email")
    let admin = window.sessionStorage.getItem("admin")
    let history = useHistory()
    if(!email || !admin || email != admin){
        history.push("/")
    }
    return children

}

export default Auth