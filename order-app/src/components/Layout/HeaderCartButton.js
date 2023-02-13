import React ,{useContext,useEffect,useState} from "react";
import classes from './HeaderCartButton.module.css';
import CartIcon from'../Cart/CartIcon';
import CartContext from "../../store/cart-context";
const HeaderCartButton = props=>{
    const [btnIsHightlight,setBtnIsHightlight] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items} = cartCtx;

    const numberOfCartItems = cartCtx.items.reduce((curNumber,item) => {
        return curNumber + item.amount;
    } , 0 ); 

    const btnClasses = `${classes.button} ${btnIsHightlight ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length ===0){
            return;
        }
        setBtnIsHightlight(true);
        const timer = setTimeout(()=>{
            setBtnIsHightlight(false);
        },300);
        return () =>{
            clearTimeout(timer);
        }
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>

    </button>
}

export default HeaderCartButton;