import styles from "./CustomButton.module.scss";

interface ICustomButtonProps {
  text: string;
  className?: string;
  style?: { [key: string]: string | number };
  disabled?: boolean;
  onClick: () => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  className,
  style,
  disabled = false,
  onClick,
}: ICustomButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${styles.btn} ${className}`}
    >
      {text}
    </button>
  );
};
