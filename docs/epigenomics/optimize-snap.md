# optimize_snap

!!! info "At a glance"
    **Repository:** [atlasxomics/optimize_snap](https://github.com/atlasxomics/optimize_snap) ·
    **Display name:** optimize_snap ·
    **Modality:** Epigenomics · **Stage:** Optimization

## Overview

**optimize_snap** evaluates the quality of an epigenomic
[DBiT-seq](https://www.nature.com/articles/s41586-022-05094-1) experiment and
tests an array of parameter combinations against analysis outcomes. It is a
preliminary Workflow, run **before** the computationally intensive
[ATX_snap](atx-snap.md) secondary analysis, to inform which parameters to use.

It is the Python-based alternative to [optimize archr](optimize-archr.md):
analysis is performed with [SnapATAC2](https://kzhang.org/SnapATAC2/) and
[Scanpy](https://scanpy.readthedocs.io/) rather than ArchR/Seurat. Given
fragments and spatial information, it returns plots and summary statistics for
each parameter set. All Runs are merged into a single combined AnnData object,
then each parameter combination is evaluated in parallel.

## Steps

1. **`combine_task`** — Merge input Runs into a combined AnnData
   (`combined.h5ad`), add the SnapATAC2 tile matrix
   ([`pp.add_tile_matrix`](https://kzhang.org/SnapATAC2/api/_autosummary/snapatac2.pp.add_tile_matrix.html),
   `bin_size = tile_size`), and apply cell filters (min TSS, min fragments).
   A precomputed object can be supplied via **combined h5ad override**.
2. **`build_opt_jobs_task`** — Expand the list-valued parameters (`n_features`,
   `n_comps`, `resolution`, `varfeat_iters`) into the full grid of parameter
   sets to evaluate.
3. **`mapper_opt_task`** — For each set (run in parallel): select features
   ([`pp.select_features`](https://kzhang.org/SnapATAC2/api/_autosummary/snapatac2.pp.select_features.html)),
   compute spectral embedding
   ([`tl.spectral`](https://kzhang.org/SnapATAC2/api/_autosummary/snapatac2.tl.spectral.html),
   `n_comps`), and cluster with Leiden
   ([`tl.leiden`](https://kzhang.org/SnapATAC2/api/_autosummary/snapatac2.tl.leiden.html),
   `resolution`, `n_iterations = varfeat_iters`, `min_cluster_size`).
4. **`aggregate_opt_results_task`** — Collect per-set outputs into comparison
   plots and summary statistics.

## Inputs

**Per Run** (`runs: List[Run]`):

| Field | Type | Description |
|---|---|---|
| `run_id` | str | Identifier for the Run. |
| `fragments_file` | LatchFile | `fragments.tsv.gz` from preprocessing. |
| `spatial_dir` | LatchDir | [Spatial folder](../reference/glossary.md#spatial-folder). |
| `condition` | str | Optional experimental condition (e.g. `control`, `diseased`). |

**Global / swept parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `genome` | enum | — | Reference genome. |
| `project_name` | str | — | Output folder name. |
| `tile_size` | int | `5000` | Genomic bin size for the tile matrix. |
| `n_features` | List[int] | `[25000]` | *Swept.* Most-accessible tiles used for analysis. |
| `n_comps` | List[int] | `[30]` | *Swept.* Spectral-embedding dimensions. |
| `resolution` | List[float] | `[1.0]` | *Swept.* Leiden clustering resolution. |
| `varfeat_iters` | List[int] | `[1]` | *Swept.* Iterative feature-selection rounds (`1` = none). |
| `combined_h5ad_override` | LatchFile | — | Optional precomputed `combined.h5ad`. |

??? note "Hidden / advanced parameters"
    | Parameter | Default | Description |
    |---|---|---|
    | `leiden_iters` | `-1` | Leiden iterations (`-1` = until convergence). |
    | `min_cluster_size` | `20` | Minimum cells per cluster. |
    | `min_tss` | `2.0` | Minimum TSS enrichment per cell. |
    | `min_frags` | `10` | Minimum fragments per cell. |
    | `subsample_fraction` | — | Fraction of cells to retain (0–1). |
    | `subsample_n_cells` | — | Absolute number of cells to retain. |
    | `subsample_seed` | `42` | Random seed for subsampling. |
    | `pt_size` | — | Override cluster spatial-plot point size. |
    | `qc_pt_size` | — | Override QC spatial-plot point size. |

## Outputs

Per-parameter-set plots and summary statistics written under
`latch:///snap_opts/<project_name>/`. The Workflow returns no value (results are
written to Latch Data for review).

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
