import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import { useTranslation } from "react-i18next";
import { createClient, Entry } from 'contentful';
import Link from "next/link";
const client = createClient({
  space: process.env.NEXT_PUBLIC_REACT_APP_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_REACT_APP_APIKEY
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
        const response = await client.getEntries<BlogPostFields>({ content_type: 'blogPost' });
        setPosts(response.items);
      } catch (error) {
        console.error('Error fetching Contentful data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font" style={{ backgroundImage: 'linear-gradient(to left, #F3F4F6, #D1D5DB)' }}>
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t('home.title')}
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="mt-6 text-xl text-gray-800">
              {t('home.description')}
            </p>
          </div>
          <div className="lg:w-1/4 md:w-1/2">
            <img className="object-cover object-center rounded" alt="hero" src="/assets/3d.png" />
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font" style={{ backgroundImage: 'linear-gradient(to left, #F3F4F6, #D1D5DB)' }}>
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {posts.map((post) => (
              <div key={post.sys.id} className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      {i18n.language === 'ru' ? post.fields.titleRu : post.fields.titleEn}
                    </h2>
                  </div>
                  <div className="flex-grow">
                
                    <p className="text-gray-500">{new Date(post.fields.date).toLocaleDateString()}</p>
                    {post.fields.image && (
                      <img src={post.fields.image.fields.file.url} alt={post.fields.title} className="rounded-lg object-cover object-center w-full mb-3" />
                    )}
                    <Link href={`/${post.fields.slug}`} className="mt-3 text-gray-500 inline-flex items-center">
                      {t('home.subcategories.slugbutton')}
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Additional sections and components */}
    </Layout>
  );
};

export default HomePage;
