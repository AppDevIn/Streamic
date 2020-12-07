import Head from "next/head";
import { Container, Icon } from "semantic-ui-react";

import Header from "./Header";
import HeadContent from "./HeadContent";

function PlayerLayout({ children }) {
  return (
    <>
      <Head>
        {/* <HeadContent /> */}
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/nprogress.css" />
        <link rel="icon" href="/static/media/streamix_logo.png"></link>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>Streamic</title>
      </Head>
      {/* <Header /> */}
      {/* {children} */}
      
        {children}
    </>
  );
}

export default PlayerLayout;
