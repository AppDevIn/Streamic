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