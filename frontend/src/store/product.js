import { create } from "zustand";

export const useProductStore = create((set)=> ({
    products: [],
    setProducts: (products) => set({products}),    //Global State 
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image  ){
            return {
                success: false,
                message: "Please Enter all the fields."
            }
        }
        const res = await fetch("/api/products",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state)=> ({products:[...state.products,data.product]}))
        return {
            success: true,
            message: "Product added successfully."
        }
    },
    fetchProducts: async() => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data })
    },
    deleteProducts: async(pid)=> {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message };

        //it will update the UI immediately.
        set(state => ({products: state.products.filter(product=> product.id !== pid) }));
        return {success: true, message: data.message };
    },

    updateProducts: async(pid, updateProducts)=> {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProducts),
        });

        const data = await res.json();
        if(!data.success) return {success: false, message: data.message };
        //it will update the UI immediately.
        set(state => ({
            products: state.products.map(product=> product.id === pid ? data.product : product) 
        }));
        return {success: true, message: data.message };
    }

}));
