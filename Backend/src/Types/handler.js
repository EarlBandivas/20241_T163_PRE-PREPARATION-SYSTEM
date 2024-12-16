const internals = {}

import type from '../../models/types.js'


internals.get = async (req, res) => {
    
    try {

        const types = await type.find()
        res.status(200)
        .json({
          message: 'Type o',
          response: types,
        });
    } catch (error) {
        res.status(500)
            .json({ 
                message: 'Error basta error', error: error.message 
            });
    }
}

internals.put = (req, res) => {
        if ( req.body.type == '') {
            res.status(500)
            .json({ 
                message: 'Error basta error'
            });
        }
    
    try {
        const newType = new type({ 
            type: req?.body?.type,
            
        });
        newType.save();
        res.status(200)
        .json({
          message: 'Type added successfully',
          response: newType,
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

    // res.send(req.body)
    
    try {
        const deleteType = await type.deleteOne({_id: dlt})
        res.status(200)
        .json({
        message: 'Type deleted successfully',
        response: deleteType,
        });
        
    } catch (error) {
        res.status(500)
            .json({ 
                message: 'Error basta error', error: error.message 
            });
    }
}



export default internals