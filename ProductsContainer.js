import React from "react";
import "./ProductsContainer.css";

function ProductsContainer({ cartItems, handleIncrement, handleDecrement, handleRemove }) {
    return (
        <ul className="productsContainer">
            {cartItems.length === 0 ? ( // Verifica se o carrinho está vazio
                <li className="emptyCart"></li>
            ) : (
                cartItems.map((item) => (
                    <li className="products" key={item.id}>
                        <div className="bagImg">
                            <img src={`./assets/${item.image}`} alt={item.name} />
                        </div>
                        <div className="producInf">
                            <h6>{item.name}</h6>
                            <span>${item.price.toFixed(2)}</span>
                        </div>
                        <div className="buttons">
                            <button className="delete" onClick={() => handleRemove(item.id)}>x</button>
                            <div className="number">
                                <div className="remove" onClick={() => handleDecrement(item.id)}>-</div>
                                <div className="displayNumber">{item.quantity}</div>
                                <div className="add" onClick={() => handleIncrement(item.id)}>+</div>
                            </div>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}

export default ProductsContainer;
