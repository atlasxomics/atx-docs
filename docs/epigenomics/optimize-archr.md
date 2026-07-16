# optimize archr

!!! info "At a glance"
    **Repository:** [atlasxomics/archr](https://github.com/atlasxomics/archr) ·
    **Display name:** optimize archr ·
    **Modality:** Epigenomics · **Stage:** Optimization

## Overview

**optimize archr** is a [Latch](https://latch.bio/) Workflow for assessing
spatial epigenomic data generated via
[DBiT-seq](https://www.nature.com/articles/s41586-022-05094-1). Given fragments
from the [preprocessing](preprocessing.md) Workflow plus spatial information,
**optimize archr** returns plots and summary statistics to inform further
processing.

The Workflow uses [ArchR](https://www.archrproject.com/) to generate QC
parameters (TSS, fragments per cell) and perform dimensionality reduction /
clustering, and [Seurat](https://satijalab.org/seurat/) to spatially align the
data. It accepts one or many tissue-samples ("Runs"); all Runs are merged into a
single ArchRProject. The shared filtered ArchRProject is created **once**, then
dimensionality-reduction and clustering parameter sets are evaluated **in
parallel**.

## Steps

1. **`prepare_archr_task`** — The heavy, shared setup, run **once**. Executes
   `archr_prepare.R`, which for each Run calls ArchR's
   [`createArrowFiles`](https://www.archrproject.com/reference/createArrowFiles.html)
   to build Arrow files with a tile matrix (`tile_size` bins) and gene-score
   matrix, filtering cells by minimum TSS enrichment (`min_TSS`) and minimum
   fragments (`min_frags`). All Runs are then merged into a single
   [`ArchRProject`](https://www.archrproject.com/), per-run QC medians (TSS,
   fragments) are written to `medians.csv`, and the base project is saved. Every
   parameter set reuses this one filtered project.
2. **`build_archr_opt_jobs_task`** — *(plumbing)* Expands the list-valued
   parameters into the full grid of parameter sets to evaluate.
3. **`archr_opt_set_task`** — The per-set evaluation, **fanned out in parallel**
   (one task per parameter set via `map_task`). Executes `archr_opt_set.R` on the
   shared project and emits that set's figures — UMAP embeddings (colored by
   sample and by cluster), spatial cluster maps, and QC plots — plus
   barcode→cluster CSVs. Per set, the ArchR pipeline runs:
    - [`addIterativeLSI`](https://www.archrproject.com/reference/addIterativeLSI.html)
      for dimensionality reduction (`lsi_iterations`, `lsi_resolution`,
      `lsi_varfeatures`, `maximum_dims`), with optional
      [Harmony](https://github.com/immunogenomics/harmony) batch integration;
    - [`addClusters`](https://www.archrproject.com/reference/addClusters.html)
      (Seurat method, `clustering_resolution`, capped at `max_clusters`);
    - [`addUMAP`](https://www.archrproject.com/reference/addUMAP.html)
      (`umap_mindist`); and spatial alignment via
      [Seurat](https://satijalab.org/seurat/).
4. **`aggregate_archr_task`** — Collects every set's figures into paginated,
   browsable **HTML galleries** (`umap_plots`, `spatialdim_plots`, `qc_plots` —
   one page per parameter set), copies the QC `medians.csv` and the per-set
   cluster CSVs, and assembles the final comparison output.

## Inputs

**Per Run** (`runs: List[Run]`):

| Field | Type | Description |
|---|---|---|
| `run_id` | str | Identifier for the Run. |
| `fragments_file` | LatchFile | `fragments.tsv.gz` from [preprocessing](preprocessing.md). |
| `spatial_dir` | LatchDir | [Spatial folder](../reference/glossary.md#spatial-folder) (tissue images, `tissue_positions_list.csv`, metadata). |
| `condition` | str | Optional experimental condition (e.g. `control`, `diseased`). |

**Global / swept parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `genome` | enum | — | Reference genome. |
| `project_name` | str | — | Output folder name. |
| `lsi_resolution` | List[float] | `[0.5]` | *Swept.* `clusterParams` resolution for `addIterativeLSI`. |
| `lsi_varfeatures` | List[int] | `[25000]` | *Swept.* `varFeatures` for `addIterativeLSI`. |
| `clustering_resolution` | List[float] | `[1.0]` | *Swept.* `resolution` for `addClusters`. |
| `maximum_dims` | List[int] | `[30]` | *Swept.* Maximum LSI dimensions retained. |

??? note "Hidden / advanced parameters"
    | Parameter | Default | Description |
    |---|---|---|
    | `tile_size` | `5000` | Tile-matrix bin size. |
    | `min_TSS` | `2.0` | Minimum TSS enrichment per cell. |
    | `min_frags` | `0` | Minimum fragments per cell. |
    | `lsi_iterations` | `2` | Iterative LSI rounds. |
    | `umap_mindist` | `0.0` | UMAP minimum distance. |
    | `min_cells_cluster` | `20` | Minimum cells per cluster. |
    | `max_clusters` | `25` | Maximum number of clusters. |

## Outputs

Written to `latch:///optimize_outs/<project_name>/`.

| Path | Description |
|---|---|
| `medians.csv` | Per-run QC medians (TSS enrichment, fragments per cell) from the shared prepared project. |
| `figures/umap_plots_<NNN>.png` | UMAP embeddings for each parameter set (colored by sample and by cluster) — one page per set. |
| `figures/spatialdim_plots_<NNN>.png` | Spatial cluster maps for each parameter set. |
| `figures/qc_plots_<NNN>.png` | QC plots for each parameter set. |
| `figures/*.html` | Browsable HTML galleries paging through the figures above, for side-by-side comparison of sets. |
| `cluster_csvs/*_bc-clusters.csv` | Barcode→cluster assignments for each parameter set. |

Intermediate artifacts (the shared base ArchRProject and per-set outputs) are
kept under `latch:///optimize_outs/<project_name>/_intermediate/`. Use the
galleries and cluster tables to choose the parameter set to carry into
[create ArchRProject](create-archrproject.md).

## Example run

*(Add a representative LaunchPlan / batch-table example here.)*
