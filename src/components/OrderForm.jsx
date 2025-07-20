import { useState } from "react";
import './OrderForm.css';

function OrderForm () {
    //use state to keep track of our size
    const [sizes, setSizes] = useState([
        { name: 'Small', selected: false, quantity: 1, price: 12},
        { name: 'Medium', selected: false, quantity: 1, price: 14 },
        { name: 'Large', selected: false, quantity: 1, price: 14 },
        { name: 'XL', selected: false, quantity: 1, price: 14 },
        { name: '2X', selected: false, quantity: 1, price: 16 },        
    ]);
    // use state to keep track of the order and total cost
    const [order, setOrder] = useState([]);
    const[totalCost, setTotalCost] = useState(0);

    //use state for payment options
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentConfirmation, setPaymentConfirmation] = useState(false); //start false so you cant hit submit before clicking an option

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
        //set the order to the sizes we have selected so we can access them later
        const selectedSizesForOrder = sizes.filter((size) => size.selected);
        setOrder(selectedSizesForOrder);
        //reduce the array to the selected sizes. calculate total price and save to state
        const total = selectedSizesForOrder.reduce((sum, item) =>
            sum + item.price * item.quantity,0
        );
        setTotalCost(total);
    };

    const confirmPayment = () => {
        if (order.length === 0) {
            alert("Slow Down Partner, Start Your Order First!");
            return;
        } else if (!paymentMethod) {
            alert("Hold Up, How You Paying?");
            return;
        }

        setPaymentConfirmation(true);
        alert("Thank You For Your Business. An Email Will Be Sent Out Shortly")
    }

    return (
        <div className="order-page">
            {/* pass in my submit function so it submits correctly */}
            <form className="order-left" onSubmit={handleSubmit}>
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
                <button type="submit">Update Total</button>

            </form>
            {/* separate div so I can align them differently */}
            <div className="order-right">
                <div className="total-cost-table">
                    <h2>Total</h2>
                    <table border="1" cellPadding="8">
                        <tr>
                            <th>Size</th>
                            <th>Price Each</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        {order.map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.quantity * item.price)}</td>
                            </tr>                           
                        ))}
                        <tr>
                            <td>Total:</td>
                            <td>${totalCost}</td>
                        </tr>
                    </table>     
                </div>
                <div>
                    <h2>Payment Options</h2>
                    <ul className="payment-options">
                        <li>
                            <label>
                                <input 
                                type="radio" 
                                name="payment" 
                                value="debit-credit" 
                                checked={paymentMethod === 'debit-credit'} 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                /> Debit/Credit Card
                            </label>
                        </li>
                        <li>
                            <label>
                                <input 
                                type="radio" 
                                name="payment" 
                                value="google-pay" 
                                checked={paymentMethod === 'google-pay'} 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                /> Google Pay
                            </label>
                        </li>
                        <li>
                            <label>
                                <input 
                                type="radio" 
                                name="payment" 
                                value="apple-pay" 
                                checked={paymentMethod === 'apple-pay'} 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                /> Apple Pay
                            </label>
                        </li>                         
                        <li>
                            <label>
                                <input 
                                type="radio" 
                                name="payment" 
                                value="paypal" 
                                checked={paymentMethod === 'paypal'} 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                /> Paypal
                            </label>
                        </li> 
                    </ul>
                    <button type="button" onClick={confirmPayment}>Confirm Payment</button>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;