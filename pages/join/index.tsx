import { NextPage } from "next";
import { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Join.module.css";
import JoinFormHandler, { JOIN_TYPE } from "../../components/JoinFormHandler";

const Join: NextPage = () => {
  const [type, setType] = useState<JOIN_TYPE | null>(null);
  return (
    <Layout>
      <main className={styles["user-type"]}>
        <section className={styles["type"]}>
          <button onClick={() => setType(JOIN_TYPE.USER)}>
            <h3>Join as user</h3>
            <p>
              As a normal user you will have the possibility to browse animals
              to adopt and submit adoption requests
            </p>
          </button>
        </section>
        <section className={styles["type"]}>
          <button onClick={() => setType(JOIN_TYPE.ORGANIZATION)}>
            <h3>Join as organization</h3>

            <p>
              As organization you will have the possibility to enlist animals
              for adoption and review submissions for adoption.
            </p>
          </button>
        </section>

        <JoinFormHandler type={type} />
      </main>
    </Layout>
  );
};

export default Join;
