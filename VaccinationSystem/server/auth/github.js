// server/auth/github.js
const express = require('express');
const fetch = require('node-fetch'); // npm i node-fetch@2
const router = express.Router();

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI = 'http://localhost:9002/auth/github/callback',
} = process.env;

// 1) 发起登录：重定向到 GitHub
router.get('/login', (req, res) => {
  const state = Math.random().toString(36).slice(2, 10); // 简易防伪
  req.session = req.session || {};
  req.session.ghState = state;
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', GITHUB_CLIENT_ID);
  url.searchParams.set('redirect_uri', GITHUB_REDIRECT_URI);
  url.searchParams.set('scope', 'read:user user:email');
  url.searchParams.set('state', state);
  res.redirect(url.toString());
});

// 2) 回调：用 code 换 token，再拿用户信息
router.get('/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    if (!code || !state || !req.session || state !== req.session.ghState) {
      return res.status(400).send('Invalid state/code');
    }
    // 2.1 换 access_token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_REDIRECT_URI,
      })
    }).then(r => r.json());

    if (!tokenRes.access_token) {
      return res.status(400).send('Token exchange failed');
    }

    const token = tokenRes.access_token;

    // 2.2 拿用户信息
    const ghUser = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'demo' }
    }).then(r => r.json());

    // 2.3 简单“登录态”（内存会话；真实项目请用数据库/Redis + cookie）
    req.session.user = {
      provider: 'github',
      id: ghUser.id,
      login: ghUser.login,
      avatar: ghUser.avatar_url,
      name: ghUser.name,
    };

    // 回跳到前端
    res.redirect('http://localhost:5173/oauth/done');
  } catch (e) {
    console.error(e);
    res.status(500).send('OAuth error');
  }
});

// 3) 查询当前登录用户
router.get('/me', (req, res) => {
  res.json(req.session?.user || null);
});

// 4) 退出
router.post('/logout', (req, res) => {
  if (req.session) req.session.user = null;
  res.json({ ok: true });
});

module.exports = router;
