# compare clusters

!!! info "At a glance"
    **Repository:** [atlasxomics/combined_cluster_wf](https://github.com/atlasxomics/combined_cluster_wf) ·
    **Display name:** compare clusters ·
    **Modality:** Epigenomics · **Stage:** Advanced Analysis

## Overview

**compare clusters** explores differences in **genes, peaks, and motifs** between
two user-defined cluster / condition groupings (`GroupA` vs `GroupB`) within an
[ArchRProject](create-archrproject.md). It runs differential testing with
`ArchR::getMarkerFeatures` and returns ranked tables and plots for each feature
type.

## Steps

1. **`compare_task`** — Assigns cells to `GroupA` / `GroupB` per the grouping
   specification, then runs pairwise differential testing across genes, peaks,
   and motifs and generates the plots and tables below. The `closest` option
   makes comparisons reciprocal (each group matched to its closest counterpart);
   `use_max_possible_cells` / `max_cells` bound the cells per group.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `project_name` | str | Name / identifier for the comparison; used in output paths. |
| `archrproject` | LatchDir | ArchRProject folder to analyze. |
| `groupings` | Manual \| Barcodes \| File | How to define `GroupA` / `GroupB` — manual cluster/condition/sample selection, a barcode list, or an uploaded file. |
| `use_max_possible_cells` | bool | Use the largest possible number of cells per group (ignores `max_cells`). |
| `max_cells` | int | Upper bound on cells per comparison group (default `500`). |
| `closest` | bool | Make pairwise results reciprocal (default `True`). |

## Outputs

A `LatchDir` containing:

- **`UpdateClustName_by_barcode.csv`** — selected barcodes and their assigned
  group (`GroupA` / `GroupB`).
- **Genes** — volcano plot, `all_genes.csv` (full `getMarkerFeatures` results),
  `marker_genes.csv` (filtered / scored).
- **[Peaks](https://www.archrproject.com/bookdown/pairwise-testing-between-groups.html)**
  — MA plot, `all_peaks.csv`, `marker_peaks.csv`.
- **[Motifs](https://www.archrproject.com/bookdown/motif-enrichment-in-differential-peaks.html)**
  — `up/downRegulated_motifs.csv`, up/down enrichment plots, `all_motifs.csv`,
  `marker_motifs.csv`, and a volcano plot.

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
