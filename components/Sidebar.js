import React ,{useState, useEffect} from 'react'
import styled from 'styled-components'
import {Avatar, IconButton, Button} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator"
import {auth, db} from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat';
import { isMobileDevice } from '../utils';
function Sidebar({toggled, forwardedRef}) {
    const [user]  = useAuthState (auth);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const userChatRef = db.collection("chats")
        .where('users', 'array-contains', user.email);
      
    const [chatsSnapshot] = useCollection(userChatRef);
    const createChat  = () => {
        const input = prompt(
            "please enter an email address for the user you which to chat with"
        );
        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExist(input)&& input !== user.email){
            db.collection('chats').add({
                users:[user?.email, input],

            })
        }
    }

    const chatAlreadyExist = (recipientEmail) => {
        return !!chatsSnapshot?.docs.find(
            chat => chat.data().users.find(user => user === recipientEmail)?.length > 0
        );
    }
    


    return (
        <Container  toggled={toggled} currentScreenWidth={width} ref={forwardedRef}>
           <Header>
               <UserAvatar src={user.photoURL} onClick={() =>auth.signOut()}/>
               <IconsContainer>
                   <IconButton>
                        <ChatIcon/>
                   </IconButton>
                   <IconButton>
                        <MoreVertIcon/>
                   </IconButton>

               </IconsContainer>
           </Header>

           <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search in chats"/>
           </Search>

           <SideBarButton onClick={createChat}>Commencer un discussion</SideBarButton>
            {
                chatsSnapshot?.docs.map(chat => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
                ))
            }
      </Container>
    )
}

export default Sidebar;




const Container  = styled.div `
    z-index:1;
    left: ${props => isMobileDevice (props.currentScreenWidth) ? "-350px":0};
    .MuiSvgIcon-root{
        color: #FBBD38 !important;
    };
    height:100vh;
    flex:${props => !isMobileDevice(props.currentScreenWidth)? "0.45":""};
    background-color:white;
    position:${props => isMobileDevice(props.currentScreenWidth)? "fixed":""};
    border-right : 1px solid whitesmoke;
    max-width:${props => !isMobileDevice(props.currentScreenWidth)? "350px" : ""};
    min-width:${props => !isMobileDevice(props.currentScreenWidth) ? "250px" : ""};

    overflow-y:auto;
    ::-webki-scrollbar{
        display:none;
    }
    -ms-overflow-style:none;
    scrollbar-width:none;

    &.active{
        width:${props => isMobileDevice(props.currentScreenWidth) ? "100%" :"350px"};
        left: ${props => isMobileDevice(props.currentScreenWidth) ? 0 : "auto"};
    }
    transition: all 0.5s;

`;


const SideBarButton  = styled(Button) `
    width:100%;
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
const Search  = styled.div `
    display: flex;
    align-items: center;
    border-radius:2px;
    padding:20px;
`;

const SearchInput  = styled.input `
    outline-width: 0;
    border:none;
    flex:1;
`;
const Header  = styled.div `
    display:flex;
    position:sticky;
    top:0;
    background-color:white;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom:1px solid whitesmoke;
`;

const IconsContainer  = styled.div `

`;

const UserAvatar = styled(Avatar)`
    margin:10px;
    cursor: pointer;
    :hover{
        opacity:0.8;
    }
`;
