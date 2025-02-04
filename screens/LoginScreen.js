import AuthContent from '../components/Auth/AuthContent';
import {useState , useContext} from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import {createContext } from 'react'
import { AuthContext } from '../store/auth-context';
function LoginScreen() {

    const [isAuthenticating , setIsAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext);
    async function loginHandler  ({email,password}) {
       setIsAuthenticating(true)
       try{
        const token=  await  login(email, password)
        authCtx.authenticate(token)
       } catch(error){
        Alert.alert('Aurthentication failed',
            "please check your credentials"
        )
        setIsAuthenticating(false)
       }
     
      
   }
   
   if(isAuthenticating ){
       return <LoadingOverlay message='Logging  User...' />
   }
   
  return <AuthContent isLogin  onAuthenticate={loginHandler} />;
}

export default LoginScreen;