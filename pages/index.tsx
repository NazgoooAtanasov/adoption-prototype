import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import logo from "../public/adoption-logo.svg";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Adoption-demo - Home</title>
        <meta name="description" content="The home page of the Adoption-demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="light only" />
      </Head>

      <Layout hasLogo={false}>
        <section className={styles.represent}>
          <Image src={logo} alt="logo" height={120} width={1000} />
        </section>
      </Layout>
    </>
  );
};

export default Home;
