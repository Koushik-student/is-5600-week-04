const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list (options = {}) {

    const { offset = 0, limit = 25, tag } = options;

    const data = await fs.readFile(productsFile)

    return JSON.parse(data)
    .filter(product => {
        if (!tag) {
            return product
        }

        return product.tags.find(( { title }) => title == tag)
    })
    .slice(offset, offset + limit)
}

async function get (id) {
    const products = JSON.parse(await fs.readFile(productsFile))

    for (let i = 0; i < products.length; i++ ) {
        if(products[i].id === id) {
          return products[i]
       } 
    }

    return null;
}

// DELETE method
async function deleteProduct(id) {
    // Here we just log the action. In a real scenario, you would delete the product.
    console.log(`Product with ID ${id} was deleted.`);
    return true; // Returning a success flag
}

// PUT method
async function updateProduct(id, updatedData) {
    // Here we just log the action. In a real scenario, you would update the product.
    console.log(`Product with ID ${id} was updated with data:`, updatedData);
    return true; // Returning a success flag
}

module.exports = {
    list,
    get,
    deleteProduct,
    updateProduct
};