import styles from '../styles/Home.module.css'
import LoginForm from '../components/LoginForm'
import 'semantic-ui-css/semantic.min.css'
import login from '../styles/Login.module.css'

export default function Login() {
    return (
        <div class="login"> 
            <LoginForm></LoginForm> 
        </div>
    )
}
