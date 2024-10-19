import React, { useEffect, useRef, useState } from "react";
import "./BagList.css";
import ProductsContainer from './Components/ProductsContainer/ProductsContainer';
import BagListTop from './Components/BagListTop/BagListTop';
import BagLisBottom from './Components/BagListBottom/BagListBottom';

function BagList() {
    const bagListRef = useRef(null);
    const [cartItems, setCartItems] = useState([]); // Inicia o carrinho vazio
    const availableProducts = [ // Lista de produtos disponíveis
        {
            id: 1,
            name: "AirPod Max Black",
            image: "airpods-black.png",
            price: 549,
            quantity: 0
        },
        {
            id: 2,
            name: "AirPod Max White",
            image: "airpods-white.png",
            price: 549,
            quantity: 0
        },
        {
            id: 3,
            name: "AirPod Max Green",
            image: "airpods-green.png",
            price: 549,
            quantity: 0
        },
        {
            id: 4,
            name: "AirPod Max Blue",
            image: "airpods-blue.png",
            price: 549,
            quantity: 0
        },
        {
            id: 5,
            name: "AirPod Max Pink",
            image: "airpods-pink.png",
            price: 549,
            quantity: 0
        }
    ];

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    useEffect(() => {
        const bagElement = document.querySelector('.bag');

        bagElement.addEventListener("click", () => {
            bagListRef.current.style.transform = "translateX(0%)";
        });

        const quantityElement = document.querySelector('.bag .quantity');
        quantityElement.textContent = calculateTotalQuantity();
        
    }, [cartItems]);

    useEffect(() => {
        const handleAddToBag = (event) => {
            const { color } = event.detail;
            const productToAdd = availableProducts.find(item => item.name.includes(color.charAt(0).toUpperCase() + color.slice(1)));

            if (productToAdd) {
                const updatedCartItems = cartItems.map(item => {
                    if (item.id === productToAdd.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });

                if (!updatedCartItems.find(item => item.id === productToAdd.id)) {
                    updatedCartItems.push({ ...productToAdd, quantity: 1 });
                }

                setCartItems(updatedCartItems);
            }
        };

        window.addEventListener('addToBag', handleAddToBag);

        return () => {
            window.removeEventListener('addToBag', handleAddToBag);
        };
    }, [cartItems]);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    const handleIncrement = (itemId) => {
        setCartItems(prevItems => prevItems.map(item => 
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrement = (itemId) => {
        setCartItems(prevItems => {
            return prevItems.map(item => 
                item.id === itemId 
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
                    : item
            ).filter(item => item.quantity > 0);
        });
    };

    const handleRemove = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <div className="bagList" ref={bagListRef}>
            <BagListTop bagListRef={bagListRef}></BagListTop>
            <ProductsContainer 
                cartItems={cartItems} 
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleRemove={handleRemove}
            />
            <BagLisBottom total={formatPrice(calculateTotalPrice())} bagListRef={bagListRef}></BagLisBottom>
        </div>
    );
}

export default BagList;
