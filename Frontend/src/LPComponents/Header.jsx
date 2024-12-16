import { Link } from 'react-scroll';
import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='block w-full max-w-screen-2xl px-4 py-2 mx-auto text-black bg-white shadow-md rounded-md lg:px-8 lg:py-3 mt-10 sticky top-0 z-10'>
      <div className='container flex flex-wrap items-center justify-between mx-auto text-slate-800'>
        <a
          href='#'
          className='mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold'
        >
          PRE- Preparation
        </a>
        <div className='hidden lg:block'>
          <ul className='flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
            <li className='flex items-center p-1 text-sm gap-x-2 text-slate-600 cursor-pointer hover:scale-150 hover:duration-300 '>
              <Link
                to='signIn'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={closeMenu}
                className='flex items-center'
              >
                Home
              </Link>
            </li>
            <li className='flex items-center p-1 text-sm gap-x-2 text-slate-600  cursor-pointer hover:scale-150 hover:duration-300'>
              <Link
                to='contactUs'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={closeMenu}
                className='flex items-center'
              >
                Contact us
              </Link>
            </li>
            <li className='flex items-center p-1 text-sm gap-x-2 text-slate-600 cursor-pointer hover:scale-150 hover:duration-300'>
              <Link
                to='aboutUs'
                className='flex items-center'
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onClick={closeMenu}
              >
                About us
              </Link>
            </li>
          </ul>
        </div>
        <button
          className='relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden'
          type='button'
          onClick={toggleMenu}
        >
          <span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </span>
        </button>

        {isMenuOpen && (
          <div className='w-full lg:hidden'>
            <ul className='flex flex-col gap-2 mt-4 mb-4 bg-white rounded-lg shadow-lg p-4'>
              <li className='flex items-center p-2 text-sm gap-x-2 text-slate-600 cursor-pointer hover:bg-slate-100 rounded-md transition-all'>
                <Link
                  to='signIn'
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  onClick={closeMenu}
                  className='flex items-center w-full'
                >
                  Home
                </Link>
              </li>
              <li className='flex items-center p-2 text-sm gap-x-2 text-slate-600 cursor-pointer hover:bg-slate-100 rounded-md transition-all'>
                <Link
                  to='contactUs'
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  onClick={closeMenu}
                  className='flex items-center w-full'
                >
                  Contact us
                </Link>
              </li>
              <li className='flex items-center p-2 text-sm gap-x-2 text-slate-600 cursor-pointer hover:bg-slate-100 rounded-md transition-all'>
                <Link
                  to='aboutUs'
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  onClick={closeMenu}
                  className='flex items-center w-full'
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
