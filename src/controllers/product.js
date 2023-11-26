import Product from '../models/product';

class ProductsControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Get all products
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    console.log(ctx.request.query)
    const queryParams = ctx.request.query
    const queryConditions = {}
    const res = await Product.find(queryConditions).skip((queryParams.current - 1) * queryParams.pageSize).limit(queryParams.pageSize)
    const totalCount = await Product.countDocuments(queryConditions)
    ctx.body = { data: res, total: totalCount, success: true}
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

  /* eslint-enable no-param-reassign */
}

export default new ProductsControllers()
