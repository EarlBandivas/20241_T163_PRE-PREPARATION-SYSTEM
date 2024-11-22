import React from 'react';

import { EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import {
  Card,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';

function ApprovePage() {
  const TABLE_HEAD = [
    'Report ID',
    'Department',
    'Total Amount',
    'Date Submitted',
    'Actions',
  ];

  const TABLE_ROWS = [
    {
      Report_ID: '#MS-415646',
      department: 'College of Business',
      amount: '$14,000',
      issued: '31 Jan 2024',
      date: '31 Feb 2024',
    },
    {
      Report_ID: '#MS-415647',
      department: 'College of Nursing',
      amount: '$4,000',
      issued: '24 Jan 2024',
      date: '24 Feb 2024',
    },
    {
      Report_ID: '#MS-415648',
      department: 'College of Arts and Sciences',
      amount: '$11,000',
      issued: '12 Jan 2024',
      date: '12 Feb 2024',
    },
  ];
  return (
    <Card className='h-full w-full '>
      <div className='flex justify-start ml-3 md:items-center gap-y-4 flex-col md:flex-row'>
        <div>
          <Typography className='font-bold '>Reports</Typography>
        </div>
      </div>

      <table className='w-full min-w-max  text-left'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className='p-4 pt-10 border-b border-gray-300'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-bold leading-none'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ Report_ID, department, amount, issued, date }) => {
            return (
              <tr key={Report_ID}>
                <td className='p-4 border-b border-gray-300'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-bold'
                  >
                    {Report_ID}
                  </Typography>
                </td>
                <td className='p-4 border-b border-gray-300'>
                  <Typography
                    variant='small'
                    className='font-normal text-gray-600 '
                  >
                    {department}
                  </Typography>
                </td>
                <td className='p-4 border-b border-gray-300'>
                  <Typography
                    variant='small'
                    className='font-normal text-gray-600'
                  >
                    {amount}
                  </Typography>
                </td>
                <td className='p-4 border-b border-gray-300'>
                  <Typography
                    variant='small'
                    className='font-normal text-gray-600'
                  >
                    {issued}
                  </Typography>
                </td>

                <td className='p-4 border-b border-gray-300'>
                  <div className='flex items-center gap-2'>
                    <IconButton variant='text' size='sm'>
                      <EyeIcon className='h-6 w-6 text-gray-500' />
                    </IconButton>
                    <IconButton variant='text' size='sm'>
                      <CheckIcon className='h-6 w-6 text-green-500' />
                    </IconButton>
                    <IconButton variant='text' size='sm'>
                      <XMarkIcon className='h-6 w-6 text-red-500' />
                    </IconButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default ApprovePage;
