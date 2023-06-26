import { FormEvent, useRef, useState } from "react";
import Layout from "../../components/Layout";
import InputField from "../../components/forms/InputField";
import styles from "../../styles/Join.module.css";
import Link from "next/link";

const CreatePage = () => {
  const [animalCreated, setAnimalCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [checkAnimalUrl, setCheckAnimalUrl] = useState(false);
  const animalId = useRef<string | null>(null);

  async function onCreateAnimal(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const json: { [key: string]: string | undefined } = {};
    [...formData.keys()].forEach((key) => {
      json[key] = formData.get(key)?.toString();
    });

    const token = localStorage.getItem("jwt_token");
    const createAnimalRequest = await fetch("/api/animal/create", {
      method: "post",
      body: JSON.stringify(json),
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json",
      },
    });

    const createAnimalResponse: {
      success: boolean;
      message: string;
      animalId: string;
    } = await createAnimalRequest.json();

    if (createAnimalResponse.success) {
      setAnimalCreated(true);
      setSuccessMessage(createAnimalResponse.message);
      animalId.current = createAnimalResponse.animalId;
    } else {
      setError(createAnimalResponse.message);
    }
  }

  async function onImageSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(event.target as HTMLFormElement);

    const token = localStorage.getItem("jwt_token");
    const animalImageRequest = await fetch(
      `/api/animal/image?animalid=${animalId.current}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    const animalImageResponse: { success: boolean; message: string } =
      await animalImageRequest.json();

    if (animalImageResponse.success) {
      setSuccessMessage(animalImageResponse.message);
      setCheckAnimalUrl(true);
    } else {
      setError(animalImageResponse.message);
    }
  }

  return (
    <Layout>
      <main>
        {error ? <div className={styles["error-message"]}>{error}</div> : <></>}

        {successMessage ? (
          <div className={styles["success-message"]}>
            {successMessage}
            &nbsp;
            {checkAnimalUrl ? (
              <Link href={`/animal/${animalId.current}`}>
                <a>{animalId.current}</a>
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <form onSubmit={onCreateAnimal}>
          <h1>Create gallery entry</h1>
          <InputField type="text" name="name" placeholder="Name" />
          <InputField
            type="text"
            name="description"
            placeholder="Description"
          />
          <InputField type="text" name="gender" placeholder="Gender" />
          <InputField type="text" name="type" placeholder="Type" />
          <InputField type="number" name="age" placeholder="Age" />
          <InputField type="text" name="status" placeholder="Status" />
          <InputField type="text" name="location" placeholder="Location" />
          <button type="submit"> submit </button>
        </form>

        {animalCreated ? (
          <form onSubmit={onImageSubmit}>
            <h2>Submit an image</h2>
            <sup>
              If you don&apos;t subit an image, the listing wont appear in the
              gallery.
            </sup>
            <InputField type="file" name="image" placeholder="Image" />
            <button type="submit"> Submit </button>
          </form>
        ) : (
          <></>
        )}
      </main>
    </Layout>
  );
};

export default CreatePage;
