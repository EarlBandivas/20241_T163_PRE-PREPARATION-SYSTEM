import React from 'react';
import { Input } from '@material-tailwind/react';
function Second() {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 m-6'>
      <div>
        <Input variant='static' label='Office Equipments' />
      </div>
      <div>
        <Input variant='static' label='Furniture and Fixtures (see APP)' />
      </div>
      <div>
        <Input
          variant='static'
          label='Information and Communication Technology (ICT) Equip. (see APP)'
        />
      </div>
      <div>
        <Input variant='static' label='Library Books' />
      </div>
      <div>
        <Input
          variant='static'
          label='Honorarium-Journal Referee/editor/lay-out'
        />
      </div>
      <div>
        <Input variant='static' label='Traveling Expenses' />
      </div>
      <div>
        <Input variant='static' label='Trainings Expenses' />
      </div>
      <div>
        <Input variant='static' label='Office Supplies Expenses (see APP)' />
      </div>
      <div>
        <Input
          variant='static'
          label='Other Supplies and Materials Expenses  (see APP)'
        />
      </div>
      <div>
        <Input variant='static' label='Printing and Publication Expenses' />
      </div>
      <div>
        <Input variant='static' label='Subscription Expenses' />
      </div>
      <div>
        <Input
          variant='static'
          label='Repair and Maintenance- Other Structures'
        />
      </div>
      <div>
        <Input variant='static' label='General Services-Student Services' />
      </div>
      <div>
        <Input variant='static' label='General Services' />
      </div>
      <div>
        <Input variant='static' label='Other MOOE' />
      </div>
    </div>
  );
}

export default Second;
