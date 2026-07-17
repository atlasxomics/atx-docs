# ATX impute

!!! info "At a glance"
    **Repository:** [atlasxomics/impute](https://github.com/atlasxomics/impute) ·
    **Display name:** ATX impute ·
    **Modality:** Epigenomics · **Stage:** Helper Workflow

## Overview

A single-step Workflow for **filling in missing lanes** (rows or columns of
tixels) in a spatial epigenomic experiment — for example when a microfluidic
channel failed. Missing tixels are imputed from surrounding tixels, informed by
a cluster specification, so the recovered grid can be carried into downstream
analysis.

## Steps

1. **`impute_task`** — Imputes the specified missing rows/columns in the
   fragments file using the tissue positions and cluster assignments, and writes
   the recovered fragments to the output directory.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `run_id` | str | ATX run ID (optional prefix). |
| `missing_rows` | List[int] | Rows to impute (`1–50` or `1–96`). |
| `missing_columns` | List[int] | Columns to impute (`1–50` or `1–96`). |
| `fragments_file` | LatchFile | `fragments.tsv.gz` from epigenomic preprocessing. |
| `positions_file` | LatchFile | `tissue_positions_list.csv` from the [Spatial folder](../../reference/glossary.md#spatial-folder). |
| `cluster_specification` | LatchDir \| LatchFile | ArchRProject **or** a CSV specifying each tixel's cluster. |
| `output_directory` | str | Output subdirectory name. |

## Outputs

A `LatchDir` under `latch:///impute/<output_directory>/`.

```text
impute/<output_directory>/
├── imputed_<fragments>.tsv.gz
├── tissue_positions_list_clusters.csv
└── <run_id>_cleaning_metrics.csv
```

| File | Description |
|---|---|
| `imputed_<fragments>.tsv.gz` | The imputed, re-sorted, `bgzip`-compressed fragments file — the missing lanes filled in. |
| `tissue_positions_list_clusters.csv` | Tissue positions annotated with the per-tixel cluster assignments used to guide imputation. |
| `<run_id>_cleaning_metrics.csv` | Summary metrics for the imputation. |

## Example run

```python
LaunchPlan(
    impute_workflow,
    "default",
    {
        "run_id": "default",
        "missing_rows": [11],
        "missing_columns": [24],
        "fragments_file": LatchFile("latch:///chromap_outputs/demo/chromap_output/fragments.tsv.gz"),
        "positions_file": LatchFile("latch:///spatials/demo/spatial/tissue_positions_list.csv"),
        "cluster_specification": LatchDir("latch:///ArchRProjects/demo/demo_ArchRProject"),
        "output_directory": "demo",
    },
)
```
