import React, { useState } from "react";
import { NextPage } from "next";
import { Animal, PrismaClient } from "@prisma/client";
import InputField from "../../components/forms/InputField";
import styles from "../../styles/Animal.module.css";
import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/Layout";

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
  const [adoptionFormVisibility, setFormVisibility] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const adoptionFormObject = new FormData(event.target);

    const obj = [...adoptionFormObject.entries()].reduce(
      (acc: any, curr: [string, FormDataEntryValue]) => {
        acc[curr[0]] = curr[1];

        return acc;
      },
      { firstName: null, email: null, lastName: null }
    );
  };

  return (
    <>
      <Head>
        <title>Adoption-demo - Animal</title>
        <meta
          name="description"
          content="The animal page of the Adoption-demo"
        />
      </Head>
      <Layout>
        {animal ? (
          <section className={styles["animal"]}>
            <div>
              {animal.images.map((img, idx) => (
                <Image key={idx} src={img} alt="" width={300} height={300} />
              ))}
            </div>

            <div className={styles["animal__name-description"]}>
              <h1>{animal.name}</h1>
              <p>{animal.description}</p>
            </div>

            <div className={styles["animal__adopt"]}>
              <div className={styles["animal__info"]}>
                <div>{animal.age}</div>
                <div>{animal.type}</div>
                <div>{animal.status}</div>
                <div>{animal.gender}</div>
              </div>

              <div className={styles["animal__action-adopt"]}>
                <button
                  onClick={() => setFormVisibility(!adoptionFormVisibility)}
                >
                  Adopt
                </button>
              </div>
            </div>

            {adoptionFormVisibility ? (
              <form
                className={styles["animal__submit-form"]}
                onSubmit={(event) => handleSubmit(event)}
              >
                <InputField
                  type="string"
                  name="firstName"
                  placeholder="First name"
                />

                <InputField
                  type="string"
                  name="lastName"
                  placeholder="Last name"
                />

                <InputField type="string" name="email" placeholder="Email" />

                <button type="submit">Submit</button>
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
