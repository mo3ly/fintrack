import { FULL_ROOT_DOMAIN, ROOT_DOMAIN } from "@/lib/middleware/constant";
import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <section className=" relative z-10 flex min-h-screen content-center items-center justify-center bg-[#673d9e] py-20">
      <div className="px-4">
        <div className="text-center">
          <h2 className="mb-2  text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
            ٤٠٤
          </h2>
          <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
            عفوًا! لا يمكن العثور على الصفحة
          </h4>
          <p className="mb-8 text-lg text-white">
            قد تكون الصفحة التي تبحث عنها قد تم حذفها
          </p>
          <a
            href={FULL_ROOT_DOMAIN}
            className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-[#474747]">
            العودة إلى الرئيسية
          </a>
        </div>
      </div>
      <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
        <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
        <div className="flex h-full w-1/3">
          <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
        <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
      </div>
    </section>
  );
}
