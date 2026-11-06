import profileData from '../../content/profile.json' with { type: 'json' };
import projectsData from '../../content/tech/projects.json' with { type: 'json' };
import experienceData from '../../content/tech/experience.json' with { type: 'json' };
import achievementsData from '../../content/tech/achievements.json' with { type: 'json' };
import publicationsData from '../../content/tech/publications.json' with { type: 'json' };
import dissertationData from '../../content/psychology/dissertation.json' with { type: 'json' };
import conceptsData from '../../content/psychology/concepts.json' with { type: 'json' };

export function buildKnowledge() {
  return JSON.stringify({
    profile: profileData,
    flagshipProjects: projectsData,
    experience: experienceData,
    achievements: achievementsData,
    publications: publicationsData,
    dissertation: dissertationData,
    totalConceptsIndexed: conceptsData.length,
    dissertationConcepts: conceptsData.filter((c) => c.dissertation)
  });
}
