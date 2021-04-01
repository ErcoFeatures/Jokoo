import React, {useRef, useState, useEffect} from 'react'
import Head from 'next/head';
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import {db, auth} from "../../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import { getRecipientEmail, isMobileDevice } from '../../utils';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function Chat({chat, messages}) {
    const [user] = useAuthState(auth);
    const childRef = useRef(null);
    const toggleRef = useRef(null);
    const [toggled, setToggled] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    useEffect(() =>{
    if(isMobileDevice(width)){
        setToggled(false);
        childRef?.current?.classList.remove('active');
        toggleRef?.current?.classList.remove('active');
    }
  },[width, chat]);

    const ToogleType= !toggled? ToggleMenu : CloseMenu;

    const toggleMenu = () => {
        setToggled(!toggled);
        childRef?.current?.classList.toggle('active');
        toggleRef?.current?.classList.toggle('active');
    }

    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>

            <Sidebar forwardedRef={childRef}/>

            <ChatContainer width={width}>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>

            <ToogleType  onClick={toggleMenu}  ref={toggleRef}/>
        </Container>
    )
}

export default Chat;


export async   function getServerSideProps  (context)  {
    const ref = db.collection("chats").doc(context.query.id)
    
    // Prep the messages on the server
    const messagesRes = await ref.collection("messages")
        .orderBy('timeStamp', 'desc')
        .get();

    const messages = messagesRes.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    })).map(message => ({
        ...message,
        timeStamp:message.timeStamp.toDate().getTime()
    }));

    // Prep the chats on the server
    const chatRes  =await ref.get();
    const chat = {
        id:chatRes.id,
        ...chatRes.data()
    }

    return {
        props:{
            messages:JSON.stringify(messages),
            chat:chat
        }
    }
}

const CloseMenu = styled(CloseIcon) `
    z-index:10;
    position:absolute;
    top:0;
    right:0;
    width:60px !important;
    height:60px !important;
    background-color:white;
    cursor:pointer;
    z-index:2;
    >path{
        color:#FBBD38;
    }

`;

const ToggleMenu = styled(MenuIcon) `
    z-index:10;
    position:absolute;
    top:0;
    right:0;
    width:60px !important;
    height:60px !important;
    background-color:#FBBD38;
    cursor:pointer;
    >path{
        color:white;
    }
    z-index:2;

`;

const Container = styled.div`
    display:flex;
`;
const ChatContainer = styled.div`
    flex:1;
    position: ${props => isMobileDevice(props.width)? "fixed": "relative"};
    overflow: scroll;
    width: 100%;
    height:100vh;
    ::-webkit-scrollbar{
        display:none;
    }
    -ms--ms-overflow-style: none;
    scrollbar-width:none;

`;
