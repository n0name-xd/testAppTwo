import type { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface IModalProps {
  children?: ReactNode;
  isShow: boolean;
}

export const Modal: React.FC<IModalProps> = ({
  children,
  isShow,
}: IModalProps): JSX.Element => {
  return (
    <>
      {isShow ? (
        <div className={styles.modalConfiner}>
          <div className={styles.content}>{children}</div>
        </div>
      ) : null}
    </>
  );
};
