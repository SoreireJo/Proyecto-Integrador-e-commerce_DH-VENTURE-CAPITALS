const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {   
    productDetail: (req, res) => {
        res.render(path.join(__dirname, '../views/products/productDetail'));
    },
    productCreateForm: (req, res) => {
        res.render('productCreateForm');
        res.render(path.join(__dirname, '../views/products/productCreateForm'));
    },
    store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
            image: req.file.filename
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.render(path.join(__dirname, '../views/products/productsList'));
	},

        
    edit: (req, res) => {
     
        const id = req.params.id;
        if (!id) {
        return res.status(400).send('NO ENVIASTE UN ID');
        }

        const product = getProductById(id);
        if (!product) {
        return res.status(404).send('EL PRODUCTO NO EXISTE');
        }

        res.render(path.resolve(__dirname, '../views/products/productEdit'),{product:product});
    },
   
    update: (req, res) => {
        const id = req.params.id;
        const productOrig = getProductById(id);
        const input = req.body;

        const newProduct = {
        ...input,
        id: productOrig.id,
        image: productOrig.image
        };

        updateProduct(newProduct);

        res.redirect(`/products/productDetails/${newProduct.id}`);
    }
}
