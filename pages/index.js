import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import DefaultScreen from '../components/DefaultScreen';
export default function Home() {
  return (
    <Contaner >
      <Head>
        <title>jooko</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar/>

      <ChatContainer>
        <DefaultScreen/>
      </ChatContainer>

    </Contaner>
  )
}

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