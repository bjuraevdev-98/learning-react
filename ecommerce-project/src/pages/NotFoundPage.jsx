import { Header } from '../components/Header'
import './NotFoundPage.css'

export function NotFoundPage({ cart }) {
    return (
        <>
            <Header cart={cart}/> 

            <div className="not-found-container">
                <h1>404 | Page Not Found</h1>
            </div>
        </>
    )
}