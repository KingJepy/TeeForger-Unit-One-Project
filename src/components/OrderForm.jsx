import { useState } from "react";
import './OrderForm.css';
import OrderItem from "./OrderItem";
import MyButton from "./ReusableButton";


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

    //setting up a way to display a message instead of an alert using state
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

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
            setMessage("Slow down, partner! Start your order first.");
            setMessageType("error");
            return;
        } else if (!paymentMethod) {
            setMessage("Hold Up, How You Paying?");
            setMessageType("error");
            return;
        }

        setPaymentConfirmation(true);
        setMessage("Thank You For Your Business. An Email Will Be Sent Out Shortly");
        setMessageType("success");
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
                <MyButton type="submit" label="Update Total" />
            </form>
            {/* separate div so I can align them differently */}
            <div className="order-right">
                <div className="total-cost-table">
                    <h2>Total</h2>
                    <table border="1" cellPadding="8">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Price Each</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {order.map((item) => (
                                // using my order item component
                                <OrderItem
                                    key={item.name}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                />                          
                            ))}
                            <tr key={totalCost}>
                                <td colSpan="3">Total:</td>
                                <td>${totalCost}</td>
                            </tr>                            
                        </tbody>
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
                    {message && (
                        <div className={`message ${messageType}`}>
                            {message}
                        </div>
                    )}
                    {/* using my reusable button */}
                    <MyButton type="submit" label="Confirm Payment" />
                </div>
            </div>
        </div>
    );
};

export default OrderForm;