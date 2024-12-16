/* eslint-disable react/prop-types */

import { useState } from "react"

function Modal({modalstatus, toggleModal, modalAction, addItem, types}) {
  
  const [item, setItem] = useState({
    item: '',
    type: ''
})


const handleChange = (e) => {
  setItem({
        ...item, [e.target.name]:[e.target.value]
    })
}

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>{modalAction}</h2>
            <form>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Item
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter item'
                  name="item"
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Type
                </label>
              <select
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter type'
                id="type" name="type"
                onChange={handleChange}
                >
                  <option >Select Type</option>
                  {types?.map((type)=>{
                      return(
                    <option key={type._id} value={type._id}>{type.type}</option>
                      )
                  })}
                </select>
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='px-4 cancel py-2 bg-gray-200 text-gray-700 rounded-md mr-2'
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 submit py-2 bg-green-500 text-white rounded-md hover:bg-green-300'
                  onClick={(e)=>{
                    addItem(e, item)
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