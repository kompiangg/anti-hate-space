import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

export default function HomePage() {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Komunitas Positif
        <br />
        <span className="purple_gradient text-center">
          {" "}
          Tanpa Ujaran Kebencian
        </span>
      </h1>
      <p className="desc mb-12 text-center">
        Kinder merupakan media sosial dengan teknologi penyaring ujaran
        kebencian berbasis AI, menciptakan lingkungan aman dan nyaman bagi
        pengguna untuk bertukar pikiran.
      </p>
      <Feed />
    </section>
  );
}
