import { Animal } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import InputField from "../../components/forms/InputField";
import Layout from "../../components/Layout";
import styles from "../../styles/Search.module.css";
import galleryStyles from "../../styles/Gallery.module.css";
import Image from "next/image";

const SearchPage: NextPage = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null);

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const formTarget = new FormData(event.target);
    const query = formTarget.get("search");
    const request = await fetch(`/api/search?q=${query}`);
    const { animals } = await request.json();

    setAnimals(animals);
  };

  return (
    <Layout>
      <Head>
        <title>Adoption - Search</title>
        <meta name="description" content="The search page of the Adoption" />
        <meta name="color-scheme" content="light only" />
      </Head>
      <main className={styles["search-page"]}>
        <div className={styles["search-input-holder"]}>
          <form onSubmit={(event) => submitHandler(event)}>
            <InputField type="search" name="search" placeholder="Search" />
          </form>
        </div>

        <section className={galleryStyles["animal-list"]}>
          {animals ? (
            animals.map((animal: Animal, idx: number) => (
              <a key={idx} href={"/animal/" + animal.id}>
                <div className={galleryStyles["animal"]}>
                  <div className={galleryStyles["animal__image"]}>
                    <Image
                      src={`https://imagedelivery.net/Ed3hEAVVzEILb2ejGtGJBQ/${animal.images[0]}/public`}
                      alt={animal.name}
                      layout="fill"
                      loading="lazy"
                    />
                  </div>
                  <h3>{animal.name}</h3>
                  <div className={galleryStyles["animal-card__information"]}>
                    {animal.description}
                  </div>
                </div>
              </a>
            ))
          ) : (
            <></>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default SearchPage;
