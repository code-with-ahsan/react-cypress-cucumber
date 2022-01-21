import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from './store';

const Header = () => {
  const credentials = useAppStore(state => state.credentials);
  const isLoggedIn = useAppStore(state => state.isLoggedIn);
  const logOut = useAppStore(state => state.logOut);
  const navigate = useNavigate();
  return (
    <div className='flex py-2 px-4 h-16 bg-gray-800 text-white items-center'>
      <div className='Logo'>
        My GH Projects
      </div>
      <div className="flex-1" />
      <div className='flex items-center'>
        {
          isLoggedIn && 
          <div className="flex items-center">
            <div className="text-sm mr-4">
              {credentials.email}
            </div>
            <button onClick={() => {
              logOut();
              navigate('/login');
            }} className='bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg'>Logout</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Header;