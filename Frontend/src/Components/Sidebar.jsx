import React from 'react'
import {FaHome} from 'react-icons/fa'


const Sidebar = ({sidebarToggle}) => {
  return (
      <div className={`transition-transform duration-300 ${sidebarToggle ?  'w-20'  : 'w-64' }w-64 bg-gray-100 fixed h-full px-4 py-3`}>
        <div className='my-2 mb-4'>
          <h1 className={`transition-transform duration-300 ${sidebarToggle ? " hidden " : " "}text-lg text-black font-bold px-2`}>PRE-Preparation System</h1>
        </div> 
        <hr />
        <ul className='mt-5 text-black font-bold'>
          <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-3'>
            <a href="" className='px-3'>
              <img src="/src/assets/dashboard.png" alt="" className='inline-block w-6 h-6 mr-2 -mt-2' />
              <span className= {`transition-transform duration-300 ${sidebarToggle ? " hidden " : " "}`}>Dashboard</span>
            </a>
          </li>

          <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-3'>
            <a href="" className='px-3'>
              <img src="/src/assets/approveBudget.png" alt="" className='inline-block w-6 h-6 mr-2 -mt-2' />
              <span className= {`transition-transform duration-300 ${sidebarToggle ? " hidden " : " "}`}>Approve Budget</span>
            </a>
          </li>
          
          <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-3'>
            <a href="" className='px-3'>
              <img src="/src/assets/manageDepart.png" alt="" className='inline-block w-6 h-6 mr-2 -mt-2' />
              <span className= {`transition-transform duration-300 ${sidebarToggle ? " hidden " : " "}`}>Manage Department</span>
            </a>
          </li>

          <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-3'>
            <a href="" className='px-3'>
              <img src="/src/assets/generateReports.png" alt="" className='inline-block w-6 h-6 mr-2 -mt-2' />
              <span className= {`transition-transform duration-300 ${sidebarToggle ? " hidden " : " "}`}>Generate Reports</span>
            </a>
          </li>

          <li className='mb-2 rounded hover:shadow hover:bg-gray-200 py-3'>
            <a href="" className='px-3'>
              <img src="/src/assets/setting.png" alt="" className='inline-block w-6 h-6 mr-2 -mt-2' />
              <span className= {`transition-transform duration-300 ${sidebarToggle ? " hidden " : " "}`}>Settings</span>
            </a>
          </li>
        </ul>
      </div>
      
   
  )
}

export default Sidebar