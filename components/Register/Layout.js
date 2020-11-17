import Head from "next/head";
import { Container } from "semantic-ui-react";

function Layout({ children }) {
    return (
      <>
        <Container text style={{ padding: "1em" }}>
          {children}
        </Container> 
      </>
    );
  }
  
  export default Layout;
  