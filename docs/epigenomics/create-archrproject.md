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
   ArchRProject and computes the full set of downstream analysis tables:
    - creates Arrow files and filters cells (`min_TSS`, `min_frags`, `tile_size`);
    - runs iterative LSI dimensionality reduction (`addIterativeLSI` —
      `lsi_iterations`, `lsi_resolution`, `lsi_varfeatures`, `maximum_dims`);
    - clusters cells (`addClusters` — `clustering_resolution`, capped at
      `max_clusters`, `min_cells_cluster`) and computes UMAP (`umap_mindist`);
    - spatially aligns the data with [Seurat](https://satijalab.org/seurat/);
    - computes **gene-accessibility scores** (ArchR's `GeneScoreMatrix`): for
      each gene, ATAC signal across the gene body and a surrounding regulatory
      window is summed with **exponential distance weighting** (respecting
      neighboring-gene boundaries) and smoothed with imputation weights, giving a
      per-cell, per-gene **proxy for expression**;
    - calls **peaks** with MACS2 and builds reproducible peak sets;
    - computes **motif activity** two ways: per-cell **motif deviations** with
      [chromVAR](https://greenleaflab.github.io/chromVAR/) (`addDeviationsMatrix`
      — accessibility of a TF's motif-bearing peaks vs. GC/accessibility-matched
      background), and **motif enrichment** in marker peaks
      (`peakAnnoEnrichment` — the hypergeometric `enrichedMotifs` tables);
    - runs **differential testing** per cluster / sample / condition
      ([`getMarkerFeatures`](https://www.archrproject.com/reference/getMarkerFeatures.html))
      to produce marker genes, marker peaks, spatially variable features, and
      condition volcano tables;
    - exports the ArchRProject, Seurat / AnnData objects, coverage tracks, peak
      BEDs, figures, analysis tables, and a Latch Plots artifact.

    Everything is written to `output_dir` (default
    `latch:///ArchRProjects/<project_name>`).

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

Loaded into Latch Data under `latch:///ArchRProjects/<project_name>/` (or your
chosen `output_dir`). Open the whole result in Plots via the included
`Launch_Plots/artifact.json`.

```text
ArchRProjects/<project_name>/
├── <project_name>_ArchRProject/            # Arrow files, peak sets, motif annotations, bigWigs
├── <run_id>_SeuratObj.rds, combined.rds    # gene-accessibility Seurat objects
├── <run_id>_SeuratObjMotif.rds, combined_m.rds   # motif-deviation Seurat objects
├── *_converted.h5ad, combined_*.h5ad       # AnnData objects
├── seqlogo.rds
├── {cluster,sample,condition}_coverages/   # .bw coverage tracks
├── {cluster,sample,condition}_peak_beds/   # BED files
├── figures/
├── tables/                                 # analysis tables + medians, params, embeddings, SVGs
└── Launch_Plots/artifact.json
```

### Objects & project

| Path | Description |
|---|---|
| `<project_name>_ArchRProject/` | The saved ArchRProject — Arrow files, project state, peak matrices, reproducible peak sets, motif annotations, and group bigWigs. |
| `<run_id>_SeuratObj.rds` / `combined.rds` | Per-run and combined **gene-accessibility** Seurat objects (with spatial coords + ArchR metadata). |
| `<run_id>_SeuratObjMotif.rds` / `combined_m.rds` | Per-run and combined **motif-deviation** Seurat objects. |
| `<run_id>_g_converted.h5ad` / `<run_id>_m_converted.h5ad` | Per-run AnnData conversions of the gene / motif objects. |
| `combined_ge.h5ad`, `combined_motifs.h5ad` | **Full** combined gene-accessibility and motif-deviation AnnData objects — use these for any downstream calculation. |
| `combined_sm_ge.h5ad`, `combined_sm_motifs.h5ad` | **Reduced (`_sm`)** versions for [Latch Plots](plots.md) — see the note below. |
| `seqlogo.rds` | Position weight matrices for motif sequence logos. |

!!! warning "Don't compute on the reduced (`_sm`) objects"
    The `_sm` objects are built for fast loading in [Plots](plots.md): `clean_adata`
    strips the raw counts (`.raw`), extra `layers` and `varm`, and all but a small
    set of grouping / QC `obs` columns, keeping only the feature matrix, the UMAP
    embedding, and spatial coordinates. **Most importantly, the feature matrix
    `.X` is cast to `float16`** — so the (originally integer) counts lose
    precision and are no longer exact.

    Because of the `float16` coercion (and the removed raw counts / layers), the
    `_sm` objects are **for visualization only** — do **not** use them for
    downstream calculations (differential accessibility, marker detection,
    re-clustering, etc.). Use the full `combined_ge.h5ad` / `combined_motifs.h5ad`
    objects for those.

### Coverage & peaks

| Path | Description |
|---|---|
| `cluster_coverages/`, `sample_coverages/`, `condition_coverages/` | `.bw` coverage tracks from ArchR group bigWig outputs. |
| `cluster_peak_beds/`, `sample_peak_beds/`, `condition_peak_beds/`, `condition_<n>_peak_beds/` | BED files exported from the reproducible peak sets. |

### Analysis tables (`tables/`)

Grouped by cluster, sample, and (when conditions are set) condition. Descriptions
follow the [ArchR output spec](https://www.archrproject.com/).

**Genes**

| File | Description |
|---|---|
| `ranked_genes_per_{cluster,sample,condition}.csv` | All genes with log2FC, mean difference, and FDR for each group. Compared with a t-test to random background points matched on TSS and log2(fragments); computed with `getMarkerFeatures`. |
| `genes_per_{cluster,sample}_hm.csv` | Marker-gene log2FC per group, filtered to `Pval ≤ 0.05` & `Log2FC ≥ 0.10`, used to build the gene heatmap (values beyond ±2 log2FC are clipped to keep the scale consistent). |
| `volcanoMarkers_genes_<n>.csv` | *(only when conditions exist)* Each condition vs. all others — log2FC, p-value, and adjusted p-value per gene (t-test), for the full sample and per cluster. |

**Peaks**

| File | Description |
|---|---|
| `marker_peaks_per_{cluster,sample,condition}.csv` | Marker peaks per group — like marker genes but using a **Wilcoxon** rank test; identifies peak location vs. background matched on TSS and log10(fragments); filtered to `Pval < 0.05` & `Log2FC ≥ 0.1`. |
| `complete_peak_list_{cluster,sample}.csv` | The unfiltered marker-peak list joined to peak-type annotation (distal, promoter, …), the closest gene, and peak-calling details (score quantiles, reproducibility). `Group_name` = cluster (group index is cluster + 1 due to R's 1-based vs Python's 0-based indexing). |

**Motifs**

| File | Description |
|---|---|
| `enrichedMotifs_{cluster,sample,condition}.csv` | Hypergeometric enrichment of motifs in each group's peaks vs. background — `mlog10Padj`, `mlog10p`, enrichment, background/compare proportions and frequencies, `nbackground`, `ncompare`, and feature. |
| `motif_per_{cluster,sample}_hm.csv` | Normalized `-log(Padj)` per group from the enrichment test, scaled 0–100 (top motif = 100), used to build the motif heatmap. |
| `volcanoMarkers_motifs_<n>.csv` | *(only when conditions exist)* Each condition vs. all others — mean difference, p-value, and adjusted p-value per motif, for the full sample and per cluster. |

### Additional files

| Path | Description |
|---|---|
| `tables/medians.csv` | Median fragments, FRIP, and TSS per spot for each sample (plus each sample's condition). |
| `tables/input_parameters.csv` | The parameters set for this run (clustering resolution, TSS filter, etc.). |
| `tables/UMAPHarmony.csv`, `tables/spatial.csv`, `tables/obs.csv` | UMAP embeddings, spatial coordinates, and per-cell metadata. |
| `tables/svg_genes.csv`, `tables/svg_motifs.csv` | Spatial-autocorrelation results for spatially variable genes and motifs. |
| `figures/` | UMAP, spatial, QC, heatmap, volcano, and spatially-variable-feature figures (PDF, PNG, and HTML galleries). |
| `Launch_Plots/artifact.json` | Latch Plots artifact metadata for opening the result in the AtlasXomics Plots template. |

## Example run

For a step-by-step walkthrough, see the Scribe tutorial:
[Running the Create ArchRProject workflow](https://scribehow.com/viewer/Running_the_Create_ArchRProject_workflow__vDDo4rdiRQ6UfVTUgyO5gg).
