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
| `groupings` | Manual \| Barcodes \| File | How to define `GroupA` / `GroupB` (see below). |
| `use_max_possible_cells` | bool | Use the largest possible number of cells per group (ignores `max_cells`). |
| `max_cells` | int | Upper bound on cells per comparison group (default `500`). |
| `closest` | bool | Make pairwise results reciprocal (default `True`). |

The **`groupings`** parameter is a union — pick one of three ways to define the
two groups:

| Mode | Fields | Use when |
|---|---|---|
| **Manual** (`Groupings`) | `clusterA` / `conditionA` / `sampleA` (+ `multipleA`) and the matching `…B` fields | You want to select each group by cluster, condition, and/or sample name. `multipleA/B` allow multiple values; cluster ranges like `C5-C7` are expanded. |
| **Barcodes** (`Barcodes`) | `groupA`, `groupB` | You have explicit barcode lists for each group. |
| **File** (`LatchFile`) | an uploaded file | The group assignments are specified in a file. |

## Outputs

Written to `latch:///compare_outs/<project_name>/`.

```text
compare_outs/<project_name>/
├── UpdateClustName_by_barcode.csv
├── all_genes.csv, marker_genes.csv, volcano_gene.pdf        # genes
├── all_peaks.csv, MA_peaks.pdf                              # peaks
└── all_motifs.csv, marker_motifs.csv,                       # motifs
    up/downRegulated_motifs.csv, up/downRegulated_motif_enrichment.pdf,
    volcano_motif.pdf
```

| File | Description |
|---|---|
| `UpdateClustName_by_barcode.csv` | The selected cell barcodes and their assigned group (`GroupA` / `GroupB`). |

**Genes**

| File | Description |
|---|---|
| `all_genes.csv` | Full `getMarkerFeatures` differential-test results for every gene. |
| `marker_genes.csv` | Filtered / significance-scored markers (the volcano-plot source). |
| `volcano_gene.pdf` | Volcano plot of differential gene accessibility. |

**[Peaks](https://www.archrproject.com/bookdown/pairwise-testing-between-groups.html)**

| File | Description |
|---|---|
| `all_peaks.csv` | Full differential-test results for every peak. |
| `MA_peaks.pdf` | MA plot of differential peaks. |

**[Motifs](https://www.archrproject.com/bookdown/motif-enrichment-in-differential-peaks.html)**

| File | Description |
|---|---|
| `all_motifs.csv` | Full differential-test results for every motif. |
| `marker_motifs.csv` | Filtered / significance-scored motif markers (volcano source). |
| `upRegulated_motifs.csv` / `downRegulated_motifs.csv` | Up- and down-regulated motifs ranked by significance. |
| `upRegulated_motif_enrichment.pdf` / `downRegulated_motif_enrichment.pdf` | Enrichment plots of motifs ranked by −log10(FDR). |
| `volcano_motif.pdf` | Volcano plot of differential motif enrichment. |

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
