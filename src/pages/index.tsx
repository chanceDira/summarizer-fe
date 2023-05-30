import axios from "axios";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [script, setScript] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("http://localhost:3000/api/v1/summarize", {
        text: script,
      })
      .then((response) => {
        setSummary(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>TV script summarizer</title>
        <meta
          name="description"
          content="Get summary of the TV script and Actors"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#226d02] to-[#5f5d3b]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className=" tracking-tight text-white sm:text-[3rem]">
            <span className="text-[hsl(35,100%,70%)]">TV Script</span>{" "}
            Summarizer App
          </h1>
          <div className="flex w-8/12 flex-col">
            <div className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 ">
              <h3 className="text-2xl font-bold">Paste your TV Script</h3>
              <div className="text-lg">
                <textarea
                  className="h-60 w-full overflow-auto rounded-md border border-gray-50 bg-transparent p-3 outline-none"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold">Results</h3>
              <div className="text-lg ">
                {summary != ""
                  ? summary
                  : " Summary and actors will be shown here."}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="rounded-md bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={handleSubmit}
            >
              {isloading
                ? "Analyzing you TV script.... Please wait !!!"
                : "Run"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
