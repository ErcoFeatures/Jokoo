import React , {useState, useRef} from 'react'
import styled from 'styled-components';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useCollection} from 'react-firebase-hooks/firestore';
import {db} from '../firebase'
import { InsertEmoticon } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import firebase from 'firebase';
import Message from './Message';
import { getRecipientEmail } from '../utils';
import TimeAgo from 'timeago-react';

function ChatScreen({chat, messages}) {
    const [user] = useAuthState (auth);
    const [input,  setInput] = useState ("")
    const router = useRouter(); 
    const endOfMessagesRef = useRef(null);
    const [messagesSnapshot] = useCollection(
        db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timeStamp", "asc"));

    const [recipientSnapshot] = useCollection(
        db
        .collection("users")
        .where("email", "==", getRecipientEmail(chat.users, user))
    );
       
    const showMessage = () => {
        if(messagesSnapshot){
            return  messagesSnapshot.docs.map(message =>(
                <Message
                    key={message.id}
                    user={message.data().user}
                    message = {{
                        ...message.data(), 
                        timeStamp: message.data().timeStamp?.toDate().getTime()
                    }}
                />
            ))
        }else{
            return JSON.parse(messages).map(message =>(
                <Message key={message.id} user={message.user} message={message}/>
            ))
        }
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }
    
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            
            } ,{
                merge:true,
            }   
        );
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email, input,
            photoURL:user.photoURL
        });
        setInput('');
        scrollToBottom();
    }

    const recipient  = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(chat.users, user);
    
    return (
        <Container>
            <Header>
                {recipient ? 
                    <Avatar
                        src={recipient.photoURL}
                    />:<Avatar
                        src={recipientEmail[0]}
                    />
                }
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot? (
                        (((new Date()).getTime() - recipient?.lastSeen?.toDate().getTime() ) /1000) < 60 ? 
                        <p>Online</p>: (
                        <p>Last active : {' '}
                        {recipient?.lastSeen?.toDate()? (
                            <TimeAgo
                                datetime={recipient?.lastSeen?.toDate()}
                            />
                            ):(
                                "unavailable "
                            )
                        }
                        </p> 
                        )
                    ):(
                        <p>Loading Last active...</p>
                    )
                    }
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessage()}

                <EndOfMessage ref={endOfMessagesRef}/>

            </MessageContainer>

            <InputContainer>
                <InsertEmoticon/>
                <Input  value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button  onClick={sendMessage}hidden disabled={!input}> Send Message</button>
                <MicIcon/>
            </InputContainer>
        </Container>
    )
}


export default ChatScreen;

const InputContainer = styled.form`
    display:flex;
    align-items:center;
    position:sticky;
    background-color: white;
    z-index:100;
    padding:10px;
    bottom:0;

`;
const Input = styled.input`
    flex:1;
    outline:0;
    border:none;
    border-radius:10px;
    background-color: whitesmoke;
    padding:10px;
    margin:0 15px;


`;
const EndOfMessage = styled.div`
    margin-bottom:50px;

`;
const MessageContainer = styled.div`
    padding:30px;
    background-color: #262D31;
    min-height: 90vh;


`;

const HeaderInformation = styled.div`
    margin-left:15px;
    flex:1;
    > h3{
        margin-bottom:0;
    }

    > P{
        font-size:14px;
        color:gray;
        margin-top:0;
        margin-bottom:23px;

    }
`;

const Header = styled.div`

    position:sticky;
    background-color: white;
    z-index:100;
    top:0;
    display:flex;
    height:80px;
    padding:11px;
    border-bottom:1px solid whitesmoke;
    align-items:center;
`;

const HeaderIcons = styled.div`
.MuiSvgIcon-root{
        color: #FBBD38 !important;
    };
`;

const Container = styled.div`
    
`;
