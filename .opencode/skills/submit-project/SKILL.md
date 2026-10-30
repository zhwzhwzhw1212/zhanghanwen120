---
name: submit-project
description: Use when the user asks to submit this course project, commit and push it to Gitee, create the 学号+姓名 submission folder, or package webprojectzhanghanwen. Triggers include 提交项目, 推送, gitee, git commit, 学号姓名文件夹.
---

# Submit Course Project to Gitee

Repo root: `C:\Users\DELL\Desktop\高级网页设计`  
Student folder: `24002120120张瀚文`  
Gitee repo: `https://gitee.com/neusoft_wangyao_jsj/webprojectzhanghanwen.git`

## Workflow

1. Log the request first in `zhw_prompt.md` (append only; include timestamp, model, prompt). Redact tokens.
2. Inspect `git status` and `git log --oneline -5`; never reset/clean unrelated work.
3. Create the student folder if missing and copy `webprojectzhanghanwen\*` into it, excluding any `.git` directory.
4. Stage only the submission folder (and explicitly requested files):
   `git add -- "24002120120张瀚文"`
5. Commit with the repo's existing message style, e.g. `提交网页设计项目 - 24002120120张瀚文`.
6. Add the Gitee remote only if absent:
   `git remote add gitee https://gitee.com/neusoft_wangyao_jsj/webprojectzhanghanwen.git`
7. Verify the Gitee default branch:
   `git ls-remote --symref gitee HEAD`
8. Push `main` to that branch, authenticating with the token from an environment variable. Never write the token to a file, remote URL, or git config.

## Push authentication

Use `GITEE_TOKEN` for the current command only, for example:

```powershell
$env:GITEE_TOKEN = '<token>'
git -c credential.helper= push "https://<username>:$env:GITEE_TOKEN@gitee.com/neusoft_wangyao_jsj/webprojectzhanghanwen.git" main:master
```

- The username is the token owner, not necessarily the repo owner. If unknown, try `oauth2` or the configured Git identity.
- Do not echo the token in logs or commit messages.
- Confirm success with `git ls-remote gitee` or the push output.

## Gotchas

- The repo root was initialized on 2026-10-30 after removing the old nested `webprojectzhanghanwen/.git`; do not recreate a nested repository.
- `origin` points to GitHub. Keep it; use a separate `gitee` remote.
- Root-level pages still link to `webprojectzhanghanwen/`; copying files into the student folder must not change those relative paths.
- No build/test/lint exists; verify copied HTML, CSS, JS, `font/`, and image assets are present.
