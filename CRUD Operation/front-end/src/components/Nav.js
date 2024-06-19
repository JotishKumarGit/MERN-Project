
// import from react 
import react, { useEffect } from 'react';
// import link from react-router-dom
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

    // For logout (when user is logout than the localstorage is also clean)
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    // If user is already signup than logput btn dikhna chahiye
    const auth = localStorage.getItem('user');

    return (
        // if i click on this link than we go to this location  add,update others
        <div>
            <img className="logo" alt='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQl1nkLCpAH4iEQwrFnV1DxGgWe8jJsxvQiQ&s' />
            {auth ? <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

// Export the Nav
export default Nav;