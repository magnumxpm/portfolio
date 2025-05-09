import ExperienceTimeline from "./ExperienceTimeline";
import { experienceData } from "@/data/experienceData";

export default function ExperienceSection() {
  return (
    <section id="experience">
      <p className="text-xl text-blue-100 sm:text-2xl font-medium font-code">
        Work Experience
      </p>
      <div className="mt-6 md:mt-9 grid sm:grid-cols-1 w-full gap-3">
        <ExperienceTimeline data={experienceData} />
      </div>
    </section>
  );
}
