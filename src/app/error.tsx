"use client";

import * as React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className=" relative z-10 flex min-h-screen content-center items-center justify-center bg-[#474747] py-20">
      <div className="px-4">
        <div className="text-center">
          <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
            خطأ
          </h2>
          <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
            عذرًا، حدث خطأ ما!
          </h4>
          <p className="mb-8 text-lg text-white">
            لقد حدث خطأ غير متوقع قم بالمحاولة مرة أخري{" "}
          </p>
          <button
            onClick={reset}
            className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-[#474747]">
            حاول مرة أخرى
          </button>
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
    </main>
    // <main>
    //   <section className='bg-white'>
    //     <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
    //       <RiAlarmWarningFill
    //         size={60}
    //         className='drop-shadow-glow animate-flicker text-red-500'
    //       />
    //       <h1 className='mt-8 text-4xl md:text-6xl'>
    //         Oops, something went wrong!
    //       </h1>
    //       <TextButton variant='basic' onClick={reset} className='mt-4'>
    //         Try again
    //       </TextButton>
    //     </div>
    //   </section>
    // </main>
  );
}
