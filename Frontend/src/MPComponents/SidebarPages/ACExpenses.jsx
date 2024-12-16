import { useState, useEffect } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';

function ACExpenses() {
  const [formData, setFormData] = useState({
    sportsAndEquipments: '',
    honorarium: '',
    travelingExpenses: '',
    officeSuppliesExpenses: '',
    drugsAndMedicineExpenses: '',
    gasolineOilAndLubricants: '',
    otherSuppliesMaterialsExpenses: '',
    telephoneExpensesMobile: '',
    membershipDuesContributions: '',
    rentExpensesBuildingStructures: '',
    rentExpensesMotorVehicle: '',
    rentExpensesEquipment: '',
    representationExpenses: ''
  });

  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (isUpdating) {
      try {
        const response = await axios.put(`http://localhost:5000/users/expenses/${selectedExpense._id}`, formData);
        console.log('Data updated:', response.data);
        alert('Data has been successfully updated!');
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === selectedExpense._id ? { ...expense, ...formData } : expense
          )
        );
        setIsUpdating(false);
        resetForm();
      } catch (error) {
        console.error('Error updating data:', error);
        alert('Error updating data. Please try again.');
      }
    } else {
      try {
        const date = new Date().toLocaleString();
        const response = await axios.post('http://localhost:5000/users/expenses', formData);
        console.log('Data submitted:', response.data);
        alert('Data has been successfully added!');
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          { date, expenseType: 'Fiduciary Expenses', ...formData }
        ]);
        resetForm();
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting data. Please try again.');
      }
    }
  };

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
  };

  const handleEdit = (expense) => {
    const { _id, ...editableData } = expense; // Exclude _id
    setFormData(editableData);
    setSelectedExpense(expense);
    setIsUpdating(true);
  };

  const resetForm = () => {
    setFormData({
      sportsAndEquipments: '',
      honorarium: '',
      travelingExpenses: '',
      officeSuppliesExpenses: '',
      drugsAndMedicineExpenses: '',
      gasolineOilAndLubricants: '',
      otherSuppliesMaterialsExpenses: '',
      telephoneExpensesMobile: '',
      membershipDuesContributions: '',
      rentExpensesBuildingStructures: '',
      rentExpensesMotorVehicle: '',
      rentExpensesEquipment: '',
      representationExpenses: ''
    });
  };

  const closeModal = () => {
    setSelectedExpense(null);
    setIsUpdating(false);
  };

  return (
    <div>
      <div className='flex justify-center mb-8'>
        <Typography className='text-2xl'>
          Athletics and Cultural Expenses
        </Typography>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 m-6'>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <Input
              variant='static'
              label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <Button color='green' onClick={handleSubmit}>{isUpdating ? 'Update' : 'Add'}</Button>
      </div>

      <div className='mt-8'>
        <Typography className='text-2xl mb-4'>Submitted Fiduciary Expenses</Typography>
        <table className='min-w-full table-auto'>
          <thead>
            <tr className='border-b'>
              <th className='px-4 py-2'>Date Submitted</th>
              <th className='px-4 py-2'>Type of Fiduciary Expense</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className='border-b text-center'>
                <td className='px-4 py-2'>{new Date(expense.createdAt).toLocaleString()}</td>
                <td className='px-4 py-2'>{expense.expenseType || 'Athletics and Cultural Expenses'}</td>
                <td className='px-4 py-2'>
                  <Button color='blue' onClick={() => handleViewDetails(expense)}>View</Button>
                  <Button color='yellow' onClick={() => handleEdit(expense)} className='ml-2'>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedExpense && !isUpdating && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75'>
          <div className='bg-white p-6 rounded-lg'>
            <Typography className='text-2xl mb-4'>Expense Details</Typography>
            <div className='space-y-2'>
              {Object.keys(selectedExpense).map((key) => (
                key !== '_id' && ( // Exclude the ID from the modal display
                  <div key={key}>
                    <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {selectedExpense[key]}
                  </div>
                )
              ))}
            </div>
            <div className='mt-4'>
              <Button color='red' onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ACExpenses;
