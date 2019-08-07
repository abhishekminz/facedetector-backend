const clarifai = require('clarifai');

const app = new clarifai.App({apiKey: '111c0cc840034ca582870082b79a3fd7'});

const clarifaiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => {
        res.json(response);
    })
    .catch(err => res.status(400).json('unable to make an API call'))
}


const handleImage = (req, res, db) => {
    const {id} = req.body;

   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
       res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    clarifaiCall: clarifaiCall
}