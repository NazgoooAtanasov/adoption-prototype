import { NextPage } from "next";
import Image from "next/image";
import { Animal, PrismaClient } from "@prisma/client";
import styles from "../../styles/Animal.module.css";
import Head from "next/head";
import Layout from "../../components/Layout";
import { FormEvent, useState } from "react";
import InputField from "../../components/forms/InputField";
import joinstyles from "../../styles/Join.module.css";

export const getStaticPaths = async () => {
  const prisma = new PrismaClient();
  const animals = await prisma.animal.findMany({
    select: { id: true },
  });

  return {
    paths: animals.map((animal) => {
      return { params: { id: animal.id } };
    }),
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const prisma = new PrismaClient();
  const id = context.params.id;

  const animal = await prisma.animal.findFirst({
    where: { id },
  });

  return { props: { animal } };
};

const Animal: NextPage<{ animal: Animal }> = ({ animal }) => {
  const [showRequestForm, setShowRequestForm] = useState<boolean>(false);
  const [showError, setError] = useState<string | null>(null);
  const [showSuccess, setSuccess] = useState<string | null>(null);

  async function createRequest(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const json: {
      [key: string]: string | undefined | null;
    } = {};
    [...formData.keys()].forEach((key) => {
      json[key] = formData.get(key)?.toString();
    });

    const createRequest = await fetch("/api/animal/request", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(json),
    });

    const createResponse: { success: boolean; message: string } =
      await createRequest.json();

    if (!createResponse.success) {
      setError(createResponse.message);
    } else {
      setSuccess(createResponse.message);
    }
  }

  return (
    <>
      <Head>
        <title>Adoption - Animal</title>
        <meta name="description" content="The animal page of the Adoption" />
        <meta name="color-scheme" content="light only" />
      </Head>
      <Layout>
        {animal ? (
          <section className={styles["animal"]}>
            <div className={styles["animal__image"]}>
              <Image
                src={`https://imagedelivery.net/Ed3hEAVVzEILb2ejGtGJBQ/${animal.images[0]}/public`}
                alt={animal.name}
                loading="eager"
                layout="fill"
              />
            </div>

            <h1 className={styles["animal__name"]}>{animal.name}</h1>
            <p className={styles["animal__description"]}>
              {animal.description}
            </p>

            <div className={styles["animal__info"]}>
              <div>Age</div>
              <div>{animal.age}</div>
              <div>Breed</div>
              <div>{animal.type}</div>
              <div>Gender</div>
              <div>{animal.gender}</div>
              <div>Health status</div>
              <div>{animal.status}</div>
              <div>Location</div>
              <div>{animal.location}</div>
            </div>

            <button
              onClick={() => setShowRequestForm(!showRequestForm)}
              className={styles["submit-request"]}
            >
              Submit adoption request
            </button>

            {showRequestForm ? (
              <form onSubmit={createRequest}>
                {showError ? (
                  <div className={joinstyles["error-message"]}>{showError}</div>
                ) : (
                  <></>
                )}
                {showSuccess ? (
                  <div className={joinstyles["success-message"]}>
                    {showSuccess}
                  </div>
                ) : (
                  <></>
                )}
                <InputField
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                />

                <InputField
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                />

                <InputField type="email" name="email" placeholder="Email" />

                <InputField
                  type="text"
                  name="description"
                  placeholder="Addition information"
                />

                <InputField type="hidden" name="animalId" value={animal.id} />

                <button type="submit" className={styles["submit-request"]}>
                  Submit
                </button>
              </form>
            ) : (
              <></>
            )}
          </section>
        ) : (
          <></>
        )}
      </Layout>
    </>
  );
};

export default Animal;
