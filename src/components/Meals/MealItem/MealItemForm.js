import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const itemAmount = amountInputRef.current.value;
    const itemAmountToNumber = +itemAmount; // convert string to number

    if (
      itemAmount.trim().length === 0 ||
      itemAmountToNumber < 1 ||
      itemAmountToNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(itemAmountToNumber);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid number (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
