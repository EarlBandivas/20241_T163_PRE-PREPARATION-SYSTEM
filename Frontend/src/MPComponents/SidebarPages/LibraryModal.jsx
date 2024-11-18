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

const LibraryModal = ({ isOpen, onClose }) => {
  const [selectedExpenses, setSelectedExpenses] = useState('Select Expense');

  const handleSelect = (expense) => {
    setSelectedExpenses(expense);
  };

  return (
    <Dialog open={isOpen} handler={onClose} size='lg'>
      <DialogBody>
        <div>
          <Typography className='text-center mb-8 text-2xl'>
            Library Expenses
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
                  <MenuItem onClick={() => handleSelect('Office Equipment')}>
                    Office Equipment
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Furniture and Fixtures')}
                  >
                    Furniture and Fixtures
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSelect(
                        'Information and Communication Technology (ICT) Equip.'
                      )
                    }
                  >
                    Information and Communication Technology (ICT) Equip.
                  </MenuItem>
                  <MenuItem onClick={() => handleSelect('Library Books')}>
                    Library Books
                  </MenuItem>
                  <MenuItem onClick={() => handleSelect('Traveling Expenses')}>
                    Traveling Expenses
                  </MenuItem>
                  <MenuItem onClick={() => handleSelect('Training Expenses')}>
                    Training Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Office Supplies Expenses')}
                  >
                    Office Supplies Expenses
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
                      handleSelect('Printing and Publication Expenses')
                    }
                  >
                    Printing and Publication Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Subscription Expenses')}
                  >
                    Subscription Expenses
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect('Repair and Maintenance-')}
                  >
                    Repair and Maintenance
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSelect('General Services-Student Services')
                    }
                  >
                    General Services-Student Services
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

export default LibraryModal;
