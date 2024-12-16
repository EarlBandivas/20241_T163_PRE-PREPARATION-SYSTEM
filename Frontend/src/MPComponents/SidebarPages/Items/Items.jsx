import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from './components/modal';
import TBody from './components/TBody';

function Items() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState()
  const [modalstatus, setModalStatus] = useState()


  const toggleModal = (e) => {
    if (e.target.classList.contains('add')) {
      setIsModalOpen(!isModalOpen);
      setModalAction('Add Item')   
      setModalStatus('Add')  
    }else if (e.target.classList.contains('cancel')) {
      setIsModalOpen(!isModalOpen);
      setModalStatus('')  

      
    }else if (e.target.classList.contains('submit')) {
      setIsModalOpen(!isModalOpen);
      
    }else if (e.target.classList.contains('edit')) {
      setIsModalOpen(!isModalOpen);
      setModalAction('Edit Item')   
      setModalStatus('Edit')  

    }else{
      console.log(e.target.classList);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch('http://localhost:5000/api/items/delete-one', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            _id: id
          }
        ),
      });
    } catch (err) {
      console.log(err);
    }
    getItems()
  }

  const addItem = async (e, typo) =>{
    e.preventDefault()
    
    try {
      await fetch('http://localhost:5000/api/items/add', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            item: typo.item[0],
            type: typo.type[0]
          }
        ),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const [items, setItems] = useState(null)
  const [types, setTypes] = useState(null)

  const getItems = async () => {
    fetch('http://localhost:5000/api/items')
    .then(res => {
      return res.json()
    })
    .then(data => {
      setItems(data.response)
    })
  } 
  
  useEffect(()=>{
    
    getItems()
    fetch('http://localhost:5000/api/types')
    .then(res => {
      return res.json()
    })
    .then(data => {
      setTypes(data.response)
    })
    
  }, [items])

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <Typography>Items</Typography>
        <button
          className='flex add items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600'
          onClick={toggleModal}
        >
          <PlusIcon className='h-6 add w-6 text-white-500' />
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 border-b'>
                ID
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 border-b'>
                Item
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 border-b'>
                Types
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 border-b'>
                Actions
              </th>
            </tr>
          </thead>
          <TBody handleDelete={handleDelete} toggleModal={toggleModal} items={items}/>
        </table>
        <div className='flex justify-start mt-4'>
          <button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
            Submit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && items && types &&(
        <Modal modalstatus={modalstatus} isModalOpen={isModalOpen} toggleModal={toggleModal} modalAction={modalAction} addItem={addItem} types={types}/>
      )}
    </>
  );
}

export default Items;
