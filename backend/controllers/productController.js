import { connectDB } from "../config/db.js";


export async function addProduct(req,res) {
    const product = req.body;   //to get details from user .... name | price | price 

    if (!product.name || !product.price || !product.image ){  
        return res.status(400).json({
            success: false,
            message: "Please provide all fields."
        })
    }

    const client = await connectDB();
    try {
        const insertProduct = `
            INSERT INTO products (
                name ,
                price,
                image
            )
            VALUES (
                $1,
                $2,
                $3
            )
            RETURNING *;
        `

        const productValues = [product.name, product.price, product.image]
        const result = await client.query(insertProduct,productValues);
        res.status(201).json({
            success: true,
            message: "product added successfully.",
            product: result.rows[0]
        });
    }
    catch(error){
        console.error("error adding products", error);
        res.status(500).json({
            error: 'Failed to add product' 
        });
    }
    finally{
        client.release();
    }
}

export async function getProduct(req, res){
    const client = await connectDB();
    try {
        const getProductQuery = `
            SELECT * FROM products;
        `
        const result = await client.query(getProductQuery);
        res.status(200).json({
            success: true,
            data: result.rows  //to show all the data in ps.
        });
    } catch (error) {
        console.error("error getting products", error);
        res.status(500).json({
            success: false,
            error: 'Failed to get products' 
        });
    }
    finally{
        client.release();
    }
} 

export async function deleteProduct(req, res){
    const { id } = req.params;
    const client = await connectDB();
    try {
        const deleteProductQuery = `
            DELETE FROM products 
            WHERE id = $1
            RETURNING *;
        `
        const deleteValue = [ id ];

        const result = await client.query(deleteProductQuery,deleteValue);

        if(result.rowCount === 0 ){    //checking if the used id is correct.. | ->rowCount will give you affected row with the query.
            return res.status(404).json({
                success: false,
                message: `Can not find the product with id ${id}` 
            })
        }
        res.status(200).json({
            success: true,
            message: `product id = ${id} has been deleted successfully`
        })
    } catch (error) {
        console.error("error deleting product", error);
        res.status(500).json({
            success: false,
            message: 'failed  to delete products'
        })
    }
    finally{
        client.release();
    }
}

export async function updateProduct(req, res){
    const { id } = req.params;
    const {name, price, image} = req.body;

    if(!id || (!name && !price && !image)){
        return res.status(400).json({
            success: false,
            message: "Please provide the product ID and at least one field to update."
        })
    }

    const client = await connectDB();
    try {
        const updateProductQuery = `
            UPDATE products 
            SET
                name = COALESCE($1, name),
                price = COALESCE($2, price),
                image = COALESCE($3, image),
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = $4
            RETURNING * ;
        `
        const updateValues = [name, price , image, id];
        const result = await client.query(updateProductQuery,updateValues);

        if(result.rowCount === 0 ){    //checking if the product exist.. | ->rowCount will give you affected row with the query.
            return res.status(404).json({
                success: false,
                message: `Can not find the product with id ${id}` 
            })
        }
        res.status(200).json({
            success: true,
            message: "product updated successfully", 
            product: result.rows[0]
        })
    } catch (error) {
        console.error("error while updating product", error);
        res.status(500).json({
            success: false,
            message: "failed to update product."
        })
    }
    finally{
        client.release()
    }
}