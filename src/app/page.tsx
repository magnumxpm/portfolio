"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroContent from "@/components/HeroContent";
import NavBar from "@/components/NavBar";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AcademicsSection from "@/components/AcademicsSection";
import NewsLetterPitch from "@/components/NewsLetterPitch";
import Footer from "@/components/Footer";
import { heroData } from "@/data/heroData";
import { HeroData } from "@/types";

export default function Home() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    // In a real application, you might fetch this data from an API
    setData(heroData);
  }, []);

  return (
    <main className="flex flex-col text-base items-center">
      <div className="max-w-phone sm:max-w-tablet lg:max-w-desk w-full">
        <NavBar />
      </div>

      <div className="flex flex-col min-h-[555px] sm:min-h-[520px] px-5 py-3 w-full max-w-phone sm:max-w-tablet lg:max-w-desk">
        {data && <HeroContent tags={data.tags} desc={data.desc} />}
      </div>

      <Image
        src="/wv_haikei.svg"
        alt=""
        width={1920}
        height={213}
        className="w-full aspect-[900/100] select-none"
        priority
      />

      <div className="py-5 text-white bg-dark w-full flex justify-center">
        <div className="max-w-phone sm:max-w-tablet lg:max-w-desk h-full w-full flex flex-col sm:flex-row p-3 gap-2">
          <div className="w-full px-2 flex flex-col gap-14">
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <CertificationsSection />
            <AcademicsSection />

            <div className="border-b border-theme"></div>

            <NewsLetterPitch />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
