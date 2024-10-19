import React, { useEffect } from "react";
import "./BagListTop.css";

function BagListTop({ bagListRef }) {

    useEffect(() => {
        const close = document.querySelector('.close');

        close.addEventListener("click", () => {
            if (bagListRef.current) {
                bagListRef.current.style.transform = "translateX(100%)";
            }
        });

        // Cleanup para evitar múltiplos listeners
        return () => {
            close.removeEventListener("click", () => {});
        };
    }, [bagListRef]);

    return (
        <div className="bagListTop">
            <h5>Order Summary</h5>
            <button className="close">&gt;</button>
        </div>
    );
}

export default BagListTop;