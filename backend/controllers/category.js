const Category = require("../models/category");

exports.getCategoryById = (req, res, next, _id) => {
  Category.findById(_id).exec((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    return res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No categories were found",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  //console.log("Inside update >>>>>>>" + req.category)
  const category = req.category;
  //grabbing category name send from front-end
  category.name = req.body.name;
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "failed to update category",
      });
    }
    return res.json(category);
  });
};

exports.removeCategory = (req, res) => {
  //able to fetch bcz of middleware
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete category",
      });
    }
    return res.json({
      message: "Successfully deleted" + category,
    });
  });
};
