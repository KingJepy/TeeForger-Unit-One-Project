import { useState } from "react";

function OrderForm () {
    //use state to keep track of our size
    const [sizes, setSizes] = useState([
        { name: 'Small', selected: false, quantity: 1 },
        { name: 'Medium', selected: false, quantity: 1 },
        { name: 'Large', selected: false, quantity: 1 },
        { name: 'XL', selected: false, quantity: 1 },
        { name: '2X', selected: false, quantity: 1 },        
    ]);
    //toggle on and off a size
    const toggleSize = (index) => {
        const updated = [...sizes];
        updated[index].selected = !updated[index].selected;
        setSizes(updated);
    };
    //update the quantity of shirts when you click on the size
    const updateQuantity = (index, newQuantity) => {
        const updated = [...sizes];
        updated[index].quantity = parseInt(newQuantity) || 1;
        setSizes(updated);
    };
    //prevent the default submit
    const handleSubmit = (e) => {
        e.preventDefault();
        //when clicked it also collects the sizes and quantities selected
        const order = sizes.filter((size) => size.selected).map((size) => ({
            size: size.name,
            quantity: size.quantity,
        }));
    }

    return (
        <div className="order-page">
            {/* pass in my submit function so it submits correctly */}
            <form onSubmit={handleSubmit}>
                <h2>Select Sizes</h2>
                {/* map over for each size */}
                {sizes.map((size, index) => (
                    <div key={size.name}>
                        <label>
                            <input type="checkbox" checked={size.selected} onChange={() => toggleSize(index)}/>
                            {/* span lets us display the size next to the button */}
                            <span>{size.name}</span>
                        </label>
                        {size.selected && (
                            <input type="number" min="1" value={size.quantity} onChange={(e) => updateQuantity(index, e.target.value)}/>
                        )}
                    </div>
                ))}
                <button type="submit">Place Order</button>

            </form>
            {/* separate div so I can align them differently */}
            <div className="orders-right">
                <ul className="total-cost">
                    
                </ul>
                <ul className="payment-options">

                </ul>
            </div>
        </div>
    );
};

export default OrderForm;