import { Animal, PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/Gallery.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const animals = await prisma.animal.findMany();
  return { props: { animals } };
};

const Gallery: NextPage<{ animals: Animal[] }> = ({ animals }) => {
  const [showOrgMenu, setShowOrgMenu] = useState(false);
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      fetch("/api/validate", {
        method: "POST",
        body: JSON.stringify({ token: jwtToken }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => setShowOrgMenu(response.showOrgMenu));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Adoption - Gallery</title>
        <meta name="description" content="The gallery page of the Adoption" />
        <meta name="color-scheme" content="light only" />
      </Head>
      <Layout showOrgMenu={showOrgMenu}>
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
