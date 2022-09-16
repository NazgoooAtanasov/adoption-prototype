import InputField from "./forms/InputField";
import styles from "../styles/Join.module.css";
import { MutableRefObject, useEffect, useRef } from "react";

export enum JOIN_TYPE {
  ORGANIZATION,
  USER,
}

type JoinFormProps = {
  reference: MutableRefObject<HTMLElement | null>;
};

const UserForm: React.FunctionComponent<JoinFormProps> = ({ reference }) => {
  return (
    <section className={styles["join-section"]} ref={reference}>
      <h2>Join us as an user</h2>
      <form>
        <InputField type="text" name="firstName" placeholder="First name" />
        <InputField type="text" name="lastName" placeholder="Last name" />
        <InputField type="email" name="email" placeholder="email" />
        <InputField type="password" name="password" placeholder="Password" />

        <button className={styles.submit}>Register</button>
      </form>
    </section>
  );
};

const OrganizationForm: React.FunctionComponent<JoinFormProps> = ({
  reference,
}) => {
  return (
    <section className={styles["join-section"]} ref={reference}>
      <h2>Join us as a organization</h2>
      <form>
        <InputField
          type="text"
          name="organizationName"
          placeholder="Name of organization"
        />
        <InputField
          type="text"
          name="addressOfOrganization"
          placeholder="Address of organization"
        />
        <InputField
          type="email"
          name="email"
          placeholder="emailOfOrganization"
        />

        <button className={styles.submit}>Register</button>
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
