import styles from "../../styles/Input.module.css";

export interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  accept?: string;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  name,
  type,
  placeholder,
  value,
  accept,
}) => {
  return (
    <div className={styles.field}>
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        accept={accept}
      />
    </div>
  );
};

export default InputField;
