import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from './components/Modal';
import TBody from './components/TBody';

function Types() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState()
  const [modalstatus, setModalStatus] = useState()
  
  const toggleModal = (e) => {
      if (e.target.classList.contains('add')) {
        setIsModalOpen(!isModalOpen);
        setModalAction('Add Type')   
        setModalStatus('Add')  
      }else if (e.target.classList.contains('cancel')) {
        setIsModalOpen(!isModalOpen);
        setModalStatus('')  

      }else if (e.target.classList.contains('submit')) {
        setIsModalOpen(!isModalOpen);
        
      }else if (e.target.classList.contains('edit')) {
        setIsModalOpen(!isModalOpen);
        setModalAction('Edit Type')   
        setModalStatus('Edit')  

      }else{
        console.log(e.target);
      }
    };

    const handleDelete = async (id) => {

      try {
        await fetch('http://localhost:5000/api/types/delete-one', {
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
    }

    const addType = async (typo) =>{
      try {
         await fetch('http://localhost:5000/api/types/add', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              type: typo
            }
          ),
        });
      } catch (err) {
        console.log(err);
      }
    }

    const [types, setTypes] = useState(null)

    const getTypes = async () => {
      await fetch('http://localhost:5000/api/types')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setTypes(data.response)
      })
    }

    useEffect(()=>{
      getTypes()
    }, [types])
    
  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <Typography>Types</Typography>
        <button
          className='flex add items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600'
          onClick={toggleModal}
        >
          <PlusIcon className='add h-6 w-6 text-white-500' />
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
                Types
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 border-b'>
                Actions
              </th>
            </tr>
          </thead>
          <TBody handleDelete={handleDelete} toggleModal={toggleModal} types={types} />
        </table>
        <div className='flex justify-start mt-4'>
          <button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
            Submit
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && types && (
        <Modal modalstatus={modalstatus} isModalOpen={isModalOpen} toggleModal={toggleModal} modalAction={modalAction} addType={addType}  />
      )}
    </>
  );
}

export default Types;
