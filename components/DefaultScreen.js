import React from 'react'
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

import Head from 'next/head';
import { Apple, Laptop,AndroidOutlined } from '@material-ui/icons';
function DefaultScreen({chat, messages}) {
    
    return (
        <Container>
            <Head>
                <title>Jokoo: welcom</title>    
            </Head>
            
            <WelcomMessageContainer>
                <LogoContainer>
                    <PhoneImageContainer>
                        <Logo src="/logo/app_02/512.png"/>
                    </PhoneImageContainer>
                </LogoContainer>
                <h1>Welcome to <AppName>Jokoo</AppName> </h1>
                <p>With <AppName>Jokoo</AppName> , you'll get fast, simple, secure messaging free*, available on phones all over the world.</p>
            
            </WelcomMessageContainer>

            <p><AppName>Jokoo</AppName> is availabble on:</p>
            <AvailableDevice>
            <AvailableDeviceItem>
                <AndroidOutlined />
                <p>Android</p>
            </AvailableDeviceItem>
            <AvailableDeviceItem>
                <Apple/>
                <p>Apple</p>
            </AvailableDeviceItem>
            <AvailableDeviceItem>
                <Laptop />
                <p>Web</p>
            </AvailableDeviceItem>
            </AvailableDevice>
            
        </Container>
    )
}


export default DefaultScreen;

const AppName = styled.span `
    color:#FBBD38;
`;

const AvailableDevice = styled.div `
    display:flex;
`;

const AvailableDeviceItem = styled.div `
    display:flex;
    align-items:center;
    cursor:pointer;
    margin:10px;
    > .MuiSvgIcon-root{
        color: #FBBD38;
        margin:5px;
        margin-right: 15px;
    }
    > p{
        margin:0;
    }
`;
const LogoContainer = styled.div `
    border :1px solid whitesmoke;
    width:250px;
    height:250px;
    display :flex;
    flex-direction: column;
    align-items:center;
    padding:50px;
    border-radius:50%
`;

const PhoneImageContainer = styled.div `
    background-color: white;
    background: url(https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png) no-repeat 50%;
    background-size: contain;
    height: 100px;
    width: 100px;
    padding: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const WelcomMessageContainer  = styled.div`
display : flex;
flex-direction: column;
align-items:center;
>h1, p{
    color: white;
}
border-bottom: 1px solid whitesmoke;
`;

const Logo  = styled.img`
    height: 35px;
    width: 35px;   
`

const Container = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color: #262D31;
    z-index:-1;
    color: white;
`;
