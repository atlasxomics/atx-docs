# atx_glue

!!! info "At a glance"
    **Repository:** [atlasxomics/atx_SpatialGlue](https://github.com/atlasxomics/atx_SpatialGlue) ·
    **Display name:** atx_glue ·
    **Modality:** Co-Profiling · **Stage:** Integration

## Overview

**atx_glue** integrates epigenomic and transcriptomic modalities using [SpatialGlue](https://github.com/JinmiaoChenLab/SpatialGlue), producing joint clusters and cross-modality analyses (coverage, correlation, peak-to-gene links).

## Steps

1. **`glue_preprocess_task`** — Prepare and align the two modalities.
2. **`glue_train_task`** — Train the SpatialGlue model and derive joint clusters.
3. **`coverage_task`** — Compute per-cluster genome coverage.
4. **`corr_task`** — Compute cross-modality correlations.
5. **`peak2gene_task`** — Link peaks to genes.
6. **`finalize_task`** — Finalize and export results.

## Inputs

*(To be documented from the Workflow parameters.)*

## Outputs

*(To be documented.)*

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
