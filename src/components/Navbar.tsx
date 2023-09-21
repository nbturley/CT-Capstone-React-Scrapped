import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {

    const [isVisible, setIsVisible] = useState(false);

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const signOutOnClick = () => {
        logout();
    };

    const signInOnClick = () => {
        loginWithRedirect();
    };
    
    const dropDown = () => {
        setIsVisible(!isVisible)
    }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to='/' className="font-semibold text-2xl tracking-tight">Cars</Link>
        </div>
        <div className="block">
            <button onClick={dropDown} className="flex items-center px-3 py-2 text-white border rounded border-white hover:text-gray-500 hover:border-gray-500">
                <i className='fas fa-bars'></i>
            </button>
        </div>
        { isVisible ? (
            <div className='w-full block flex-grow items-center'>
                <div className="text-sm lg:flex-grow m-4">
                    <button className='p-2 m-5 bg-black hover:bg-gray-500 border rounded-lg hover:border-gray-500 text-center'>
                        <div>
                            <Link to='/' className='flex place-items-center lg:inline-block mt-0 text-white hover:bg-gray-500'>Home</Link>
                        </div>
                    </button>
                    <button className='p-2 m-5 bg-black hover:bg-gray-500 border rounded-lg hover:border-gray-500 text-center'>
                        <div>
                            <Link to='/dashboard' className='flex place-items-center lg:inline-block mt-0 text-white hover:bg-gray-500'>Dashboard</Link>
                        </div>
                    </button>
                    {
                        !isAuthenticated ?
                        <button className='p-2 m-5 bg-black hover:bg-gray-500 border rounded-lg hover:border-gray-500 text-center'>
                            <div>
                                <Link to="/" onClick={signInOnClick} className='flex place-items-center lg:inline-block mt-0 text-white hover:bg-gray-500'>
                                    Login
                                </Link>
                            </div>
                        </button>
                        :
                        <button className='p-2 m-5 bg-black hover:bg-gray-500 border rounded-lg hover:border-gray-500 text-center'>
                            <div>
                                <Link to="/" onClick={signOutOnClick} className='flex place-items-center lg:inline-block mt-0 text-white hover:bg-gray-500'>
                                    Sign Out
                                </Link>
                            </div>
                        </button>
                    }
                </div>
            </div>
            ) : (
            <></>
            ) }
    </nav>
  )
}

export default Navbar