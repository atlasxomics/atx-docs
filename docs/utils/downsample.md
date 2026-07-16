# downsample reads

!!! info "At a glance"
    **Repository:** [atlasxomics/downsample](https://github.com/atlasxomics/downsample) ·
    **Display name:** downsample reads ·
    **Modality:** Platform · **Stage:** Utility

## Overview

A quick, platform-agnostic Workflow for **downsampling paired-end reads** to an
exact target read count. Useful for producing lighter test sets or normalizing
sequencing depth across samples before preprocessing. Input may be FASTA or
FASTQ.

## Steps

1. **`downsample_task`** — Runs
   [`bbmap/reformat.sh`](https://github.com/BioInfoTools/BBMap/blob/master/sh/reformat.sh)
   on the read pair with `samplereadstarget=<out_reads>`, writing downsampled
   files prefixed with `ds_`. Outputs are uploaded to
   `latch:///downsampled/<out_dir>/`.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `r1` | LatchFile | Read 1 (FASTA or FASTQ). |
| `r2` | LatchFile | Read 2 (FASTA or FASTQ). |
| `out_dir` | str | Subdirectory name under `downsampled/`. Cannot start with `/`. |
| `out_reads` | int | Exact number of output reads (or pairs) desired. |

## Outputs

A tuple of two `LatchFile`s — the downsampled `ds_<r1>` and `ds_<r2>` — written
to `latch:///downsampled/<out_dir>/`.

## Example run

```python
LaunchPlan(
    downsample,
    "Test Data",
    {
        "r1": LatchFile("latch:///.../D01033_NG01681_S3_L001_R1_001.fastq.gz"),
        "r2": LatchFile("latch:///.../D01033_NG01681_S3_L001_R2_001.fastq.gz"),
        "out_dir": "D01033_NG01681",
        "out_reads": 1000000,
    },
)
```
