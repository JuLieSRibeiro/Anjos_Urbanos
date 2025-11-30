const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema(
  {
    
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    
    nome: { type: String, required: true },
    avatar: { type: String },
    text: { type: String, required: true },
    likes: [
      
      { user: { type: Schema.Types.ObjectId, ref: 'User' } }
    ],
  },
  {
    timestamps: true,
  }
);


const postSchema = new Schema(
  {
    
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    
    nome: { type: String, required: true },
    avatar: { type: String },
    cidade: { type: String, required: true },


    mensagem: { type: String, required: true },
    tags: [{ type: String }], 

    
    type: {
      type: String,
      required: true,
      enum: ['pedido', 'oferta'], 
    },

 
    comments: [commentSchema], 
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Post', postSchema);