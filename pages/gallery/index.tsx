import { Animal, PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/Gallery.module.css";
import Head from "next/head";

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const animals = await prisma.animal.findMany();
  return { props: { animals } };
};

const Gallery: NextPage<{ animals: Animal[] }> = ({ animals }) => {
  return (
    <>
      <Head>
        <title>Adoption - Gallery</title>
        <meta name="description" content="The gallery page of the Adoption" />
        <meta name="color-scheme" content="light only" />
      </Head>
      <Layout>
        <main className={styles["animal-list"]}>
          {animals.map((animal: Animal, idx: number) => (
            <a key={idx} href={"/animal/" + animal.id}>
              <div className={styles["animal"]}>
                <div className={styles["animal__image"]}>
                  <Image
                    src={`https://imagedelivery.net/Ed3hEAVVzEILb2ejGtGJBQ/${animal.images[0]}/public`}
                    alt={animal.name}
                    layout="fill"
                    loading="lazy"
                  />
                </div>
                <h3>{animal.name}</h3>
                <div className={styles["animal-card__information"]}>
                  {animal.description}
                </div>
              </div>
            </a>
          ))}
        </main>
      </Layout>
    </>
  );
};

export default Gallery;
