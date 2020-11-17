import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children }) {
  return (
    <>
      <Head>
        {/* <HeadContent /> */}
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
<<<<<<< HEAD
        <title>Streamic</title>
      </Head>
      {/* <Header /> */}
      <Container text style={{ paddingTop: "1em" }}>
        {children}
      </Container>
=======
        <title>ReactReserve</title>
      </Head>
      {/* <Header /> */}
      {/* {children} */}
      <Container text style={{ paddingTop: "1em" }}>
        {children}
      </Container> 
>>>>>>> master
    </>
  );
}

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> master
