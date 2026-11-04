# AGENTS.md

Static HTML/CSS/JS coursework repo. There is no package manager, build, test, lint, or typecheck step — edit files and open them directly in a browser. Keep asset paths relative.

## Layout and entrypoints
- The workspace root is the Git repository (branch `main`; `origin` = GitHub, `gitee` = Gitee). `webprojectzhanghanwen/` is the course project source; its `index.html` is the real course homepage.
- `24002120120张瀚文/` is the Gitee submission copy of `webprojectzhanghanwen/`. Keep both in sync when editing the course project.
- Root `iconfont-1.html` … `iconfont-4.html` are self-contained "Studio Oribi" demos: 1/3 use font icons, 2/4 use Lucide SVG. They import vendored assets from `cdn/` and `webprojectzhanghanwen/font/`; do not switch to remote CDNs.
- `starter-level1-0120-zhw.html` + `data.js` are a DOM/array exercise; `data.js` exposes `window.STUDENTS` and `window.SUBJECTS`.
- `四级项目/` and `四级项目2/` are duplicate Damai mobile mockups; `global.css` is byte-identical. Apply content changes to both unless told otherwise.
- `skills/frontend-design/SKILL.md` holds the visual-design guidance used for the Studio Oribi pages; load it before restyling them. `.opencode/skills/submit-project/SKILL.md` documents the Gitee submission flow.

## Conventions (non-obvious)
- Prefix every new CSS class, id, JS variable, and CSS custom property with `zhw_` (`--zhw_ink`, etc.). This is a standing user requirement, not optional style.
- Append each new user prompt to `zhw_prompt.md` before implementing, with timestamp, model, and prompt text; never overwrite earlier entries.
- Every new HTML page must be linked from `webprojectzhanghanwen/index.html`. Root pages link as `../page.html`; iconfont pages link back via `./webprojectzhanghanwen/index.html`.
- Root icons pages reuse the Studio Oribi tokens (`--zhw_ink`, `--zhw_paper`, `--zhw_champ`, `--zhw_vermil`, `--zhw_moss`, `--zhw_line`); keep new sections consistent with them.
- Some `四级项目*/page*.html` files contain non-ASCII hyphens in `lang`/`charset` (`zh‑CN`, `UTF‑8`). They render, but fix to ASCII when touching those lines.

## Code comment rules (enforced)
- **Every newly created HTML file** must begin with an HTML comment block on line 2 (right after `<!DOCTYPE html>`) containing exactly four fields:
  ```html
  <!--
  作者：张瀚文
  创建时间：YYYY-MM-DD
  使用模型：Trae CN
  功能：一句话描述这个页面做什么
  -->
  ```
  - 日期格式固定 `YYYY-MM-DD`（例如 `2026-11-04`）。
  - 功能字段写中文，15–40 字，概述页面用途。
  - 只在"新建文件"时添加；修改已有 HTML 文件时不重复添加，除非该注释块原本缺失。

- **Every newly defined JavaScript function** (including arrow functions assigned to a variable and object method shorthand) must have a JSDoc-style comment immediately above it describing its purpose in one line:
  ```js
  /**
   * 根据当前选中的 tab 切换底部导航的 active 状态。
   */
  function zhw_switchTab(activeIndex) { ... }

  /**
   * 用给定的图标列表渲染底部导航栏。
   */
  const zhw_renderNav = (items) => { ... };
  ```
  - 只写功能描述，不在 JSDoc 里重复写 `@param` / `@returns` 标签（保持轻量）。
  - 内部匿名回调（例如 `addEventListener` 里直接写的箭头）可不加，只给具名函数和模块级导出函数加。
  - 给已有函数补注释时，把注释写紧挨着函数上方，不要插到函数体内部。

## Git / verification gotchas
- The root repo was initialized on 2026-10-30 after removing the old nested `webprojectzhanghanwen/.git`; do not recreate a nested repository. `origin` is GitHub and `gitee` is the submission remote.
- Gitee pushes need a personal token. Pass it via an environment variable or one-off URL at push time; never write it to config, files, or commit messages. See `.opencode/skills/submit-project/SKILL.md`.
- No automated checks exist. Verify by opening the page and confirming every relative asset/link resolves; watch for path differences between root pages and `webprojectzhanghanwen/`.
