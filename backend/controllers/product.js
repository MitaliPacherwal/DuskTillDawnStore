const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.getProductById=(req,res,next, _id)=>{
    Product.findById(_id)
    .populate("category")
    .exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error:"product not found"
            });
        };
       req.product = product;
       next();
         });
    
};

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image"
            });
        }
        //destructure the fields
        const {name, description, price, category,stock} = fields;
        if(!name || 
            !description ||
            !price ||
            !category ||
            !stock)
        {
         return res.status(400).json({
            error:"please include all fields"
         }) ;
        }

        //restrictions on field
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //saving to db
        product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "saving product in db failed"
                })
            }
            return res.json(product)
        })
    });

};

exports.getProduct =(req,res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}

exports.photo =(req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)

    }
    next();
}

//delete controleers
exports.deleteProduct = (req,res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"failrd to delete the product"

            });
        }
        return res.json({
            message:"successfully deleted", 
            deletedProduct
        })
    })

}

//update controleers
exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image"
            });
        }
        
        //updation code
        let product = new Product(fields);
        product = _.extend(product, fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
            product.photo.data= fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //saving to db
        product.save((err, product)=>{
            if(err){
                console.log('ddddddd err', err);
                return res.status(422).json({
                    error: "updating product in db failed"
                })
            }
            return res.json(product)
        })
    });
 }

 //product listing
 exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy =req.query.sortBy ? req.query.sortBy :"_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            })
        }
        return res.json(products)
    });
 };

//  exports.getAllUniqueCategories =(req,res)=>{
//     Product.distinct("category",{},(err, category)=>{
//         if(err){
//             return res.status(400).json({
//                 error:" No category found"
//             })
//         }

//         return res.json(category);
//     })
//  }
 exports.updateStock =(req,res,next)=>{
    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                updtae:{$inc :{stock:-prod.count, sold: +prod.count}}
            }
        }

    })
    Product.bulkWrite(myOperations,{} ,(err, products)=>{
        if(err){
            return res.status(400).json({
                error: "bulk operation failed"
            })
        }
        next();

    })
 };