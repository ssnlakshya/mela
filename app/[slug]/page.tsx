import Image from "next/image";

type PageProps = {
  params: { slug: string };
};

export default function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <div>
      
    </div>
  );
}
