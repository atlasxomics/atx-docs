# ATX_snap

!!! info "At a glance"
    **Repository:** [atlasxomics/ATX_snap](https://github.com/atlasxomics/ATX_snap) ·
    **Display name:** atx_snap ·
    **Modality:** Epigenomics · **Stage:** Secondary Analysis

## Overview

**ATX_snap** is the [SnapATAC2](https://kzhang.org/SnapATAC2/)-based secondary
analysis Workflow — the computationally intensive counterpart to
[optimize_snap](optimize-snap.md). Using the parameters selected during
optimization, it produces analysis-ready AnnData objects, gene-accessibility
matrices, and motif results for a spatial ATAC experiment. All input Runs are
merged into a single combined object.

## Steps

The tasks run in sequence, each enriching the results directory:

1. **`make_adata`** — Build the combined AnnData: add the tile matrix
   (`tile_size`), select features (`n_features`), compute spectral embedding
   (`n_comps`), and cluster with Leiden (`resolution`, `clustering_iters`,
   `leiden_iters`, `min_cluster_size`) after filtering cells (`min_tss`,
   `min_frags`).
2. **`genes_task`** — Compute per-gene accessibility (gene-activity) scores.
3. **`combine_gene_h5ads_task`** — Merge the per-Run gene AnnData files into a
   single gene-expression object.
4. **`motifs_task`** — Compute motif enrichment / deviations.
5. **`gene_stats_task`** — Compute gene-level statistics (e.g. cluster markers).
6. **`complete_results_task`** — Assemble the base, gene, gene-expression, gene-
   stats, and motif outputs into the final results bundle.

!!! note "Internal step"
    A final `registry_task` writes outputs to the Latch Registry (see
    [Internal Tasks](../getting-started/platform-overview.md#internal-atx-only-tasks)).

## Inputs

**Per Run** (`runs: List[Run]`):

| Field | Type | Description |
|---|---|---|
| `run_id` | str | Identifier for the Run. |
| `fragments_file` | LatchFile | `fragments.tsv.gz` from preprocessing. |
| `spatial_dir` | LatchDir | [Spatial folder](../reference/glossary.md#spatial-folder). |
| `condition` | str | Optional experimental condition. |

**Global parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `genome` | enum | — | Reference genome. |
| `project_name` | str | — | Output folder name. |
| `tile_size` | int | `5000` | Tile-matrix bin size. |
| `n_features` | int | `25000` | Most-accessible tiles used for analysis. |
| `n_comps` | int | `30` | Spectral-embedding dimensions. |
| `resolution` | float | `1.0` | Leiden clustering resolution. |
| `clustering_iters` | int | `1` | Iterative feature-selection rounds. |
| `output_dir` | LatchDir | `latch:///snap_outs/` | Output location. |

??? note "Hidden / advanced parameters"
    | Parameter | Default | Description |
    |---|---|---|
    | `leiden_iters` | `-1` | Leiden iterations (`-1` = until convergence). |
    | `min_cluster_size` | `20` | Minimum cells per cluster. |
    | `min_tss` | `2.0` | Minimum TSS enrichment per cell. |
    | `min_frags` | `10` | Minimum fragments per cell. |
    | `include_y_chromosome` | `False` | Retain chrY features. |

## Outputs

A `LatchDir` under `output_dir` (default `latch:///snap_outs/<project_name>`)
containing the combined AnnData, gene-accessibility and gene-expression objects,
motif results, gene statistics, clustering, and exported tables (`obs`,
`spatial`, `X_umap`, `spectral`, …).

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
