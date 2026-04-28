import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';
import './HomePage.css'
import '../../components/Header'

export function HomePage({ cart, loadCart }) {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [products, setProducts] = useState([]);

    window.axios = axios;

    useEffect(() => {
        const getHomeData = async () => {
            let url = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(url);
            setProducts(response.data);
        };

        getHomeData();
    }, [search]);

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <title>Ecommerce Project</title>

            <Header cart={cart} setProducts={setProducts} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}