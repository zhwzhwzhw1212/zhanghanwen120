---
name: github-push-project
description: Commit and push the current workspace to the configured GitHub remote. Use when the user asks to push to GitHub, commit and push, publish to the repo, or deploy code to GitHub. Do not use for GitHub-specific operations outside this repo (issues, PRs on other repos, etc.).
---

# GitHub Push Project

将当前工作目录所有改动提交 commit 并 push 到固定的 GitHub 远程仓库。适用于本项目（高级网页设计）。

## 固定参数

- **工作目录**：`c:\Users\DELL\Desktop\高级网页设计`
- **远程仓库**：`git@github.com:zhwzhwzhw1212/zhanghanwen120.git`（SSH URL，已配置）
- **用户信息**（已全局配置）：
  - user.name: 张瀚文
  - user.email: 3942406377@qq.com

## 关键网络环境（先读，再执行）

本项目所在网络 **22 端口被防火墙封锁**，SSH 走默认端口会报 `Connection refused`。解决方案是：
- SSH 直连 `ssh.github.com:443`（GitHub 官方支持，几乎没有防火墙封 443）
- 在 `~/.ssh/config` 里把 `Host github.com` 重定向到 `ssh.github.com:443`

该文件**应已存在**，内容如下（如需更新直接覆盖）：
```
Host github.com
  HostName ssh.github.com
  Port 443
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  StrictHostKeyChecking accept-new
```
公钥指纹 `SHA256:8n9QxGAR2XDaMYf9ygqYvMgbqG/9VYdSsBYowV1ZE2s` 已在 GitHub 账号 `zhwzhwzhw1212` 注册。

## 执行步骤

在 PowerShell 中按顺序执行，任何一步失败立即停止并报告：

1. **进入工作目录**：
   ```powershell
   Set-Location "c:\Users\DELL\Desktop\高级网页设计"
   ```

2. **确保 remote 是 SSH URL**（HTTPS 在本环境走不通）：
   ```powershell
   $existing = git remote get-url origin 2>$null
   $sshUrl   = "git@github.com:zhwzhwzhw1212/zhanghanwen120.git"
   if (-not $existing) {
     git remote add origin $sshUrl
   } elseif ($existing -ne $sshUrl) {
     git remote set-url origin $sshUrl
   }
   ```

3. **预检 SSH 是否通**（快速返回 `Hi zhwzhwzhw1212!` 才算过）：
   ```powershell
   ssh -T git@github.com 2>&1
   # 期望：Hi zhwzhwzhw1212! You've successfully authenticated...
   # 失败则检查 ~/.ssh/config 或 SSH agent
   ```

4. **添加所有改动并提交**：
   ```powershell
   git status --short
   git add -A
   git commit -m "feat: $(Get-Date -Format 'yyyy-MM-dd HH:mm') 批量提交"
   # 如果返回 "nothing to commit"，跳过下一步直接报告
   ```

5. **推送**：
   ```powershell
   git branch -M main
   git push -u origin main
   ```

6. **验证**：
   ```powershell
   (git ls-remote origin refs/heads/main) -match (git rev-parse HEAD)
   # True = 远端已同步
   ```

## 常见问题排查

| 现象 | 原因 / 处理 |
|---|---|
| `Connection refused` to port 22 | ~/.ssh/config 未生效。检查 `Host github.com` 是否指向 `HostName ssh.github.com` + `Port 443` |
| `Permission denied (publickey)` | 公钥未注册或 SSH agent 没加载 `id_ed25519`。手动 `ssh-add ~/.ssh/id_ed25519`，或确认 GitHub 账号 → SSH and GPG keys 里有 `SHA256:8n9QxGAR...` |
| `Everything up-to-date` | 已经是最新，不是错误 |
| `src refspec main does not match any` | 仓库刚 init 还没 commit，先做步骤 4 |
| GCM / Credential Manager 弹框 | 说明 remote URL 又回到 HTTPS 了，重跑步骤 2 切回 SSH |
| `rejected -> main (fetch first)` | 远程有本地没有的提交，先 `git pull --rebase origin main` 再 push |
