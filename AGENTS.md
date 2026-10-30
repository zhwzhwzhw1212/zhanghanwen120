# AGENTS.md

Static HTML/CSS/JS coursework repo. There is no package manager, build, test, lint, or typecheck step — edit files and open them directly in a browser. Keep asset paths relative.

## Layout and entrypoints
- `webprojectzhanghanwen/` is the only Git repository (nested; remote is Gitee `webprojectzhanghanwen`). The workspace root is not versioned. Its `index.html` is the real course homepage.
- Root `iconfont-1.html` … `iconfont-4.html` are self-contained "Studio Oribi" demos: 1/3 use font icons, 2/4 use Lucide SVG. They import vendored assets from `cdn/` and `webprojectzhanghanwen/font/`; do not switch to remote CDNs.
- `starter-level1-0120-zhw.html` + `data.js` are a DOM/array exercise; `data.js` exposes `window.STUDENTS` and `window.SUBJECTS`.
- `四级项目/` and `四级项目2/` are duplicate Damai mobile mockups; `global.css` is byte-identical. Apply content changes to both unless told otherwise.
- `skills/frontend-design/SKILL.md` holds the visual-design guidance used for the Studio Oribi pages; load it before restyling them.

## Conventions (non-obvious)
- Prefix every new CSS class, id, JS variable, and CSS custom property with `zhw_` (`--zhw_ink`, etc.). This is a standing user requirement, not optional style.
- Append each new user prompt to `zhw_prompt.md` before implementing, with timestamp, model, and prompt text; never overwrite earlier entries.
- Every new HTML page must be linked from `webprojectzhanghanwen/index.html`. Root pages link as `../page.html`; iconfont pages link back via `./webprojectzhanghanwen/index.html`.
- Root icons pages reuse the Studio Oribi tokens (`--zhw_ink`, `--zhw_paper`, `--zhw_champ`, `--zhw_vermil`, `--zhw_moss`, `--zhw_line`); keep new sections consistent with them.
- Some `四级项目*/page*.html` files contain non-ASCII hyphens in `lang`/`charset` (`zh‑CN`, `UTF‑8`). They render, but fix to ASCII when touching those lines.

## Git / verification gotchas
- The nested repo is intentionally left dirty: old copies tracked under `24002120120张瀚文/` show as deleted while the live files sit at the repo root, and `event.html`/`function_apply.html` are untracked. Do not run `git reset`, `git clean`, or mass-stage files without asking.
- No automated checks exist. Verify by opening the page and confirming every relative asset/link resolves; watch for path differences between root pages and `webprojectzhanghanwen/`.
