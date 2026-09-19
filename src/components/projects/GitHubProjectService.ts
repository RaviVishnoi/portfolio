import { Project } from './types';

const GITHUB_API_URL = 'https://api.github.com/users/RaviVishnoi/repos?per_page=100&sort=updated';
const CACHE_KEY = 'github_projects_cache';
const CACHE_TIMESTAMP_KEY = 'github_projects_cache_timestamp';
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

// Map Github language/topics to our internal categories
function extractCategories(repo: any): string[] {
  const categories: Set<string> = new Set();
  
  const lang = (repo.language || '').toLowerCase();
  if (lang) {
    categories.add(lang);
    if (['javascript', 'typescript', 'html', 'css', 'php'].includes(lang)) {
      categories.add('web');
    }
    if (['python'].includes(lang)) {
      categories.add('tools'); // General assumption for python scripts in this context
    }
  }

  const topics = repo.topics || [];
  topics.forEach((t: string) => {
    const topic = t.toLowerCase();
    categories.add(topic);
    
    if (topic.includes('security') || topic.includes('vapt') || topic.includes('hack') || topic.includes('crypto')) {
      categories.add('security');
    }
    if (topic.includes('erp') || topic.includes('admin')) {
      categories.add('erp');
    }
    if (topic.includes('web') || topic.includes('react') || topic.includes('frontend') || topic.includes('backend')) {
      categories.add('web');
    }
  });

  // Name based heuristics
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  if (name.includes('security') || desc.includes('security') || name.includes('scanner') || desc.includes('vulnerability')) {
    categories.add('security');
  }
  if (name.includes('erp') || desc.includes('erp') || name.includes('admin') || desc.includes('dashboard')) {
    categories.add('erp');
  }
  if (name.includes('portfolio') || name.includes('store') || desc.includes('website') || desc.includes('web app')) {
    categories.add('web');
  }

  // Ensure 'github' is added as a base filter category conceptually, though 'source' property handles this mainly
  categories.add('github');

  return Array.from(categories);
}

export async function fetchGitHubProjects(forceRefresh = false): Promise<Project[]> {
  try {
    if (!forceRefresh) {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedData && cachedTime) {
        const timePassed = Date.now() - parseInt(cachedTime, 10);
        if (timePassed < CACHE_DURATION_MS) {
          return JSON.parse(cachedData);
        }
      }
    }

    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
        // Intentionally omitting Authorization token as requested for public API
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();
    
    // Filter out forks if desired, or keep them. We'll keep them but might de-prioritize.
    const projects: Project[] = repos.map((repo: any) => {
      // Create a tech array from language + topics
      const tech = new Set<string>();
      if (repo.language) tech.add(repo.language);
      (repo.topics || []).forEach((t: string) => tech.add(t));

      // Featured logic: let's feature repos with stars > 0 or explicitly known ones
      const isFeatured = repo.stargazers_count > 0 || ['StoreToDoor', 'Bhavishyavani'].includes(repo.name);

      return {
        id: `gh-${repo.id}`,
        title: repo.name.replace(/[-_]/g, ' '), // Clean up repo names
        description: repo.description || 'Open-source project available on GitHub.',
        fullDescription: repo.description || 'This is a public repository on GitHub. No extended description was provided in the repository settings.',
        category: extractCategories(repo),
        tech: Array.from(tech).slice(0, 5), // Keep top 5 tech tags
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || undefined,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        featured: isFeatured,
        source: 'github',
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        // Optional: you could map specific repo names to specific images if needed
        // image: getFallbackImage(repo.language, repo.name)
      };
    });

    // Cache the result
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(projects));
    sessionStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

    return projects;
  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error);
    // On failure, return what we have in cache if anything, else empty array so manual projects still show
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return []; // Return empty array on total failure, component will merge with manual
  }
}
