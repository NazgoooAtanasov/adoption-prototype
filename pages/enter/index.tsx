import { Role } from "@prisma/client";
import { NextPage } from "next";
import { FormEvent, useState } from "react";
import InputField from "../../components/forms/InputField";
import Layout from "../../components/Layout";
import styles from "../../styles/Enter.module.css";

const Enter: NextPage = () => {
  const [formError, setFormError] = useState<string | null>(null);
  async function login(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const json: {
      [key: string]: string | undefined | null;
    } = {
      email: null,
      password: null,
      role: null,
    };
    [...formData.keys()].forEach((key) => {
      json[key] = formData.get(key)?.toString();
    });

    const joinRequest = await fetch(`/api/enter`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(json),
    });

    const joinResponse: { success: boolean; message?: string; token?: string } =
      await joinRequest.json();

    if (!joinResponse.success) {
      setFormError(joinResponse.message!);
    }

    document.cookie = `jwt_token=${joinResponse.token}; SameSite=None; Secure`;
  }
  return (
    <Layout>
      <main className={styles["enter"]}>
        {formError ? (
          <div className={styles["error-message"]}>{formError}</div>
        ) : (
          <></>
        )}

        <form onSubmit={login}>
          <InputField type="email" placeholder="Email" name="email" />
          <InputField type="password" placeholder="Password" name="password" />
          <select className={styles["select-field"]} name="role">
            <option value={Role.USER}>User</option>
            <option value={Role.ORGANIZATION}>Organization</option>
          </select>
          <button className={styles["submit"]} type="submit">
            Submit
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default Enter;
