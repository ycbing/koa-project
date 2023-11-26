import mongoose from 'mongoose';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const productSchema = new Schema({
  lv1: String,
  lv2: String,
  lv3: String,
  lv4: String,
  subPlatform: String,
  dateTime: String,
  month: String,
  sales: Number,
  salesVolume: Number
})

export default mongoose.model('ProductModel', productSchema)
