# BarcodeQC

!!! info "At a glance"
    **Repository:** [atlasxomics/barcodeqc_wf](https://github.com/atlasxomics/barcodeqc_wf)
    (Workflow) · [atlasxomics/barcodeqc](https://github.com/atlasxomics/barcodeqc)
    (CLI) · **Display name:** Barcode QC

## Overview

**BarcodeQC** assesses barcode quality for a sequencing run from the **read 2**
(barcode) FASTQ — a fast early check before committing to a full
[preprocessing](../epigenomics/preprocessing.md) run. It serves two purposes:

1. **Quality assessment** — an interactive HTML report of barcode match rates and
   their spatial distribution, so you can spot failed lanes and low-quality runs
   up front.
2. **Correction tables** — it detects microfluidic artifacts and generates the
   [cleaning](../reference/glossary.md#cleaning) /
   [cross-talk correction](../reference/glossary.md#cross-talk-correction) tables
   (`cleanTable.csv`) that preprocessing consumes as its `ds_table`.

Running BarcodeQC **before** preprocessing is what lets the cleaning / cross-talk
steps run inline during preprocessing rather than as a later remediation loop
(see the [Epigenomics overview](../epigenomics/index.md#how-the-workflows-fit-together)).

## Steps

1. **`bc_task`** — Matches read-2 barcodes against the selected barcode set's
   k-mer whitelist (`merChecker`), builds the per-barcode spatial table, then
   runs the detection / cleaning scripts (`detectNclean_v1`,
   `detectNClean_smoothSlice_v2` across several extension / patch variants) to
   flag outlier rows/columns and produce the correction table and spatial QC
   plots. Reads are downsampled to `outReads` first.

## Inputs

| Parameter | Type | Default | Description |
|---|---|---|---|
| `sampleName` | str | — | Sample name (used to name outputs). |
| `remoteReadTwo` | LatchFile | — | Read 2 (barcode) FASTQ. |
| `bcSet` | str | `bc220` | Barcode set — `bc220` \| `fg96` \| `bc96` \| `bc50`. |
| `outReads` | int | `10000000` | Downsample target (reads to assess). |
| `seed` | int | `100` | Random seed for downsampling. |
| `tissuePos_file` | LatchFile | *(none)* | Optional tissue positions file. |
| `output_directory` | LatchDir | `latch:///bcQC_output` | Output location. |

## Outputs

Written to `output_directory` (default `latch:///bcQC_output/`), under a
`<sample>/` directory.

```text
bcQC_output/
└── <sample>/
    ├── <sample>_report.html            # interactive barcode QC report
    ├── <sample>_cleanTable.csv         # cleaning / cross-talk correction table (preprocessing ds_table)
    ├── <sample>_spatialTable.csv       # per-barcode spatial counts
    ├── <sample>_bcSpatial*.png         # barcode-density spatial heatmaps
    ├── <sample>_plate_map.html/.png, _pareto.html, _barplot.html, _denseOnOff.html/.png
    ├── <sample>_hiLoWarn.csv/.png      # high / low outlier lane warnings
    └── clean_v1_outputs/, clean_v2_*_outputs/   # detection / cleaning variants
```

| File | Description |
|---|---|
| `<sample>_report.html` | Interactive barcode QC report — match rates, spatial distribution, and warnings. |
| `<sample>_cleanTable.csv` | The correction table (`mer`, `finalDownFract`) used as the preprocessing **`ds_table`** for [cleaning](../reference/glossary.md#cleaning). |
| `<sample>_spatialTable.csv` | Per-barcode spatial counts. |
| `<sample>_bcSpatial*.png` | Barcode-density spatial heatmaps (raw, 2× mean, 95th percentile). |
| `<sample>_hiLoWarn.csv` / `.png` | Flagged high / low outlier rows and columns. |
| `clean_v1_outputs/`, `clean_v2_*_outputs/` | Per-variant detection / cleaning intermediates. |

## CLI

The same barcode QC can be run locally via the
[atlasxomics/barcodeqc](https://github.com/atlasxomics/barcodeqc) CLI — see the
[DIY / Local Processing](diy.md) page.

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
