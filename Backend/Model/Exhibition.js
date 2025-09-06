let mongoose = require('mongoose');

let exhibitionschema = new mongoose.Schema(
  {
    exhibition_name: {
      type: String,
      required: true,
      trim: true
    },
    addedBy: {
      type: String,
      required: true,
      trim: true
    },
    exhibition_address: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    venue: {
      type: String,
      required: true,
      trim: true
    },
    starting_date: {
      type: Date, // Changed from Number to Date for optimized date handling
      required: true
    },
    ending_date: {
      type: Date, // Changed from Number to Date for optimized date handling
      required: true
    },
    createdby: {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    }, exhibtion_path: {
        type: String,
        required: true
    },
    exhibtion_filename: {
        type: String,
        required: true
    },about_exhibition:{
      type:String,
      required:true
    },layout_path: {
        type: String,
        required: true
    },
  layout_filename: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
);

let exhibitionModel = mongoose.model('exhibitionModel', exhibitionschema);

module.exports = exhibitionModel;
