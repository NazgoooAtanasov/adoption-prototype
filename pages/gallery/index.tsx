import { Animal, PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import AnimalCard from "../../components/AnimalCard";
import styles from "../../styles/Gallery.module.css";
import Head from "next/head";

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const animals = await prisma.animal.findMany();
  return { props: { animals } };
};

export const GalleryContainer: React.FunctionComponent<{
  animals: Animal[];
}> = ({ animals }) => {
  return (
    <main className={styles["card-container"]}>
      {animals.length > 0 ? (
        animals.map((animal: Animal, idx: number) => (
          <AnimalCard key={idx} animal={animal} />
        ))
      ) : (
        <></>
      )}
    </main>
  );
};

const Gallery: NextPage<{ animals: Animal[] }> = ({ animals }) => {
  return (
    <>
      <Head>
        <title>Adoption-demo - Gallery</title>
        <meta
          name="description"
          content="The gallery page of the Adoption-demo"
        />
        <meta name="color-scheme" content="light only" />
      </Head>
      <Layout>
        <GalleryContainer animals={animals} />
      </Layout>
    </>
  );
};

export default Gallery;
