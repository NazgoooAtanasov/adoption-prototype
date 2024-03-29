import InputField from "./forms/InputField";
import styles from "../styles/Join.module.css";
import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

export enum JOIN_TYPE {
  ORGANIZATION,
  USER,
}

type JoinFormProps = {
  reference: MutableRefObject<HTMLElement | null>;
};

async function onSubmit(
  event: FormEvent,
  setError: (...args: any[]) => void,
  setResponse: (...args: any[]) => void
) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);

  setError(null);
  setResponse(null);

  const json: {
    [key: string]: string | undefined | null;
  } = {
    email: null,
    password: null,
    role: null,

    firstname: null,
    lastname: null,
    orgname: null,
  };
  [...formData.keys()].forEach((key) => {
    json[key] = formData.get(key)?.toString();
  });

  const joinRequest = await fetch(`/api/join`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(json),
  });

  const joinResponse: { success: boolean; message: string } =
    await joinRequest.json();

  if (!joinResponse.success) {
    setError(joinResponse.message);
  } else {
    setResponse(joinResponse.message);
  }
}

const UserForm: React.FunctionComponent<JoinFormProps> = ({ reference }) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMesssage] = useState<string | null>(null);

  return (
    <section className={styles["join-section"]} ref={reference}>
      <h2>Join us as an user</h2>

      {error ? <div className={styles["error-message"]}>{error}</div> : <></>}
      {successMessage ? (
        <div className={styles["success-message"]}>{successMessage}</div>
      ) : (
        <></>
      )}

      <form onSubmit={(e) => onSubmit(e, setError, setSuccessMesssage)}>
        <InputField type="text" name="firstname" placeholder="First name" />
        <InputField type="text" name="lastname" placeholder="Last name" />
        <InputField type="email" name="email" placeholder="Email" />
        <InputField type="password" name="password" placeholder="Password" />
        <InputField type="hidden" name="role" value="USER" />

        <button type="submit" className={styles.submit}>
          Register
        </button>
      </form>
    </section>
  );
};

const OrganizationForm: React.FunctionComponent<JoinFormProps> = ({
  reference,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMesssage] = useState<string | null>(null);

  return (
    <section className={styles["join-section"]} ref={reference}>
      <h2>Join us as a organization</h2>

      {error ? <div className={styles["error-message"]}>{error}</div> : <></>}
      {successMessage ? (
        <div className={styles["success-message"]}>{successMessage}</div>
      ) : (
        <></>
      )}

      <form onSubmit={(e) => onSubmit(e, setError, setSuccessMesssage)}>
        <InputField type="text" name="orgname" placeholder="Name" />
        <InputField type="email" name="email" placeholder="Email" />
        <InputField type="password" name="password" placeholder="Password" />
        <InputField type="hidden" name="role" value="ORGANIZATION" />

        <button type="submit" className={styles.submit}>
          Register
        </button>
      </form>
    </section>
  );
};

const JoinFormHandler: React.FunctionComponent<{
  type: JOIN_TYPE | null;
}> = ({ type }) => {
  const reference: MutableRefObject<HTMLElement | null> = useRef(null);

  useEffect(() => {
    reference?.current?.scrollIntoView({ behavior: "smooth" });
  }, [type]);

  if (type === JOIN_TYPE.USER) return <UserForm reference={reference} />;
  if (type === JOIN_TYPE.ORGANIZATION)
    return <OrganizationForm reference={reference} />;

  return <></>;
};

export default JoinFormHandler;
