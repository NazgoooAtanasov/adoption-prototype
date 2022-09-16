import styles from "../../styles/Input.module.css";

export interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  name,
  type,
  placeholder,
}) => {
  return (
    <div className={styles.field}>
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
