import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <Image
          src="/bloglogo-bg.png"
          width={100}
          height={100}
          alt="logo"
          priority
          className="w-auto h-auto"
        />{" "}
      </div>
      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="absolute w-[50%] sm:w-[80%] right-0">
          <Link
            href="/admin/addBlog"
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src="/more.png" alt="add-icon" width={28} height={28} />
            <p className="hidden sm:block">Add blogs</p>
          </Link>
          <Link
            href="/admin/blogList"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src="/blog.png" alt="add-icon" width={28} height={28} />
            <p className="hidden sm:block">Blog lists</p>
          </Link>
          <Link
            href="/admin/subscriptions"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src="/mail.png" alt="add-icon" width={28} height={28} />
            <p className="hidden sm:block">Subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
