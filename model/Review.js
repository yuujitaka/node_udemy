const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: { type: String, trim: true, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAvarageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      averageRating: Math.ceil(result[0]?.averageRating) || 0,
      numOfReviews: result[0]?.numOfReviews || 0,
    });
  } catch (error) {}
  console.log('aggregate result', result);
};

ReviewSchema.post('save', async function () {
  await this.constructor.calculateAvarageRating(this.product);
});

ReviewSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await this.constructor.calculateAvarageRating(this.product);
  }
);

ReviewSchema.post('findOneAndUpdate', async function (doc) {
  await this.model.calculateAvarageRating(doc.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
