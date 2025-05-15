import { FaSortAmountDown } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";

import DropDownItems from "./DropDownItems";
import { useScreenSize } from "../utils/useScreenSize";
import { useState } from "react";

function DropDown({ onChangeOrder }) {
  const [currentValue, setCurrentValue] = useState("최신순");
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useScreenSize();

  const handleOnChangeValue = (value, label) => {
    setCurrentValue(label);
    onChangeOrder(value);
  };

  return (
    <div onClick={() => setIsOpen((prev) => !prev)}>
      {screenSize === "sm" ? (
        <label>
          <FaSortAmountDown />
        </label>
      ) : (
        <label>
          {currentValue} <FaSortDown />
        </label>
      )}
      {isOpen && <DropDownItems onItemClick={handleOnChangeValue} />}
    </div>
  );
}

export default DropDown;
