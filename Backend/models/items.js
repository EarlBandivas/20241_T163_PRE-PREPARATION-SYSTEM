import mongoose from 'mongoose';
import Type from './types.js';

const itemSchema = new mongoose.Schema({

    item: {
        type: String,
        required: true,
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        // required: true,
      },
});

const item = mongoose.model('Item', itemSchema);
export default item;
