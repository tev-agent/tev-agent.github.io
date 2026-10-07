# Tev project page

Project website for **Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards**
(Wenbo Hu, Shraman Pramanick, Krishna Kumar Singh, Nanyun Peng, Kai-Wei Chang, Yong Jae Lee;
Adobe Research and UCLA).

Live at <https://tev-agent.github.io/> (GitHub Pages, served from `main` of `tev-agent/tev-agent.github.io`).

A static page with no build step: `index.html`, `static/css/style.css`, `static/js/main.js`.
Math is rendered with KaTeX and fonts come from Google Fonts, both over CDN.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Contents

| Path | What it is |
|---|---|
| `static/images/teaser.*`, `pipeline.*` | Paper figures rendered at 216 dpi (WebP shown, PNG on click) |
| `static/images/traces.svg` | Progress-potential traces, recompiled from the paper's TikZ source |
| `static/images/tb4_ranking.*` | Figure 2 (TB 4.0-CM ranking), rendered from `figures/tb4_ranking/fig_tb4_ranking.pdf` at 324 dpi |
| `videos/tev_launch_v6.mp4` | Launch video, shown first on the page; re-encoded from `launch/video/out/tev_launch_v6.mp4` (H.264 CRF 20) to stay under GitHub's 100 MB file limit |
| `videos/tev_academic.mp4` | Paper video, shown after the abstract; a copy of `launch/tev_academic.mp4` |
| `static/images/*_poster.webp` | Poster frames for the two videos |

Every number in the tables is copied from the paper's LaTeX source (`main.tex`). If the paper
changes, update the tables here to match.

The arXiv, code, model and X buttons are marked "soon"; swap in the real links once they exist.
