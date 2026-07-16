# create ArchRProject

!!! info "At a glance"
    **Repository:** [atlasxomics/archrproject](https://github.com/atlasxomics/archrproject) ·
    **Display name:** create ArchRProject ·
    **Modality:** Epigenomics · **Stage:** Secondary Analysis

## Overview

**create ArchRProject** generates the R objects and data for downstream analysis
of epigenomic [DBiT-seq](https://www.nature.com/articles/s41586-022-05094-1)
experiments. Given fragments and spatial information, it performs the heavy
computational steps of [ArchR](https://www.archrproject.com/) and
[Seurat](https://satijalab.org/seurat/) and returns files that can be dropped
into custom scripts for more nuanced analysis without re-running intensive
computation.

All input Runs are merged into a single ArchRProject. Use the parameters chosen
during [optimize archr](optimize-archr.md) to configure this run.

## Steps

1. **`archr_task`** — Runs `archr_objs.R` (via `Rscript`), which builds the
   ArchRProject from the Run fragments and:
    - creates Arrow files and filters cells (`min_TSS`, `min_frags`, `tile_size`);
    - runs iterative LSI dimensionality reduction (`addIterativeLSI` —
      `lsi_iterations`, `lsi_resolution`, `lsi_varfeatures`, `maximum_dims`);
    - clusters cells (`addClusters` — `clustering_resolution`, capped at
      `max_clusters`, `min_cells_cluster`) and computes UMAP (`umap_mindist`);
    - spatially aligns the data with Seurat.

    The finished ArchRProject is written to `output_dir`.

## Inputs

**Per Run** (`runs: List[Run]`):

| Field | Type | Description |
|---|---|---|
| `run_id` | str | Identifier for the Run. |
| `fragments_file` | LatchFile | `fragments.tsv.gz` from preprocessing. |
| `spatial_dir` | LatchDir | [Spatial folder](../reference/glossary.md#spatial-folder). |
| `condition` | str | Optional experimental condition (e.g. `control`, `diseased`). |

**Global parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `genome` | enum | — | Reference genome. |
| `project_name` | str | — | Output folder name. |
| `lsi_resolution` | float | `0.5` | `clusterParams` resolution for `addIterativeLSI`. |
| `lsi_varfeatures` | int | `25000` | `varFeatures` for `addIterativeLSI`. |
| `clustering_resolution` | float | `1.0` | `resolution` for `addClusters`. |
| `output_dir` | LatchDir | `latch:///ArchRProjects/` | Output location. |

??? note "Hidden / advanced parameters"
    | Parameter | Default | Description |
    |---|---|---|
    | `tile_size` | `5000` | Tile-matrix bin size. |
    | `min_TSS` | `2.0` | Minimum TSS enrichment per cell. |
    | `min_frags` | `0` | Minimum fragments per cell. |
    | `lsi_iterations` | `2` | Iterative LSI rounds. |
    | `maximum_dims` | `30` | Maximum LSI dimensions retained. |
    | `umap_mindist` | `0.0` | UMAP minimum distance. |
    | `num_threads` | `50` | Threads for ArchR. |
    | `min_cells_cluster` | `20` | Minimum cells per cluster. |
    | `max_clusters` | `25` | Maximum number of clusters. |
    | `include_y_chromosome` | `False` | Retain chrY features. |

## Outputs

A `LatchDir` containing the assembled **ArchRProject** (Arrow files,
dimensionality reduction, clustering, spatial alignment, and exported tables),
written under `output_dir` (default `latch:///ArchRProjects/<project_name>`).

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
