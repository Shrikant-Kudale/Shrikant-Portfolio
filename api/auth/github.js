export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.redirect('/admin.html?error=missing_client_id');
  }
  const redirectUri = `${process.env.APP_URL || 'https://shrikantkudale.is-a.dev'}/api/auth/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`;
  return res.redirect(url);
}
