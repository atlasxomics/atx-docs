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

## Link checking

`mkdocs.yml` enables MkDocs' built-in [validation](https://www.mkdocs.org/user-guide/configuration/#validation),
so `mkdocs build --strict` fails on:

- **dead anchors** — a `#fragment` that doesn't exist on the target page;
- **unrecognized links** — a link to a page that doesn't exist;
- **omitted files** — a page that exists but is missing from the nav.

Run it before pushing:

```bash
mkdocs build --strict
```

CI (`.github/workflows/docs.yml`) runs the same command on every push and PR.

!!! note
    Glossary terms are definition-list entries, which **don't** get
    auto-generated IDs. To link to one, add an explicit anchor above the term:

    ```markdown
    <a id="my-term"></a>
    **my term**
    : definition…
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
`upload_latch_registry`) are documented once in the
[Glossary](docs/reference/glossary.md#internal-atx-only-tasks), not per Workflow.
