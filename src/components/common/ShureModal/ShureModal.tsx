import { CustomButton } from "../CustomButton/CustomButton";
import styles from "./ShureModal.module.scss";

interface IShureModalProps {
  btnOneText: string;
  btnTwoText: string;
  btnOneOnClick: () => void;
  btnTwoOnClick: () => void;
  btnOneClassName: string;
  btnTwoClassName: string;
}

export const ShureModal: React.FC<IShureModalProps> = ({
  btnOneText,
  btnTwoText,
  btnOneOnClick,
  btnTwoOnClick,
  btnOneClassName,
  btnTwoClassName,
}: IShureModalProps): JSX.Element => {
  return (
    <div className={styles.shureModalContainer}>
      <CustomButton
        text={btnOneText}
        className={btnOneClassName}
        onClick={btnOneOnClick}
      />
      <CustomButton
        text={btnTwoText}
        className={btnTwoClassName}
        onClick={btnTwoOnClick}
      />
    </div>
  );
};
