import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import {useState } from 'react'
function SignupScreen() {
    const [isAuthenticating , setIsAuthenticating] = useState(false)

const authCtx = useContext(AuthContext)

 async function signupHandler  ({email,password}) {
    setIsAuthenticating(true)
    try{
        const token =  await  createUser(email, password)
        authCtx.authenticate(token)
       } catch(error){
        Alert.alert('Aurthentication failed',
            "please check your credentials"
        )
        setIsAuthenticating(false)
       }

}

if(isAuthenticating){
    return <LoadingOverlay message='Creating User...' />
}

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;