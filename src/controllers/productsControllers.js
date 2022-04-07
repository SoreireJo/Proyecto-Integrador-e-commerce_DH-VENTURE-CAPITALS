const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {   
    detail: (req, res) => {
        let id = req.params.id;
        let product = products.find(products => products.id == id);
        let descuento =  (products.price*products.discount)/100;
        let precioConDescuento = products.price - descuento; 

        console.log(product)
        res.render('products/productDetail', {product, precioConDescuento});
    },
    productCreateForm: (req, res) => {
        res.render('products/productCreateForm');
    },

    store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
            image: req.file.filename
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.render('products/productsList');
	},
    delete:(req, res) => {
        let id = req.params.id; 

        let ad = products.filter(products => products.id != id);
        console.log(ad)
        fs.writeFileSync(productsFilePath, JSON.stringify(ad))
        res.render('products/productsList');
	},   
    edit: (req, res) => {
        let id = req.params.id
            let productDatos = products.find(product => product.id == id)
            res.render(path.join(__dirname, '../views/products/productEditForm'), {productDatos});
    },
    update: (req, res) => {
        let id = req.params.id;
            let productToChange = products.find(product => product.id == id)
        
            productToChange = {
                id: productToChange.id,
                ...req.body,
                image: productToChange.image,
            };
                
            let newProducts = products.map(product => {
                if (product.id == productToChange.id) {
                    return product = {...productToChange};
                }
                return product;
            })
        
            fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
            // res.render(path.join(__dirname, '../views/products/productDetail/'+ productToChange.id));
            res.render(path.join(__dirname, '../views/products/productDetail'));
    },
}
