import { ReactNode } from 'react'; // Import ReactNode type
import Head from 'next/head';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import '@/app/globals.css';

interface LayoutProps {
  children: ReactNode; // Specify the type of children prop
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>BlogPost i18n Contentful Amir Ibraimov</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
