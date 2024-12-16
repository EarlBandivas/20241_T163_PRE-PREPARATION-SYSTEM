const internals = {}

import expence from '../../models/expences.js'


internals.get = async (req, res) => {
    try {

        const expences = await expence.find().populate('item').populate('type')
        res.status(200)
        .json({
          message: 'Item o',
          response: expences,
        });
    } catch (error) {
        res.status(500)
            .json({ 
                message: 'Error basta error', error: error.message 
            });
    }
}

internals.put = (req, res) => {
    try {
        const newExpence = new expence({ 
            amount: req.body.amount,
            item: req.body.item,
            type: req.body.type,
            
        });
        newExpence.save();
        res.status(200)
        .json({
          message: 'Type added successfully',
          response: newExpence,
        });
        
      } catch (error) {
        res.status(500)
            .json({ 
                message: 'Error basta error', error: error.message 
            });
      }
}

internals.delete = async (req, res) => {
    const dlt = req.body._id
    try {
        const deleteItem = await expence.deleteOne({_id: dlt})
        res.status(200)
        .json({
        message: 'Expence deleted successfully',
        response: deleteItem,
        });
        
    } catch (error) {
        res.status(500)
            .json({ 
                message: 'Error basta error', error: error.message 
            });
    }
}



export default internals