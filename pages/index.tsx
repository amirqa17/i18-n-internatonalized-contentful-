import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import { useTranslation } from "react-i18next";
import { createClient, Entry } from "contentful";
import Link from "next/link";

const client = createClient({
  space: process.env.NEXT_PUBLIC_REACT_APP_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_REACT_APP_APIKEY,
});

interface BlogPostFields {
  titleRu: string;
  bodyRu: string;
  titleEn: string;
  bodyEn: string;
  date: string;
  slug: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface BlogPost extends Entry<BlogPostFields> {}

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries<BlogPostFields>({
          content_type: "blogPost",
        });
        setPosts(response.items);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("home.title")}
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="mt-6 text-xl text-gray-800">{t("home.description")}</p>
          </div>
          <div className="lg:w-1/4 md:w-2/2">
            <img
              className="object-center rounded"
              alt="hero"
              src="/assets/3d.png"
            />
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.sys.id} className="bg-white items-center overflow-hidden border-b-4 border-blue-500 m-4 mx-auto w-3/4 xl:w-3/12 md:w-8/12 sm:w-8/12 ">
                <img
                  src={post.fields.image.fields.file.url}
                  alt={post.fields.title}
                  className="w-full object-cover h-32 sm:h-48 md:h-64"
                />
                <div className="p-4 md:p-6">
                  <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
                    {t("home.subcategories.news")}
                  </p>
                  <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
                    {i18n.language === "ru" ? post.fields.titleRu : post.fields.titleEn}
                  </h3>
                  <div className="text-sm flex items-center">
                    <svg
                      className="opacity-75 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      width="12"
                      height="12"
                      viewBox="0 0 97.16 97.16"
                      style={{ enableBackground: "new 0 0 97.16 97.16;" }}
                      xmlSpace="preserve"
                    >
                      {/* Your SVG paths go here */}
                    </svg>
                    <p className="leading-none">{new Date(post.fields.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
