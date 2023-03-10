import "@/scss/style.scss";
import "@/scss/Navbar.scss";
import "@/scss/RecipeCard.scss";
import "@/scss/Index.scss";
import "@/scss/New.scss";
import "@/scss/[id].scss";

import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
