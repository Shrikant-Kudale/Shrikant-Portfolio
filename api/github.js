import codingData from '../content/tech/coding.json' with { type: 'json' };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(200).json(codingData.github);
  }

  try {
    const query = `
      query {
        user(login: "Shrikant-Kudale") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const ghRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!ghRes.ok) throw new Error('GitHub API responded with error');
    const data = await ghRes.json();
    return res.status(200).json(data);
  } catch {
    return res.status(200).json(codingData.github);
  }
}
