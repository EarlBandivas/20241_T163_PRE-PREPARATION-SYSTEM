import React, { useState } from 'react';
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PhilippinePeso } from 'lucide-react';

const AthleticsModal = ({ isOpen, onClose }) => {
  const [selectedExpenses, setSelectedExpenses] = useState('Select Expense');

  const handleSelect = (expense) => {
    setSelectedExpenses(expense);
  };

  return (
    <Dialog open={isOpen} handler={onClose} size='lg'>
      <DialogBody>
        <div>
          <Typography className='text-center mb-8 text-2xl'>
            Athletics and Cultural Expenses
          </Typography>
          <div className='flex justify-center mb-8 gap-3'>
            <div>
              <Menu placement='bottom-start' portal>
                <MenuHandler>
                  <Button className='flex flex-row' variant='outlined'>
                    {selectedExpenses}
                    <ChevronDownIcon className='h-4 w-4 ml-4' />
                  </Button>
                </MenuHandler>
                <MenuList className='grid grid-cols-3 place-items-center z-[9999]'>
                  <MenuItem onClick={() => handleSelect('Sports Equipment')}>
                    Sports Equipment
                  </MenuItem>
                  <MenuItem onClick={() => handleSelect('Honorarium')}>
                    Honorarium
                  </MenuItem>
                  <MenuItem onClick={() => handleSelect('Traveling Expenses')}>
                    Traveling Expenses
                  </MenuItem>
                  <MenuItem onClick={() => handleSelect('Training Expenses')}>
                    Traveling Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Office Supplies Expenses')}
                  >
                    Office Supplies Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Drugs and Medicine Expenses')}
                  >
                    Drugs and Medicine Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Gasoline, Oil and Lubricants')}
                  >
                    Gasoline, Oil and Lubricants
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSelect('Other Supplies and Materials Expenses')
                    }
                  >
                    Other Supplies and Materials Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSelect(
                        'Membership Dues and Contributions to Organizations'
                      )
                    }
                  >
                    Membership Dues and Contributions to Organizations
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSelect('Rent Expenses-Building & Structures')
                    }
                  >
                    Rent Expenses-Building & Structures
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Rent Expenses-Motor Vehicle')}
                  >
                    Rent Expenses-Motor Vehicle
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Representation Expenses')}
                  >
                    Representation Expenses
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>

            {/* Input Field */}
            <div className='relative flex items-center'>
              <div className='absolute left-3'>
                <PhilippinePeso size={15} />
              </div>
              <Input
                variant='static'
                placeholder='Amount'
                type='number'
                className='pl-10 appearance-none'
              />
            </div>

            {/* Add Button */}
            <div className='flex justify-center'>
              <Button color='green'>Add</Button>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <button
          className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
          onClick={onClose}
        >
          Close
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default AthleticsModal;
