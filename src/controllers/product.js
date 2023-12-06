import Product from '../models/product';

class ProductsControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Get all products
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    const queryParams = ctx.request.query
    const queryConditions = {}
    if (queryParams.lv1) {
      queryConditions.lv1 = queryParams.lv1;
    }

    if (queryParams.lv2) {
      queryConditions.lv2 = queryParams.lv2;
    }

    if (queryParams.lv3) {
      queryConditions.lv3 = queryParams.lv3
    }

    if (queryParams.lv4) {
      queryConditions.lv4 = queryParams.lv4
    }

    if (queryParams.subPlatform) {
      queryConditions.subPlatform = queryParams.subPlatform
    }
    const res = await Product.find(queryConditions).skip((queryParams.current - 1) * queryParams.pageSize).limit(queryParams.pageSize)
    const totalCount = await Product.countDocuments(queryConditions)
    ctx.body = { data: res, total: totalCount, success: true }
  }

  /**
   * Find a product
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const product = await Product.findById(ctx.params.id);
      if (!product) {
        ctx.throw(404)
      }
      ctx.body = product
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500)
    }
  }

  /**
   * Add a product
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const product = await new Product(ctx.request.body).save();
      ctx.body = product
    } catch (err) {
      ctx.throw(422)
    }
  }

  /**
   * Update a product
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const product = await Product.findByIdAndUpdate(ctx.params.id, ctx.request.body)
      if (!product) {
        ctx.throw(404)
      }
      ctx.body = product
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Delete a product
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const product = await Product.findByIdAndRemove(ctx.params.id);
      if (!product) {
        ctx.throw(404)
      }
      ctx.body = product
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  async findLv1List(ctx) {
    try {
      const lv1List = await Product.distinct('lv1')
      if (!lv1List) {
        ctx.throw(404)
      }
      ctx.body = lv1List.filter(item => item !== "")
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  async findLv2List(ctx) {
    const queryParams = ctx.request.query
    try {
      const lv2List = await Product.find({ lv1: queryParams.lv1 }).distinct('lv2')
      if (!lv2List) {
        ctx.throw(404)
      }
      ctx.body = lv2List.filter(item => item !== "")
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  async findLv3List(ctx) {
    const queryParams = ctx.request.query
    try {
      const lv3List = await Product.find({ lv2: queryParams.lv2 }).distinct('lv3')
      if (!lv3List) {
        ctx.throw(404)
      }
      ctx.body = lv3List.filter(item => item !== "")
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  async findLv4List(ctx) {
    const queryParams = ctx.request.query
    try {
      const lv4List = await Product.find({ lv3: queryParams.lv3 }).distinct('lv4')
      if (!lv4List) {
        ctx.throw(404)
      }
      ctx.body = lv4List.filter(item => item !== "")
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  async findSubPlatformList(ctx) {
    try {
      const subPlatformList = await Product.distinct('subPlatform')
      if (!subPlatformList) {
        ctx.throw(404)
      }
      ctx.body = subPlatformList.filter(item => item !== "")
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  async findStatBySubPlatform(ctx) {
    try {
      // 使用聚合管道进行分类统计
      const aggregateResult = await Product.aggregate([
        {
          $group: {
            _id: '$subPlatform', // 按 subPlatform 字段进行分组
            totalSales: { $sum: '$sales' }, // 计算每组的 sales 总和
            totalSalesVolume: { $sum: '$salesVolume' }
          },
        },
      ]);
      ctx.body = aggregateResult
    } catch (err) {
      if (err.name === 'CastError' || err.name === "NotFoundError") {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new ProductsControllers()
