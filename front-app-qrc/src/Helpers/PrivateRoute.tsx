import Home from '../View/Home';

const PrivateRoute = ({children}: { children: JSX.Element }) => {

    return true ? children : <Home/>
}

export default PrivateRoute