"use client";

import { useEffect, useState } from "react";
import ReactTyped from "react-typed";
import { HeroData } from "@/types";
import { HeroTag } from "@/components/ui/Tag";
import { SocialLink } from "@/components/ui/SocialLink";
import { ExternalLink } from "@/components/ui/ExternalLink";

interface HeroContentProps {
  tags: string[];
  desc: string;
}

export default function HeroContent({ tags, desc }: HeroContentProps) {
  const [showDesc, setShowDesc] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDesc(true);
    }, 1300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const engineerText = "{Engineer}";
  const [nameIsDone, setNameIsDone] = useState(false);
  const nameComplete = () => {
    setNameIsDone(() => true);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col py-4">
        <h1 className="text-2xl sm:text-tab_hero md:text-hero font-bold leading-tight min-h-11 sm:min-h-20">
          <ReactTyped
            strings={["Pritam Mukherjee"]}
            typeSpeed={30}
            startDelay={400}
            onComplete={nameComplete}
            showCursor={false}
            className="cursor-default select-none"
          />
        </h1>
        <p
          className={`text-xl sm:text-tab_sub_hero md:text-sub_hero font-semibold leading-tight transition-all duration-700 pb-4 ${
            nameIsDone
              ? "translate-y-0 opacity-100"
              : "opacity-0 -translate-y-5"
          }`}
        >
          Software <span className="text-theme_light">{engineerText}</span>
        </p>

        <ExternalLink
          href="https://1drv.ms/b/s!Aukoqznc45UmpQTEXFNub-w0_dOI?e=NOfYN4"
          variant="big"
          className={`transition-all duration-700 pb-6 ${
            nameIsDone
              ? "translate-y-0 opacity-100"
              : "opacity-0 -translate-y-5"
          }`}
        >
          <span className="group-hover:text-theme_light group-hover:border-theme_light group-focus:text-theme_light group-focus:border-theme_light">
            My Résumé
          </span>
        </ExternalLink>

        <p
          className={`text-base_mobile sm:text-base font-code transition-all duration-700 ${
            nameIsDone
              ? "translate-y-0 opacity-100"
              : "opacity-0 -translate-y-5"
          }`}
        >
          {desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-6 lg:w-1/2">
          {tags &&
            tags.map((item, idx) => (
              <HeroTag
                key={`hero-tag-${idx}`}
                tag={item}
                className={
                  nameIsDone
                    ? "translate-y-0 opacity-100"
                    : "opacity-0 -translate-y-5"
                }
              />
            ))}
        </div>

        <div className="flex gap-3 mt-6 sm:1/2">
          <SocialLink
            href="https://github.com/magnumxpm"
            icon="radix-icons:github-logo"
            className="animate-slidein [--slidein-delay:1600ms]"
          />
          <SocialLink
            href="https://linkedin.com/in/pritam-mukherjee-52a348225"
            icon="akar-icons:linkedin-v1-fill"
            className="animate-slidein [--slidein-delay:1700ms]"
          />
          <SocialLink
            href="https://twitter.com/pmukherjee02"
            icon="bi:twitter-x"
            className="animate-slidein [--slidein-delay:1800ms]"
          />
          <SocialLink
            href="https://instagram.com/mukherjee.anon"
            icon="mdi:instagram"
            className="animate-slidein [--slidein-delay:1900ms]"
          />
          <SocialLink
            href="https://bento.me/mukherjee"
            icon="material-symbols:bento-outline"
            className="animate-slidein [--slidein-delay:2000ms]"
          />
        </div>
      </div>
    </div>
  );
}
