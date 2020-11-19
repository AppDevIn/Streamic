import Head from "next/head";
import { Container } from "semantic-ui-react";

function Layout({ children }) {
  return (
    <>
      <Head>
        {/* <HeadContent /> */}
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/player.module.css" />
        <link rel="icon" href="/static/media/streamix_logo.png"></link>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet" />
        <title>Streamic</title>
      </Head>
      {children}

    </>
  );
}

export default Layout;
