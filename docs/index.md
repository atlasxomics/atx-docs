# AtlasXomics Documentation

![ATX Preview](assets/images/atx_hype.png)

Welcome to the documentation for the **AtlasXomics (ATX)** spatial-omics data
processing platform. AtlasXomics has developed a suite of tools that enable
scientists to process spatial-omics data both **on the cloud** and **locally**.
Here we provide comprehensive, end-to-end documentation for that platform.

## Platform overview

![DBiT-seq workflow diagram](assets/images/DBiT-seq_workflow_diagram.png)

Raw data consists of **FASTQ** and **image** files. From these, ATX supports two
primary processing paths and an optional combined path:

- **Epigenomics** — spatial ATAC-seq and CUT&Tag
- **Whole Transcriptome** — spatial RNA-seq
- **Co-Profiling** — an optional path that combines epigenomic and
  transcriptomic secondary outputs

Our standard processing pipeline runs on the **LatchBio** cloud platform.
Outputs are stored in the **Latch File system** (*Latch Data*) and visualized in
**Plots**. Image data can be processed with **AtlasXBrowser** on a Latch Pod or
locally. We also provide guidance for [**"DIY"**](tools/diy.md) processing on a local machine.

## Data flow at a glance

```text
    FASTQ                                images
      │                                    │
      ▼                                    ▼
 Preprocessing / QC                   AtlasXBrowser
      │                                    │
      ▼                                    ▼
 Optimization (parameter sweeps) ◄──── spatial folder
      │
      ▼
 Secondary analysis (ArchRProject, AnnData, Seurat)
      │
      ├──────────────► Plots (visualization)
      │
      ▼
 Co-Profiling (optional)   (epigenome × transcriptome)
```

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

## Where to start

<div class="grid cards" markdown>

- **[Epigenomics](epigenomics/index.md)**
  Preprocess, optimize, and analyze spatial ATAC-seq / CUT&Tag data.

- **[Whole Transcriptome](transcriptome/index.md)**
  QC and secondary analysis for spatial RNA-seq data.

- **[Co-Profiling](coprofiling/index.md)**
  Integrate epigenomic and transcriptomic outputs.

- **[Glossary](reference/glossary.md)**
  Latch platform concepts and ATX-specific terms, defined.

</div>

## Data organization

!!! warning "Placeholder — to be fleshed out"
    This section documents how data is organized within **Customer Workspaces**
    on Latch. It is specific to customer-facing workspaces and does not describe
    ATX internal storage.

Customer Workspaces use a consistent set of top-level folders:

| Folder | Contents |
|---|---|
| **`Raw_Data`** | Raw FASTQ files. |
| **`Processed_Data`** | Outputs from the secondary processing pipeline. |
| **`Optimized_Data`** | Outputs of optimization Workflows. *(definition to confirm)* |

## Tutorials

Step-by-step, click-through tutorials for running ATX Workflows and tools on
Latch are maintained in Scribe.

- **[AtlasXomics / LatchBio Tutorials (collection)](https://scribehow.com/o/01jzlMHMRV-kYMeF_qMI2Q/page/AtlasXomics_LatchBio_Tutorials__yUhN8xU7TrOmEcrhks-n3A?referrer=documents)**
- **[Running AtlasXBrowser](https://scribehow.com/o/01jzlMHMRV-kYMeF_qMI2Q/viewer/Running_AtlasXBrowser__8Wp0TTJ7SRW85_-vbGe5SA)**
- **[DIY processing of Epigenomic data](https://github.com/atlasxomics/ATX_epigenomics)**

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

- Browse the [Tutorials](#tutorials) above for guided, click-through walkthroughs.
- Each Workflow page links to its source repository on
  [GitHub](https://github.com/atlasxomics). Some Workflows are private; please
  contact support@atlasxomics.com for access.
- Unfamiliar terms are defined in the [Glossary](reference/glossary.md).
- Contact support@atlasxomics.com with questions and concerns.

---

*Maintained by [AtlasXomics, Inc.](https://github.com/atlasxomics)*
