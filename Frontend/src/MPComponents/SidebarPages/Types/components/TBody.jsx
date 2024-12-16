/* eslint-disable react/prop-types */

function TBody({handleDelete, toggleModal, types}) {
  return (
    <tbody>
        {types?.map((type)=>{
            return(
                <tr key={type._id}>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>{type._id}</td>

                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                    {type.type}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                    <button className='edit px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-300 rounded-md mr-2'
                    onClick={toggleModal}
                    >
                        Edit
                    </button>
                    <button className='px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md'
                    onClick={()=> handleDelete(type._id)}>
                        Delete
                    </button>
                    </td>
                </tr>
            )
        })}
    </tbody>
  )
}

export default TBody