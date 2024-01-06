import { createClient } from "contentful";
import { GetServerSideProps } from "next";
import Layout from "@/layout/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import i18n from "@/app/i18n";
import { useTranslation } from "react-i18next";

const client = createClient({
  space: process.env.NEXT_PUBLIC_REACT_APP_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_REACT_APP_APIKEY,
});

interface BlogPostFields {
  titleRu: string;
  titleEn: string;

  slug: string;

  bodyRu: string;
  bodyEn: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };

  contentRu: object;
  contentEn: object;

  date: string;
  // Add other fields as needed
}

interface BlogPost {
  fields: BlogPostFields;
  sys: {
    id: string;
  };
}

const flattenObject = (
  obj: Record<string, any>,
  parentKey = ""
): Record<string, string> => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key]) &&
      Object.keys(obj[key]).length > 0
    ) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key].toString();
    }
    return acc;
  }, {} as Record<string, string>);
};

const NewsPost = ({ post }: { post: BlogPost }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ru";
  const options = {};

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto px-5 py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {post.fields[`title${language === "en" ? "En" : "Ru"}`]}
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            {new Date(post.fields.date).toLocaleDateString()}
          </p>
          {post.fields.image && (
            <img
              src={post.fields.image.fields.file.url}
              alt={post.fields[`title${language === "en" ? "En" : "Ru"}`]}
              className="w-full max-w-[400px] h-auto mx-auto mb-6 rounded-lg"
            />
          )}
          {/* Render rich text content for 'body' */}
          <div className="w-8/12 mx-auto">
            <article className="prose max-w-none mb-6 text-justify">
              {documentToReactComponents(
                post.fields[`body${language === "en" ? "En" : "Ru"}`],
                options
              )}
            </article>
            {/* Render rich text content for 'content' */}
            <article className="prose max-w-none text-justify">
              {documentToReactComponents(
                post.fields[`content${language === "en" ? "En" : "Ru"}`],
                options
              )}
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// pages/[slug].tsx

// ... (import statements)
export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: "blogPost",
      "fields.slug": params?.slug as string,
      locale: locale === "ru" ? "ru-RU" : "en-US",
    });

    const post = response.items[0];

    if (!post) {
      return {
        notFound: true,
      };
    }

    console.log("Body (Ru):", post.fields.bodyRu);
    console.log("Content (Ru):", post.fields.contentRu);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching Contentful data:", error);

    return {
      notFound: true,
    };
  }
};

export default NewsPost;
