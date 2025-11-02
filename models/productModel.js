const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    trim: true,
    maxlength: [100, 'Desc cannot be more than 100 characters']
  },
  imageUrl:  {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
  },
});


module.exports = mongoose.model('Product', productSchema);

