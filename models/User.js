const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    
    nome: {
      type: String,
      required: true, 
    },
   
    email: {
      type: String,
      required: true, 
      unique: true,     
    },
  
    senha: {
      type: String,
      required: true, 
    },
   
    cidade: {
      type: String,
    },
    
    avatar: {
      type: String,
      default: 'https://picsum.photos/seed/default/200/200', 
    },
  },
  {

    timestamps: true,
  }
);


module.exports = mongoose.model('User', userSchema);