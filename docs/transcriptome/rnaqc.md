# RNAQC

!!! info "At a glance"
    **Repository:** [atlasxomics/rnaqc_wf](https://github.com/atlasxomics/rnaqc_wf) ·
    **Display name:** RNAQC ·
    **Modality:** Whole Transcriptome · **Stage:** QC

## Overview

**RNAQC** performs quality control for spatial transcriptome data, including per-cell duplication recovery. The headline Workflow is **RNAQC Per-cell Duplication Recovery**.

## Steps

1. **`qc_task`** — Core read/alignment QC.
2. **`fastq_screen_task`** — Screen reads against reference genomes for contamination.
3. **`opt_task`** — Optimization step.
4. **`dup_recovery_task`** — Per-cell duplication recovery from STAR outputs.

## Inputs

*(To be documented from the Workflow parameters.)*

## Outputs

*(To be documented.)*

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
