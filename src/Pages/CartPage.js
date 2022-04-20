import { Component } from "react";
import { connect } from "react-redux";
import { removeItem,setCurrency } from "../actions";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      qty:0
    }
    this.increment=this.increment.bind(this)
    this.decrement=this.decrement.bind(this)
    this.removeItem=this.removeItem.bind(this)
    this.checkAmountInCurrency=this.checkAmountInCurrency.bind(this)
  
  }
  checkAmountInCurrency(item){
    //check currency in prices attribute of product
   const price=item.prices.filter(price=>
      price.currency.symbol==this.props.currency
    )
    return price[0];
  }

  increment(){
    this.setState({qty:this.state.qty+1})
  }
  decrement(){
    if(this.state.qty>0){
      this.setState({qty:this.state.qty-1})
    }
    
  }
  totalCost(total,currentItem){
    return total+=currentItem.amount*currentItem.qty
  }
  removeItem(id){
    this.props.removeItem(id)
  }
  render() {
    return (
      <div className="cart-page">
         <h1>CART</h1>
        <div className="cart-container">
          <div className="cart-list">
            {this.props.cartItems.map((item) => {
              return (
                <div key={item.id} className="cart-item">
                  <div className="details">
                    <div className="details-name">
                      <strong>{item.name}</strong>
                    </div>
                    <div className="details-price">{this.props.currency} {this.checkAmountInCurrency(item).amount}</div>
                    <div className="details-sizes">
                     <div>S</div>
                     <div>M</div>
                    </div>
                  </div>
                  <div className="product-image-qty">
                    <div className="product-qty">
                      <button onClick={this.increment}>+</button>
                      <div>{this.state.qty}</div>
                      <button onClick={this.decrement}>-</button>
                    </div>
                    <div className="product-image-div">
                      <img src={item.gallery[0]} alt={item.name}/>
                    </div>
                    <div className="remove-btn" onClick={()=>{this.removeItem(item.id)}}><div>X</div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { 
    cartItems: state.cart.items,
    currency:state.currencyState.currency
   };
};
const actionCreators = {
  removeItem,
  setCurrency,
};

export default connect(mapStateToProps, actionCreators)(CartPage);
