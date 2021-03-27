import React from 'react'
import styled from 'styled-components';
import Head from 'next/head'
import { Button } from '@material-ui/core';
import {auth, provider } from '../firebase';
function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="/logo/app_02/512.png"/>
                <Button  onClick={signIn} variant="outlined"> 
                    Sign in with Google
                </Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container  = styled.div`
    display:grid;
    height:100vh;
    place-items:center;

`

const LoginContainer  = styled.div`
padding: 100px;
display : flex;
flex-direction: column;
align-items:center;
background-color: white;
box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Logo  = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom:50px;
`
