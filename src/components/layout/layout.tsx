import { Helmet } from 'react-helmet-async';
import Footer from '../footer/footer';
import Header from '../header/header';
import Path from '../path/path';

type LayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
}

function Layout({ pageTitle = '', children }: LayoutProps): JSX.Element {
  return (
    <>
      <Path />
      <div className="wrapper">
        <Helmet>
          <title>{pageTitle} - Фотошоп</title>
        </Helmet>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
