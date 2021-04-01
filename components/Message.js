import moment from 'moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';
function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);
    
    const MessaType = user === userLoggedIn.email? Sender : Receiver;
    return (
        <Container>
            <MessaType>
                {message.message}
            
                <TimeStamp>{message.timeStamp ? moment(message.timeStamp).format('LT') : '...'}</TimeStamp> 
            </MessaType>
        </Container>
    )
}

export default Message;

const Container = styled.div ``;

const MessageElement = styled.div`
    width:fit-content;
    padding:15px;
    border-radius:10px;
    margin:10px;
    min-width:70px;
    padding-bottom:26px;
    position:relative;
    text-align:right;
    max-width:65%;
`;


const Sender = styled(MessageElement) `
margin-left :auto;
background-color:#FBBD38;
`;

const Receiver  = styled(MessageElement) `
    background-color:whiteSmoke;
    text-align:left;
`;


const TimeStamp = styled.span `
    color:gray;
    padding:10px;
    font-size:9px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0

`;