import type { Dispatch } from "react";
import { CustomInput } from "../CustomInput/CustomInput";
import { CustomButton } from "../CustomButton/CustomButton";
import styles from "./InputModal.module.scss";

interface IInputModalProps {
  inputValue: string;
  inputOnChange: Dispatch<React.SetStateAction<string>>;
  buttonOneClick: () => void;
  buttonTwoClick: () => void;
  btnOneText: string;
  btnTwoText: string;
}

export const InputModal: React.FC<IInputModalProps> = ({
  inputValue,
  inputOnChange,
  buttonOneClick,
  btnOneText,
  btnTwoText,
  buttonTwoClick,
}: IInputModalProps): JSX.Element => {
  return (
    <div className={styles.inputModalContainer}>
      <CustomInput
        labelText="Input new text"
        value={inputValue}
        onChange={inputOnChange}
      />
      <div className={styles.buttons}>
        <CustomButton text={btnOneText} onClick={buttonOneClick} />
        <CustomButton text={btnTwoText} onClick={buttonTwoClick} />
      </div>
    </div>
  );
};
