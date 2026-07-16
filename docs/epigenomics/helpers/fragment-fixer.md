# fragment fixer

!!! info "At a glance"
    **Repository:** [atlasxomics/fragment_fixer](https://github.com/atlasxomics/fragment_fixer) ·
    **Display name:** fragment fixer ·
    **Modality:** Epigenomics · **Stage:** Helper Workflow

## Overview

A single-step Workflow that **screens alignment / fragment files** for lines
that fall outside the chromosome coordinates of a reference genome (out-of-bounds
fragments that can break downstream tools) and emits a corrected file. Useful for
salvaging Chromap output produced against a mismatched or older genome build.

## Steps

1. **`ff_task`** — Screens the input BED / fragment file against the reference
   genome's chromosome sizes, removes out-of-bounds lines, and writes the
   corrected file (as `fragments.tsv.gz` or `aln.bed`) under
   `latch:///ff_outs/<output_dir>/`.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `input_file` | LatchFile | BED / BED-like file from Chromap or a similar aligner. |
| `run_id` | str | Text prepended to the output file name. |
| `genome` | enum | Reference genome: `mm39`, `mm10`, `hg38`, `rnor6`. |
| `output_type` | enum | Output format: `fragments.tsv.gz` or `aln.bed`. |
| `output_dir` | str | Output subdirectory under `ff_outs/`. |

## Outputs

The corrected file (`fragments.tsv.gz` or `aln.bed`, per `output_type`) written
under `latch:///ff_outs/<output_dir>/`.

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
