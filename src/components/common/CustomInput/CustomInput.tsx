import { useId } from "react";
import type { ChangeEvent, Dispatch } from "react";
import styles from "./CustomInput.module.scss";

export interface ICustomInputProps {
  labelText?: string;
  value: string;
  onChange: Dispatch<React.SetStateAction<string>>;
  className?: string;
  style?: { [key: string]: string | number };
}

export const CustomInput: React.FC<ICustomInputProps> = ({
  labelText,
  value,
  onChange,
  style,
}: ICustomInputProps): JSX.Element => {
  const id = useId();
  return (
    <div style={style} className={styles.inputWrapper}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        value={value}
        id={id}
        type="text"
      />
    </div>
  );
};
