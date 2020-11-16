import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "next/app";
import Layout from '../components/_App/Layout';
import PlayerLayout from '../components/_App/PlayerLayout';


class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

    let pageProps = {}

    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    
    if (!router.pathname.startsWith('/player')) {
      // container
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }else{
      // container fluid
      return (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      );
    }
  }
}

export default MyApp;

