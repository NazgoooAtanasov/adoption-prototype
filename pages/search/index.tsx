import { Animal } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import InputField from "../../components/forms/InputField";
import Layout from "../../components/Layout";
import styles from "../../styles/Search.module.css";

import { GalleryContainer } from "../gallery";

const GalleryContainerHanlder: React.FunctionComponent<{
  animals: Animal[] | null;
}> = ({ animals }) => {
  if (!animals) return <div>Type in to search.</div>;

  if (animals.length <= 0) return <div>No results found.</div>;

  return <GalleryContainer animals={animals} />;
};

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
        <title>Adoption-demo - Search</title>
        <meta
          name="description"
          content="The search page of the Adoption-demo"
        />
      </Head>
      <main className={styles["search-page"]}>
        <div className={styles["search-input-holder"]}>
          <form onSubmit={(event) => submitHandler(event)}>
            <InputField type="search" name="search" placeholder="Search" />
          </form>
        </div>

        <GalleryContainerHanlder animals={animals} />
      </main>
    </Layout>
  );
};

export default SearchPage;
