import Image from "next/image";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getPageCollection } from "@/libs/graphql";

export default function Home({ preview = false }) {
  const { data } = useQuery({
    queryKey: ["pageCollection", preview],
    queryFn: () => getPageCollection(preview),
    select: (data: any) => data?.pageCollection?.items,
  });
  const [homepage] = data;

  return (
    <main className="min-h-screen flex items-center flex-col p-4 py-10 bg-[#151515]">
      <header className="w-11/12 text-center mb-9 mt-2">
        <h1 className="text-4xl font-semibold">Contentful POC</h1>
        <strong>{`Preview mode: ${preview ? "enabled" : "disabled"}`}</strong>
      </header>

      <section className="border-2 flex flex-col max-w-lg w-11/12 rounded-lg">
        <header className="flex text-center gap-2 flex-col p-6 w-full">
          <h2 className="text-2xl">{homepage?.internalName}</h2>
          <h3 className="text-base">{homepage?.pageName}</h3>
        </header>

        <div className="w-full lg:h-[410px]">
          <Image
            priority
            width={500}
            height={500}
            quality={100}
            src={homepage?.image?.url}
            alt={homepage?.image?.title}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps({ preview = false }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pageCollection", preview],
    queryFn: () => getPageCollection(preview),
  });

  return {
    props: {
      preview,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
