const internals = {}

import item from '../../models/items.js'


internals.get = async (req, res) => {
    try {

        const items = await item.find().populate('type')
        res.status(200)
        .json({
          message: 'Item o',
          response: items,
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
        const newItem = new item({ 
            item: req.body.item,
            type: req.body.type,

            
        });
        newItem.save();
        res.status(200)
        .json({
          message: 'Type added successfully',
          response: newItem,
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
        const deleteItem = await item.deleteOne({_id: dlt})
        res.status(200)
        .json({
        message: 'Type deleted successfully',
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