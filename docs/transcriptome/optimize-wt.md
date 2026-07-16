# optimize_wt

!!! info "At a glance"
    **Repository:** [atlasxomics/optimize_wt](https://github.com/atlasxomics/optimize_wt) ·
    **Display name:** optimize_wt ·
    **Modality:** Whole Transcriptome · **Stage:** Secondary Analysis

## Overview

**optimize_wt** is the whole-transcriptome secondary analysis Workflow. It preprocesses spatial RNA-seq data and performs clustering via [Scanpy](https://scanpy.readthedocs.io/) or [STAGATE](https://github.com/zhanglabtools/STAGATE), with optional [Harmony](https://github.com/immunogenomics/harmony) integration and marker-gene computation.

## Steps

1. **`preprocess_wt_task`** — Filter, normalize, and select highly variable genes.
2. **`train_stagate_task`** — Train the STAGATE spatial model (when STAGATE backend selected).
3. **`build_wt_opt_jobs_task`** — Enumerate parameter-sweep jobs.
4. **`mapper_opt_set_task_0`** — Evaluate one parameter set (parallel).
5. **`wtOpt_task`** — Aggregate optimization results.

## Inputs

*(To be documented from the Workflow parameters.)*

## Outputs

*(To be documented.)*

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
