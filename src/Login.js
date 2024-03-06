import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL = `https://accounts.spotify.com/authorize?
client_id=899d75cd32d746b98cf38cd856560cd1&response_type=code&redirect_uri=http://localhost:3000&
scope=streaming%20user-read-email%20user-read-private%20user-library-read%20
user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login(){
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
            <a class="btn btn-success btn-lg" href={AUTH_URL}>Log in with Spotify</a>
        </Container>
    ) 
}