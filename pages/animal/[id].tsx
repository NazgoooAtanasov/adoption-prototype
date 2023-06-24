import { NextPage } from "next";
import Image from "next/image";
import { Animal, PrismaClient } from "@prisma/client";
import styles from "../../styles/Animal.module.css";
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
          </section>
        ) : (
          <></>
        )}
      </Layout>
    </>
  );
};

export default Animal;
