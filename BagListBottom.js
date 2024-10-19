import React, { useEffect } from "react";
import "./BagListBottom.css";

function BagLisBottom({ total, bagListRef }) {

    useEffect(() => {
        const shopping = document.querySelector('.shoppingCta');

        shopping.addEventListener("click", () => {
            if (bagListRef.current) {
                bagListRef.current.style.transform = "translateX(100%)";  
            }
        });

        return () => {
            shopping.removeEventListener("click", () => {});
        };
    }, [bagListRef]);

    return (
        <div className="bagListBottom">
            <div className="total">
                <span>Grand Total:</span>
                <span>{total}</span> {/* Exibir o total formatado */}
            </div>
            <div className="bagCtas">
                <button className="ctaBtn shoppingCta">Continue Shopping</button>
                <button className="ctaBtn buyBtn">Proceed to Checkout</button>
            </div>
        </div>
    );
}

export default BagLisBottom;
