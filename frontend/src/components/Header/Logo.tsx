import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={"/logo.png"}
        unoptimized
        alt="logo"
        width={114}
        height={28}
        className="mx-2.5 my-4 h-[28px]"
        style={{ objectFit: "cover" }}
      />
    </Link>
  );
};
