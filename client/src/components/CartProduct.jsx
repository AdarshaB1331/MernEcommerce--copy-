import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';

const CartProduct = ({ item }) => {
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    dispatch(cartActions.deleteCart(item.id));
  };

  const [quantity, setQuantity] = useState(item.quantity || 1); // Initialize quantity with 1 if not provided
let  total;
if(!quantity){
  total=0;
}else{
  total=item.price*quantity;
}
  const onChange = (e) => {
    let newQuantity = parseInt(e.target.value);

    if(newQuantity>10){
      newQuantity=10;
    }else if(newQuantity<1){
newQuantity=1;
    }else if(!newQuantity){
newQuantity=0;
    }
    setQuantity(newQuantity);
    // Dispatch action to update quantity in the Redux store
    dispatch(cartActions.updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <div>
      <div className="card" style={{ position: 'relative', fontWeight: 'bolder', width: '800px', margin: '50px auto', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span onClick={onDeleteClick} style={{ fontSize: '20px', position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '50%' }}>X</span>
        <div>
          <img style={{ width: '200px', height: 'auto' }} src={item.image} className="card-img-top" alt="..." />
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
          <h3 className="card-title" style={{ textAlign: 'center', width: '100%' }}>{item.title}</h3>
          <h5 className="card-text" style={{ textAlign: 'center', width: '100%' }}>Category: {item.category}</h5>
          <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ marginRight: '10px', width: '100px', textAlign: 'center' }}>Quantity:</span>
            <input onChange={onChange} value={quantity} style={{ width: '100px' }} type='number' />
            <span style={{ marginLeft: 'auto', width: '100px', textAlign: 'center' }}>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;