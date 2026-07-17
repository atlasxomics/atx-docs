# Platform Overview

The AtlasXomics platform is built on top of **[LatchBio](https://latch.bio/)**, a
cloud environment for building and running bioinformatics Workflows. This page
explains the pieces you will encounter throughout the rest of this
documentation.

## Core Latch concepts

| Concept | What it is |
|---|---|
| [**Workflow**](https://wiki.latch.bio/workflows/overview) | A versioned, containerized pipeline made up of one or more **Tasks**. Each ATX Workflow corresponds to a GitHub repository under [atlasxomics](https://github.com/atlasxomics). |
| [**Task**](https://wiki.latch.bio/workflows/overview) | A single step within a Workflow (e.g. filtering, alignment). Tasks are the units the Latch UI displays while a Workflow runs. |
| [**Latch Data**](https://wiki.latch.bio/wiki/data/overview) | The Latch file system where inputs and outputs are stored. Remote paths are written as `latch:///...`. |
| [**Plots**](https://wiki.latch.bio/plots/overview) | Latch's interactive visualization environment, where ATX plotting apps render Workflow outputs. |
| [**Registry**](https://docs.latch.bio/registry/overview.html) | A light sample database that is **part of Latch** — stores samples, runs, and metadata alongside your data. |
| [**Pod**](https://wiki.latch.bio/wiki/pods/overview) | An interactive, customizable cloud compute instance (similar to an EC2 instance) preconfigured with **Jupyter** and **RStudio**. Pods can be used for interactive analysis as well as running tools such as AtlasXBrowser. |

## Processing stages

Every modality (Epigenomics, Whole Transcriptome, Co-Profiling) follows the same
overall shape. We use consistent stage names throughout this documentation:

1. **Preprocessing / QC** — *primary analysis*: alignment and QC of FASTQ files,
   and processing of image data.
2. **Optimization** — parameter sweeps that evaluate multiple
   dimensionality-reduction / clustering settings in parallel to inform final
   processing.
3. **Secondary analysis** — post-alignment processing that moves aligned data
   toward more meaningful context: gene accessibility, peak calling, and motif
   deviations (epigenomic), clustering, cell typing, and spatial analysis, plus
   generation of objects (ArchRProject, AnnData, Seurat) for downstream work.
4. **Plots** — interactive visualization of the results.

## The `run_id` convention

An ATX **run id** follows the format `Dxxxxx_NGxxxxx`, for example
`D00000_NG00000`:

- the **`D` value** is the run ID — each run ID corresponds to a single **tissue
  slide**;
- the **`NG` value** identifies the **sequencing library**.

In ATX parlance, tissue-samples analyzed via DBiT-seq are termed **"Runs"**.

## Internal (ATX-only) Tasks

!!! note "Internal (ATX-only) Tasks"
    Several Workflows include Tasks that are **not relevant to customers** and
    exist only for AtlasXomics internal operations. You may see these in the
    Latch UI while a Workflow runs, but they do not affect your outputs:

    - **`lims_task`** — pushes QC results and run metadata to **SLIMS**, the ATX
      internal LIMS platform (separate from Latch).
    - **`upload_latch_registry`** / **`upload_registry_task`** — writes Workflow
      outputs and their locations to the **Latch Registry** (the light sample
      database built into Latch).

    These steps are typically gated behind an *"Upload to SLIMS"* or *"Registry
    Table ID"* parameter and can be ignored for external/DIY use. Individual
    Workflow pages therefore omit them from their **Steps** lists, and do not
    repeat this note.

## Getting help

- Browse the [Tutorials](tutorials.md) for guided, click-through walkthroughs.
- Each Workflow page links to its source repository on
  [GitHub](https://github.com/atlasxomics). Some Workflows are private; please contact support@atlasxomics.com for access.
- Unfamiliar terms are defined in the [Glossary](../reference/glossary.md).
- Contact support@atlasxomics.com with questions and concerns. 