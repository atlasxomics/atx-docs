# Transcriptome Plots

!!! info "At a glance"
    **Repository:** [atlasxomics/plots_wt](https://github.com/atlasxomics/plots_wt) ·
    **Display name:** Transcriptome Plots ·
    **Modality:** Whole Transcriptome · **Stage:** Plots

## Overview

Transcriptome Plots is an interactive [Latch Plots](https://wiki.latch.bio/plots/overview)
notebook — an **omic-agnostic AnnData viewer** for spatial RNA-seq results. Each
notebook runs on its own cloud VM and is driven through a GUI in
[console.latch.bio](https://console.latch.bio); the interface is organized into
**tabs** (each tab is a module).

!!! tip "Full walkthrough"
    For a click-through walkthrough of launching and using Plots, see the
    [AtlasXPlots Tutorial](https://scribehow.com/o/01jzlMHMRV-kYMeF_qMI2Q/page/AtlasXPlots_Tutorial__CDO2ISjWQmyQ_6DfkOgc-g).

## How Plots connects to secondary analysis

Transcriptome Plots loads a **single AnnData `.h5ad`** — the reduced
**`combined_sm.h5ad`** produced by [optimize_wt](optimize-wt.md). It uses the
`sample`, `condition`, and `cluster` `obs` columns as defaults when present
(they're optional). optimize_wt also emits a **`Launch_Plots/artifact.json`**
that opens its result directly in this Plots template.

!!! note "Reduced object"
    `combined_sm.h5ad` is the visualization-optimized object (`.X` cast to
    `float16`; raw counts / layers stripped). It's the right input for Plots, but
    **not** for downstream computation — see the
    [note on the optimize_wt page](optimize-wt.md#outputs).

## Starting Plots

1. **Launch from the Workflow output (recommended).** In Latch Data, open the
   `wt_opts/<project>/` output folder and use its **`Launch_Plots/artifact.json`**
   / *Open in Plots* action to start a notebook **pre-loaded** with the data.
2. **Open Plots and select data manually.** Start a new notebook from the
   **Plots** module in the Latch Console, then use the **Select Data** tab to
   point it at `combined_sm.h5ad`. Setting a data path (re)initializes every
   other tab.

## Plotting modules

Each module is a tab in the Plots GUI.

| Module | What it does |
|---|---|
| **Welcome** | Landing tab and report intro, plus the **H5 Viewer** for browsing the loaded AnnData — spatial and UMAP views, coloring by gene, and layout controls. |
| **Select Data** | Points the notebook at the `.h5ad` (the optimize_wt `combined_sm.h5ad`); specifying the path (re)initializes all other tabs. |
| **Heatmap** | Gene-expression **heatmaps** across clusters or groups. |
| **Violin Plots** | Distribution of a gene's expression across clusters or groups. |
| **Proportion Plot** | Cluster / condition **composition** — the proportion of cells per cluster across samples or conditions. |

!!! tip "Other modalities"
    The epigenomics and co-profiling paths have their own Plots apps —
    [Epigenomics Plots](../epigenomics/plots.md) and
    [Co-Profiling Plots](../coprofiling/plots.md).
