import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if(!isAuthenticated){
    loginWithRedirect();
  }
};

export default Login;