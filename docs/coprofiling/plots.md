# Co-Profiling Plots

!!! info "At a glance"
    **Repository:** [atlasxomics/plots_copro](https://github.com/atlasxomics/plots_copro) ·
    **Display name:** Co-Profiling Plots ·
    **Modality:** Co-Profiling · **Stage:** Plots

## Overview

Co-Profiling Plots — the **Spatial Single-Cell Co-Profiling Report** — is an
interactive [Latch Plots](https://wiki.latch.bio/plots/overview) notebook for
jointly exploring the integrated **epigenome × transcriptome** result. Each
notebook runs on its own cloud VM and is driven through a GUI in
[console.latch.bio](https://console.latch.bio), organized into **tabs** (each
tab is a module).

!!! tip "Full walkthrough"
    For a click-through walkthrough of launching and using Plots, see the
    [AtlasXPlots Tutorial](https://scribehow.com/o/01jzlMHMRV-kYMeF_qMI2Q/page/AtlasXPlots_Tutorial__CDO2ISjWQmyQ_6DfkOgc-g).

## How Plots connects to secondary analysis

Co-Profiling Plots loads an **[atx_glue](atx-glue.md) output folder**, which
contains the SpatialGlue-integrated objects:

- **`rna_copro_sm.h5ad`** — reduced transcriptome AnnData;
- **`atac_gs_copro_sm.h5ad`** — reduced ATAC gene-score AnnData;
- (the full `rna_copro.h5ad` / `atac_gs_copro.h5ad` are used as a fallback);
- a **`coverages/`** subdirectory of BigWig tracks;
- a **`peak2gene/`** subdirectory of peak-to-gene links.

The viewer lets you **toggle between the two SpatialGlue modalities** (RNA and
ATAC gene score) and color by shared features.

## Starting Plots

1. **Open Plots and select the glue output (recommended).** Start a notebook
   from the **Plots** module in the Latch Console, then use the **Select Data**
   tab's folder picker to choose the **`atx_glue` output directory**
   (`glue_outs/<project>/`). The notebook loads the `*_copro_sm.h5ad` objects,
   `coverages/`, and `peak2gene/`, then (re)initializes every other tab.
2. **Launch from the Workflow output.** If a `Launch_Plots/artifact.json` is
   present in the atx_glue output, use its *Open in Plots* action to start
   pre-loaded.

## Plotting modules

Each module is a tab in the Plots GUI.

| Module | What it does |
|---|---|
| **Welcome** | Landing tab and the **Co-Profiling Report** intro, plus the **H5 Viewer** — browse the loaded AnnData, toggle between the RNA and ATAC gene-score modalities, and color by features. |
| **Select Data** | Points the notebook at an `atx_glue` output folder (the `*_copro_sm.h5ad` objects, `coverages/`, and `peak2gene/`); (re)initializes all other tabs. |
| **GE H5 Viewer** | Gene-expression / ATAC gene-score **H5 viewer**; can save ATAC H5 data back to Latch Data. |
| **Heatmap** | Feature **heatmaps** across clusters or groups. |
| **Proportion Plot** | Cluster / condition **composition** across samples or conditions. |
| **Track Browser** | Genome-browser view of **coverage BigWig tracks** from the `coverages/` folder. |
| **UMI Barplot** | **UMI counts** per cluster / sample. |

!!! tip "Other modalities"
    The epigenomics and transcriptome paths have their own Plots apps —
    [Epigenomics Plots](../epigenomics/plots.md) and
    [Transcriptome Plots](../transcriptome/plots.md).
