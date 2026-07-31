// src/app/page.tsx — Home page (Server Component)
// All data fetched server-side for performance

import { Navbar }         from '@/components/layout/Navbar';
import { Footer }         from '@/components/layout/Footer';
import { Hero }           from '@/components/sections/Hero';
import { About }          from '@/components/sections/About';
import { Experience }     from '@/components/sections/Experience';
import { Projects }       from '@/components/sections/Projects';
import { Skills }         from '@/components/sections/Skills';
import { Education }      from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { Achievements }   from '@/components/sections/Achievements';
import { Contact }        from '@/components/sections/Contact';

import {
  getPublishedProjects,
  getSkills,
  groupSkillsByCategory,
  getCertifications,
  getAchievements,
} from '@/lib/db/queries';

// Force dynamic rendering — data comes from DB at request time
// On Vercel, pages are rendered on first request and cached by the edge
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [projects, skills, certifications, achievements] = await Promise.all([
    getPublishedProjects(),
    getSkills(),
    getCertifications(),
    getAchievements(),
  ]);

  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects projects={projects} />
        <Skills groupedSkills={groupedSkills} />
        <Education />
        <Certifications certifications={certifications} />
        <Achievements achievements={achievements} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
