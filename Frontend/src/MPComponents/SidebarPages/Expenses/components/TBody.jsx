/* eslint-disable react/prop-types */

function TBody({handleDelete, toggleModal, expenses}) {    
  return (
    <tbody>
        {expenses?.map((expense)=>{
            return(
                <tr key={expense._id}>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>{expense._id}</td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>$ {expense.amount}</td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>{expense.item.item}</td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>{expense.type.type}</td>
                    <td className='px-6 py-4 text-sm text-gray-700 border-b'>
                    <button className='edit px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-300 rounded-md mr-2'
                    onClick={toggleModal}>
                        Edit
                    </button>
                    <button className='px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md'
                    onClick={()=> handleDelete(expense._id)}>
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