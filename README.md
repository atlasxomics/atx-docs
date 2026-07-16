# AtlasXomics Documentation

Comprehensive, end-to-end documentation for the AtlasXomics spatial-omics data
processing platform, built with [MkDocs](https://www.mkdocs.org/) +
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and intended
for hosting on ReadTheDocs.

## Local development

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt

mkdocs serve          # live preview at http://localhost:8000
mkdocs build --strict # production build into ./site (fails on broken links)
```

## Structure

- `docs/` — Markdown content, organized by processing path.
- `mkdocs.yml` — site config and navigation.
- Content is authored to loosely follow the
  [Scanpy docs](https://scanpy.readthedocs.io/en/latest/): a landing page +
  platform overview, then a sidebar organized around data-processing paths.

### Per-workflow page template

Each Workflow page follows: **Overview** (science + abstract steps) → **Steps** →
**Inputs** → **Outputs** → **Example run**. Internal-only Tasks (`lims_task`,
`upload_latch_registry`) are documented once in the Platform Overview, not per
Workflow.
