import styles from "../../styles/Input.module.css";

export interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  name,
  type,
  placeholder,
  value
}) => {
  return (
    <div className={styles.field}>
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default InputField;
