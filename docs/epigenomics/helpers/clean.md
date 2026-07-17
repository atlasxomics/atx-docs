# clean

!!! info "At a glance"
    **Repository:** [atlasxomics/clean](https://github.com/atlasxomics/clean) ·
    **Display name:** clean ·
    **Modality:** Epigenomics · **Stage:** Helper Workflow

## Overview

A Workflow for **remediating microfluidic artifacts** in spatial epigenomic data
generated via [DBiT-seq](https://www.nature.com/articles/s41586-022-05094-1).
Given the fragments and a [Spatial folder](../../reference/glossary.md#spatial-folder),
**clean** returns an artifact-free `fragments.tsv.gz` plus summary statistics.

It identifies outlier rows and columns whose fragment counts exceed a
user-defined number of standard deviations above the mean row/column fragment
count. Fragments in those outlier rows/columns are randomly downsampled to the
average count, and the cleaned table is sorted into continuous chromosome blocks
and `bgzip`-compressed. The result works directly with ArchR, Seurat, and other
scATAC-seq packages.

## Steps

1. **`cleaning_task`** — Detect outlier rows/columns (> `deviations` SD above the
   mean), downsample their tixels to the average fragment count, then sort and
   `bgzip` the cleaned fragments. Outputs are written under
   `latch:///cleaned/<output_dir>/`.

!!! note "Internal step"
    An `upload_registry_task` writes the cleaned outputs to the Latch Registry
    (see [Internal Tasks](../../getting-started/platform-overview.md#internal-atx-only-tasks)).

## Inputs

**Per Sample** (`samples: List[Sample]`):

| Field | Type | Description |
|---|---|---|
| `run_id` | str | Run identifier (ATX default `Dxxxxx_NGxxxxx`). |
| `singlecell_file` | LatchFile | `singlecell.csv` from preprocessing. |
| `positions_file` | LatchFile | `tissue_positions_list.csv` from the Spatial folder. |
| `fragments_file` | LatchFile | `fragments.tsv.gz` to clean. |
| `output_dir` | str | Output subdirectory under `cleaned/`. |
| `deviations` | int | Standard-deviation threshold for flagging outlier rows/columns. |

**Global:** `table_id` — Registry table ID *(internal upload; see note above)*.

## Outputs

A `CleaningOutput` per sample — the `run_id` and a `LatchDir` under
`latch:///cleaned/<output_dir>/` containing:

```text
cleaned/<output_dir>/
├── <fragments>.tsv.gz
├── <run_id>_cleaning_metrics.csv
└── singlecell.csv
```

| File | Description |
|---|---|
| `<fragments>.tsv.gz` | The cleaned, sorted, `bgzip`-compressed fragments file (outlier tixels downsampled). |
| `<run_id>_cleaning_metrics.csv` | Cleaning summary — which rows/columns were flagged as outliers and the downsampling applied. |
| `singlecell.csv` | Per-barcode single-cell summary after cleaning. |

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
