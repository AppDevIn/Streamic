import cookie from 'js-cookie'
import Router from 'next/router'

export function handleRegister(token) {
    cookie.set('token', token)

    //Regirect to another route
    Router.push('/index')
}


export function handleLogin(user) {


    //Regirect to another route
    Router.push('/index')
}


export function redirectUser(ctx, loction) {
    // console.log(location);
    // if (ctx.req) {
    //     ctx.res.writeHead(302, { Location: location })
    //     ctx.res.end()
    // } else {
    //     Router.push(location)
    // }
}