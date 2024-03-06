import type { ReactNode } from "react";

interface IMainProps {
  children: ReactNode;
}

export const Main: React.FC<IMainProps> = ({
  children,
}: IMainProps): JSX.Element => {
  return <div className="wrapper">{children}</div>;
};
