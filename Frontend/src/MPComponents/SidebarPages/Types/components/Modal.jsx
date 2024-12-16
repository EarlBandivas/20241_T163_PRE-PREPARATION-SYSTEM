/* eslint-disable react/prop-types */

import { useState } from "react"


function Modal({modalstatus, toggleModal, modalAction, addType}) {

    const [type, setType] = useState({
        type: ''
    })


    const handleChange = (e) => {
        setType({
            ...type, [e.target.name]:[e.target.value]
        })
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
        <h2 className='text-xl font-semibold mb-4'>{modalAction}</h2>
        
        <form onSubmit={(e)=> e.target.preventDefault}>
            <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600 mb-1'>
                Type
            </label>
            <input 
                name='type'
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter type'
                onChange={(e)=> handleChange(e)}
            />
            </div>

            <div className='flex justify-end'>
            <button
                type='button'
                className='cancel px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2'
                onClick={toggleModal}
            >
                Cancel
            </button>
            <button
                type='submit'
                className='submit px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-300'
                onClick={(e)=>{
                    
                    addType(type.type[0])
                    toggleModal(e)
                }}
            >
            {modalstatus}
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Modal