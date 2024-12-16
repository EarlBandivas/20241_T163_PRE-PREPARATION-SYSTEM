/* eslint-disable react/prop-types */

import { useState } from "react"


function Modal({modalstatus, toggleModal, modalAction, addExpense, items, types}) {
  
  const [expense, setExpense] = useState({
    amount: '',
    item: '',
    type: ''
})

const handleChange = (e) => {
  setExpense({
        ...expense, [e.target.name]:[e.target.value]
    })    
}
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>{modalAction}</h2>
            <form>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Amount
                </label>
                <input
                  type='number'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter amount'
                  name="amount"
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Item
                </label>
                <select
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter type'
                id="item" name="item"
                onChange={handleChange}
                >
                  <option >Select Item</option>
                  {items?.map((item)=>{
                      return(
                    <option key={item._id} value={item._id}>{item.item}</option>
                      )
                  })}
                </select>
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
                  className='cancel px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2'
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='submit px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-300'
                  onClick={(e)=>{
                    addExpense(e, expense)
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