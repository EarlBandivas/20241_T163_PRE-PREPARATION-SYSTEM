import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true,
    },
});

const type = mongoose.model('Type', typeSchema);
export default type;
