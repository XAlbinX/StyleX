import "./cart-dropdown.styles.scss"

import Button from "../../component/button/button.component"

const CartDropdown = () =>{

    return(
        <div className="cart-dropdown-container"> 
            <div className="cart-items"/>
            <Button>GO TO CHECKOUT</Button>

        </div>

    )
}

export default CartDropdown;