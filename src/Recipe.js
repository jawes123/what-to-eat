import {useLocation} from 'react-router-dom';

function Recipe() {
    const location = useLocation()

    return (
        JSON.stringify(location.state)

    );
  };
  
  export default Recipe;