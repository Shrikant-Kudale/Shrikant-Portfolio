export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.redirect('/admin.html?error=missing_code');
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const adminLogin = process.env.ADMIN_GITHUB_LOGIN || 'Shrikant-Kudale';

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.redirect('/admin.html?error=failed_token_exchange');
    }

    // Verify user identity matches ADMIN_GITHUB_LOGIN
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    const userData = await userRes.json();
    if (userData.login !== adminLogin) {
      return res.redirect('/admin.html?error=unauthorized_user');
    }

    // Set cookie or redirect with token in fragment
    return res.redirect(`/admin.html#token=${accessToken}`);
  } catch (err) {
    return res.redirect('/admin.html?error=auth_internal_error');
  }
}
