# Epigenomics Plots

!!! info "At a glance"
    **Repository:** [atlasxomics/plots_epigenome](https://github.com/atlasxomics/plots_epigenome) ·
    **Display name:** Epigenomics Plots ·
    **Modality:** Epigenomics · **Stage:** Plots

## Overview

Epigenomics Plots is an interactive [Latch Plots](https://wiki.latch.bio/plots/overview)
notebook for **exploratory analysis and figure generation** from spatial
epigenomic DBiT-seq experiments. Each notebook runs on its own cloud VM and is
driven through a GUI in [console.latch.bio](https://console.latch.bio); the
interface is organized into **tabs** (each tab is a module), and you move between
tabs to explore results.

## How Plots connects to secondary analysis

Plots reads the objects produced by the epigenomic **secondary analysis**
Workflows — [ATX_snap](atx-snap.md) or [create ArchRProject](create-archrproject.md).
Specifically, it consumes:

- **`<project>_sm_ge.h5ad`** — the reduced combined **gene-accessibility** AnnData;
- **`<project>_sm_motifs.h5ad`** — the reduced combined **motif-deviation** AnnData;
- the **coverage bigWig** folders (`cluster_coverages/`, `sample_coverages/`, …).

These are exactly the `*_sm_*.h5ad` objects and `*_coverages/` folders listed in
those Workflows' outputs. Both Workflows also emit a **`Launch_Plots/artifact.json`**
that opens their result directly in this Plots template.

## Starting Plots

There are two ways to open a result in Plots:

1. **Launch from a Workflow output (recommended).** In Latch Data, open the
   secondary-analysis output folder (e.g. `snap_outs/<project>/` or
   `ArchRProjects/<project>/`) and use its **`Launch_Plots/artifact.json`** /
   *Open in Plots* action. This starts a Plots notebook **pre-loaded** with that
   experiment's data.
2. **Open Plots and select data manually.** Start a new notebook from the
   **Plots** module in the Latch Console, then use the **Select Data** tab to
   point it at the `*_sm_ge.h5ad` and `*_sm_motifs.h5ad` files (plus the coverage
   folders). Setting a data path (re)initializes every other tab.

!!! tip "Full walkthrough"
    For a click-through walkthrough of launching and using Plots, see the
    [AtlasXPlots Tutorial](https://scribehow.com/o/01jzlMHMRV-kYMeF_qMI2Q/page/AtlasXPlots_Tutorial__CDO2ISjWQmyQ_6DfkOgc-g).
    The two methods above summarize the app's data-loading code; defer to the
    tutorial for exact click-steps.

## Plotting modules

Each module is a tab in the Plots GUI.

| Module | What it does |
|---|---|
| **Welcome** | Landing tab and report intro, plus the **H5 Viewer** for browsing the loaded AnnData — spatial and UMAP views, toggling gene vs. motif data, layout controls, and **lasso-selecting cells** into custom annotations (used to feed the Compare workflow). |
| **Select Data** | Points the notebook at the experiment's `*_sm_ge.h5ad` / `*_sm_motifs.h5ad` objects and coverage folders; specifying the path (re)initializes all other tabs. |
| **Heatmap** | Gene-accessibility and motif-enrichment **heatmaps** across clusters (from the `genes_per_*_hm` / `motif_per_*_hm` matrices). |
| **Violin Plots** | Distribution of a feature (gene accessibility or motif deviation) across clusters or groups. |
| **Volcano** | **Volcano plots** of differential gene accessibility / motif enrichment between groups. |
| **Proportion Plot** | Cluster / condition **composition** — the proportion of cells per cluster across samples or conditions. |
| **Track Browser** | Genome-browser view of **coverage bigWig tracks**, grouped by cluster, sample, or condition. |
| **Motif Logo** | **Sequence-logo** display of a motif's position-weight matrix (genome-specific `seqlogo_*` data). |
| **Neighborhood Analysis** | Spatial **neighborhood / niche** analysis — which clusters spatially co-localize. |
| **Compare** | Runs the [compare clusters](compare-clusters.md) Workflow **from within Plots**: select two cell groups (via lasso / annotation), launch the Workflow, then fetch and visualize the gene, motif, and track-browser results. |
| **Bulk Score Genes** | **Gene-set scoring and cell-type assignment** — assign marker gene sets, score cells, review in the H5 viewer, and build a score heatmap. |

!!! tip "Other modalities"
    The transcriptome and co-profiling paths have their own Plots apps —
    [Transcriptome Plots](../transcriptome/plots.md) and
    [Co-Profiling Plots](../coprofiling/plots.md).
