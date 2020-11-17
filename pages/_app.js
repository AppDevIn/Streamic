import '../styles/globals.css'
import App from "next/app";
import Layout from '../components/_App/Layout';

<<<<<<< HEAD

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
=======
class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

    let pageProps = {}

    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
>>>>>>> master
}

export default MyApp;

