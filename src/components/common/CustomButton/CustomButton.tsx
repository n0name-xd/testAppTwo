interface ICustomButtonProps {
  text: string;
  className?: string;
  style?: { [key: string]: string | number };
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  className,
  style,
}: ICustomButtonProps): JSX.Element => {
  return (
    <button style={style} className={className}>
      {text}
    </button>
  );
};
