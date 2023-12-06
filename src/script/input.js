const fs = require('fs');
const csvParse = require('csv-parse');
const mongoose = require('mongoose');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true });

// 定义 MongoDB 模型（假设有一个名为 "YourModel" 的模型）
const ProductModel = mongoose.model('ProductModel', {
  // 定义模型字段，与 CSV 文件的列名对应
  // 例如，如果 CSV 文件有 "name" 和 "age" 两列，这里也需要定义这两个字段
  lv1: String,
  lv2: String,
  lv3: String,
  lv4: String,
  subPlatform: String,
  dateTime: String,
  month: String,
  sales: Number,
  salesVolume: Number
  // name: String,
  // age: Number,
});

// 创建一个空数组来存储解析后的 CSV 数据
const results = [];

/**
 * {
 *  lv1: string;
 *  lv2: string;
 *  lv3: string;
 *  lv4: string;
 *  subPlatform: string
 *  dateTime: string
 *  month: string
 *  sales: number
 *  salesVolume: number
 * }
 */

// 读取 CSV 文件并解析数据
fs.createReadStream('input_data.csv')
  .pipe(csvParse.parse({ columns: true }))
  .on('data', (data) => {
    // 处理每一行 CSV 数据，并将其推送到结果数组
    results.push({
      lv1: data[Object.keys(data)[0]],
      lv2: data[Object.keys(data)[1]],
      lv3: data[Object.keys(data)[2]],
      lv4: data[Object.keys(data)[3]],
      subPlatform: data[Object.keys(data)[4]],
      dateTime: data[Object.keys(data)[5]],
      month: data[Object.keys(data)[6]],
      sales: +data[Object.keys(data)[7]],
      salesVolume: +data[Object.keys(data)[8]]
    });
  })
  .on('end', () => {
    // 在读取完成后，将数据保存到 MongoDB
    ProductModel.insertMany(results).then(data => {
      console.log('Data saved to MongoDB successfully.');
      mongoose.disconnect()
    }, error => console.error('Error saving to MongoDB:', error));
  });
