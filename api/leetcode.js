import codingData from '../content/tech/coding.json' with { type: 'json' };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
  // Returns cached or live public leetcode profile stats
  return res.status(200).json(codingData.leetcode);
}
