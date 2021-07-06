// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTags');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
//defines category having many products, creating a foreign key in Category table
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
// Products belongToMany Tags (through ProductTag)
// Defines the third table needed to store the foreign keys
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
// Define an alias for when data is retrieved
as: 'product_tags'
});

// Tags belongToMany Products (through ProductTag)
// Defines the third table needed to store the foreign keys
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
// Define an alias for when data is retrieved
as: 'price_tags'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
};
