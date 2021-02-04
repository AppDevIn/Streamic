import Head from "next/head";
import {Navbar, Nav} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { removeCookie } from '../../utils/auth'

function Layout({ children }) {

  function logout() {
    console.log("Logging out");

    removeCookie("token")
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/static/styles/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/nprogress.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/player.module.css" />
        <link rel="icon" href="/static/media/streamix_logo.png"></link>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>Streamic</title>
      </Head>

      <Navbar className="playerNavbar" variant="dark">
        
        <Navbar.Brand href="/">
            <img
                alt=""
                src="/static/media/streamix_logo.png"
                width="40"
                height="40"
                className="d-inline-block align-top ml-3"
            />{' '}
        </Navbar.Brand>

        <span id="brandname">Streamic</span>

        <Nav className="justify-content-end ml-auto">
          <Button color='blue' as='a' href="/profile" >
            Profile Page
          </Button>

          <Button color='red' onClick={() => logout()} >
            Logout
          </Button>
        </Nav >
        
    </Navbar>
      
    <div style={{ padding: "3em" }}>
          {children}
        </div> 
    </>
  );

}

export default Layout;
