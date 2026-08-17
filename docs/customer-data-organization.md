# Customer Data Organization

This page describes how data is organized within **Customer Workspaces** on
Latch.

Workspaces are organized **by Workflow output**: each top-level directory holds
the results of one Workflow, and within it each project or run gets its own
subdirectory. Directory names encode the **modality** and **stage** — for
example `atac_optimize_archr/` holds ATAC (epigenomic) optimization results
produced with ArchR.

## Workspace layout

```text
<workspace>/
├── spatials/                        # tissue images + metadata (AtlasXBrowser)
│
├── fastq2frags/                     # ATAC: FASTQ → fragments
├── cram2frags/                      # ATAC: CRAM → fragments
│
├── atac_optimize_archr/             # ATAC: parameter sweep (ArchR)
├── atac_optimize_snap/              # ATAC: parameter sweep (SnapATAC2)
│
├── atac_analysis_archr/             # ATAC: secondary analysis (ArchR)
├── atac_analysis_snap/              # ATAC: secondary analysis (SnapATAC2)
├── compare_outs/                    # ATAC: differential comparisons
│
├── rna_preprocessing/               # RNA: alignment + QC
├── rna_analysis/                    # RNA: secondary analysis
│
└── copro_integration_analysis/      # Co-Profiling: epigenome × transcriptome
```

## Directory reference

| Directory | Produced by | Contents |
|---|---|---|
| `spatials/` | [AtlasXBrowser](tools/atlasxbrowser.md) | The [Spatial folder](reference/glossary.md#spatial-folder) per run — tissue images, `tissue_positions_list.csv`, and metadata. |
| `fastq2frags/` | [ATX epigenomic preprocessing](epigenomics/preprocessing.md) | Filtered FASTQs, Chromap alignment, the **fragments file**, and QC metrics/reports. |
| `cram2frags/` | `cram2frag_wf` | Fragments produced from CRAM input rather than FASTQ. |
| `atac_optimize_archr/` | [optimize archr](epigenomics/optimize-archr.md) | Parameter-sweep comparison figures and metrics (ArchR). |
| `atac_optimize_snap/` | [optimize_snap](epigenomics/optimize-snap.md) | Parameter-sweep comparison figures and metrics (SnapATAC2). |
| `atac_analysis_archr/` | [create ArchRProject](epigenomics/create-archrproject.md) | The ArchRProject, Seurat/AnnData objects, coverage tracks, peak BEDs, and analysis tables from ArchR. |
| `atac_analysis_snap/` | [ATX_snap](epigenomics/atx-snap.md) | Combined AnnData, gene-accessibility and motif results, and analysis tables from SnapATAC and ArchR. |
| `compare_outs/` | [compare clusters](epigenomics/compare-clusters.md) | Differential gene, peak, and motif results between user-specified groups. |
| `rna_preprocessing/` | [RNAQC](transcriptome/rnaqc.md) | STARsolo alignment, the gene-expression matrix, MultiQC report, and contamination screen. |
| `rna_analysis/` | [optimize_wt](transcriptome/optimize-wt.md) | Clustered AnnData, marker genes, spatially variable genes, and figures. |
| `copro_integration_analysis/` | [atx_glue](coprofiling/atx-glue.md) | SpatialGlue-integrated objects, coverage tracks, peak-to-gene links, correlation results. |

!!! note "Raw FASTQs are not delivered by default"
    Instead of raw sequencing reads, workspaces receive the **filtered FASTQs**
    returned by [ATX epigenomic preprocessing](epigenomics/preprocessing.md) —
    the reads that survive linker filtering, under
    `fastq2frags/<run_id>/filtered_fastqs/`.

## Inside a Workflow directory

Each top-level directory contains one subdirectory per **run** (for
run-level Workflows) or per **project** (for Workflows that merge multiple runs
together). For example, epigenomic preprocessing writes one `<run_id>/` folder
per run:

```text
fastq2frags/
└── <run_id>/
    ├── fragments.tsv.gz                # the fragments file
    ├── fragment_analysis_report.html   # QC report
    ├── <run_id>_cell.bw                # coverage track
    ├── filtered_fastqs/                # linker-filtered reads + bbduk stats
    ├── chromap_output/                 # alignment (BED, fragments, index, log)
    ├── run_metrics/                    # per-tixel metrics and QC plots
    └── pycistopic_metrics/             # summary statistics and peaks
```

See each Workflow's **Outputs** section for the full contents of its directory.

??? note "Old structure (superseded)"
    Earlier Customer Workspaces grouped data by processing stage rather than by
    Workflow. These folders are **no longer used** for new deliveries, but you
    may still encounter them in older workspaces:

    | Folder | Contents |
    |---|---|
    | **`Raw_Data`** | Raw FASTQ files, spatial folders, preprocessing outputs for [ATAC](epigenomics/preprocessing.md#outputs) and [RNA](transcriptome/rnaqc#outputs). |
    | **`Processed_Data`** | Outputs from the secondary processing pipeline. |
    | **`Optimized_Data`** | Preprocessing results from shallow-sequenced optimization experiments (usually bulks).  |
