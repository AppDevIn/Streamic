import 'bootstrap/dist/css/bootstrap.min.css';
import App from "next/app";
import Layout from '../components/_App/Layout';
import PlayerLayout from '../components/_App/PlayerLayout';
import {parseCookies} from 'nookies'
import {redirectUser} from '../utils/auth'
import baseUrl from '../utils/baseUrl';
import axios from 'axios';


class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

    const {token} = parseCookies(ctx)

    let pageProps = {}
    
    if(!token){
      const isProtectedPath = ctx.pathname !== "/login" && ctx.pathname !== "/register"

      if(isProtectedPath){
        redirectUser(ctx, '/login')
      } 

    }else{
      try{
        const url = `${baseUrl}/api/user`
        const payload = { headers: { Authorization: token  } }
        const response = await axios.get(url, payload)
        
        pageProps.user = response.data
      } catch (error){
        console.log("Error getting the user", error);
      }
    }

    if(Component.getInitialProps){
      const u = pageProps.user
      pageProps = await Component.getInitialProps(ctx, pageProps.user)
      pageProps.user = u
    }
    
    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    
    if (!router.pathname.startsWith('/room')) {
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

