import {companies} from "@/public/companiesLogo";
import Image from "next/image";

export function Companies() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500 uppercase">
            Powering the world&apos;s best data teams
          </h3>
          <div className="relative mt-6">
            <div className="flex flex-wrap justify-center items-center gap-4 p-3">
              {companies.map((logo, idx) => (
                <div key={idx} className="flex-shrink-0 w-40 h-10">
                  <Image
                    src={logo}
                    className="h-full w-full object-contain px-2 dark:brightness-0 dark:invert my-4"
                    alt="logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}