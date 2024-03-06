// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//this file hooks the code that is required from the log in page
export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // console.log(refreshToken)

    useEffect(()=>{
        axios.post('http://localhost:3001/login',{
            code,
        }).then(res =>{
            // console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn); //res.data.expiresIn
            window.history.pushState({}, null, '/');
        }).catch(()=>{
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(()=>{
            axios.post('http://localhost:3001/refresh',{
            refreshToken,
        }).then(res =>{
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn); //res.data.expiresIn
            // window.history.pushState({}, null, '/');
        }).catch(()=>{
            window.location = '/'
        })
        },(expiresIn - 60 )*1000)
        return()=>clearInterval(interval)
    }, [refreshToken,expiresIn])
    return accessToken;
}