# atx_convert

!!! info "At a glance"
    **Repository:** [atlasxomics/atx_convert](https://github.com/atlasxomics/atx_convert) ·
    **Display name:** atx_convert ·
    **Modality:** Epigenomics · **Stage:** Helper Workflow

## Overview

A single-step Workflow for converting ATX epigenomics objects between formats —
**AnnData** (`.h5ad`), **Seurat** (`.rds`), and **BPCells** directories. It
lets analysts move data between the Python (Scanpy/SnapATAC2) and R
(Seurat/ArchR) ecosystems, optionally carrying spatial coordinates across.

Provide **one** source (`anndata_file`, `seurat_file`, or `bpcells_dir`); the
Workflow converts it to the complementary format.

## Steps

1. **`convert_task`** — Detects the supplied source and runs the matching
   converter (`to_seurat.R`, `from_seurat.R`, `from_bpcells.R`, …), optionally
   copying spatial coordinates and/or emitting a `converted_sm.h5ad`. Outputs
   are written under `latch:///converted/<output_directory>/`.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `output_directory` | str | Output subdirectory under `converted/`. |
| `anndata_file` | LatchFile | `.h5ad` AnnData object from an ATX experiment. |
| `seurat_file` | LatchFile | `.rds` Seurat object from an ATX experiment. |
| `seurat_spatial` | bool | Copy spatial coordinates to the new object (default `True`). |
| `seurat_clean` | bool | Also emit `converted_sm.h5ad` (a smaller / cleaned object). |
| `bpcells_dir` | LatchDir | Directory containing a Seurat object backed by BPCells. |
| `bpcells_spatial` | bool | Copy spatial coordinates (BPCells source). |
| `bpcells_clean` | bool | Emit `converted_sm.h5ad` (BPCells source). |

## Outputs

A `LatchDir` under `latch:///converted/<output_directory>/`. Which files appear
depends on the conversion direction:

```text
converted/<output_directory>/
├── converted.h5ad  or  converted.rds        # per conversion direction
├── converted_sm.h5ad                        # when "Convert to _sm"
├── converted_bp.h5ad, converted_bp_sm.h5ad  # BPCells source
├── obs.csv
├── metadata.csv
└── reductions.txt
```

| File | Description |
|---|---|
| `converted.h5ad` | AnnData produced from a Seurat or BPCells source. |
| `converted.rds` | Seurat object produced from an AnnData source. |
| `converted_sm.h5ad` | Reduced "`_sm`" AnnData — only when **Convert to `_sm`** is enabled. |
| `converted_bp.h5ad` / `converted_bp_sm.h5ad` | AnnData (and reduced variant) produced from a BPCells directory. |
| `obs.csv`, `metadata.csv`, `reductions.txt` | Cell metadata, object metadata, and the dimensionality-reduction names carried across. |

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
