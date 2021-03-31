import Head from 'next/head';
import {useRef, useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import DefaultScreen from '../components/DefaultScreen';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
export default function Home() {
  const childRef = useRef(null);
  const toggleRef = useRef(null);
  const [toggled, setToggled] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const ToogleType= !toggled? ToggleMenu : CloseMenu;

  const toggleMenu = () => {
    setToggled(!toggled);
    childRef?.current?.classList.toggle('active');
    toggleRef?.current?.classList.toggle('active');
  }


  
  return (
    <Contaner>
      <Head>
        <title>jooko</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Sidebar forwardedRef={childRef}/>

      <ChatContainer>
        <DefaultScreen/>
      </ChatContainer>
      {width < 767 &&
        <ToogleType onClick={toggleMenu}  ref={toggleRef}/>
      }
      

    </Contaner>
  )
}

const CloseMenu = styled(CloseIcon) `
  position:absolute;
  top:0;
  right:0;
  width:60px !important;
  height:60px !important;
  background-color:#FBBD38;
    cursor:pointer;
    z-index:2;
    >path{
        color:white;
    }

`;

const ToggleMenu = styled(MenuIcon) `
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

const Contaner = styled.div `
  display:flex;
  
`;
const ChatContainer = styled.div `
  flex:1;
    overflow: scroll;
    height:100vh;
    ::-webkit-scrollbar{
        display:none;
    }
    -ms--ms-overflow-style: none;
    scrollbar-width:none;
`;

