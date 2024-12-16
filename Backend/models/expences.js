import mongoose from 'mongoose';
import Type from './types.js';
import Item from './items.js';


const expencesSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        // required: true,
      },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        // required: true,
      },
});

const expence = mongoose.model('Expence', expencesSchema);
export default expence;
