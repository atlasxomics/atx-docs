# merge fastq

!!! info "At a glance"
    **Repository:** [atlasxomics/merge_fastq](https://github.com/atlasxomics/merge_fastq) ·
    **Display name:** merge fastq ·
    **Modality:** Platform · **Stage:** Utility

## Overview

A platform-agnostic Workflow for **merging multiple FASTQ files** — for example
the same library sequenced across several lanes or from multiple providers — into
a single file per read.

!!! warning "Input order matters"
    The order of input files **must match** between read 1 and read 2. If read 1
    is `['novogene_R1.fastq', 'basespace_R1.fastq']`, then read 2 must be
    `['novogene_R2.fastq', 'basespace_R2.fastq']`. Run the Workflow once per read.

## Steps

1. **`merge_task`** — Validates that all inputs share a consistent read ID and
   extension (`test_reads` / `test_extensions`), then concatenates them with
   `cat` into `<run_id>_merged_R<read>.<ext>` and uploads to
   `latch:///merged/<output_dir>/`.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `run_id` | str | ATX run ID; used as the merged-file prefix. |
| `input_files` | List[LatchFile] | FASTQ files to merge, in a consistent order across reads. |
| `output_dir` | str | Subdirectory name under `merged/`. |

## Outputs

A single merged `LatchFile` (`<run_id>_merged_R<read>.<ext>`) written to
`latch:///merged/<output_dir>/`.

```text
merged/<output_dir>/
└── <run_id>_merged_R<read>.<ext>
```

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
