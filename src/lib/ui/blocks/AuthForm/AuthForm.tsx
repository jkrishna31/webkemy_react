import styles from "./AuthForm.module.scss";

export interface AuthFormProps {
  mode?: "signin" | "signup" | "reset_password" | "create_password";
}

const AuthForm = ({
  mode,
  ...restProps
}: AuthFormProps) => {
  return (
    <div className={styles.wrapper}>

    </div>
  );
};

export default AuthForm;
