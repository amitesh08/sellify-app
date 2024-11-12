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