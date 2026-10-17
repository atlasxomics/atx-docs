# Glossary

Terms that are obscure or specific to AtlasXomics.

**`run_id`**
: A run identifier of the form `Dxxxxx_NGxxxxx` (e.g. `D00000_NG00000`). The
  first value, starting with `D`, is the run ID; each run ID corresponds to a
  single **tissue slide**. The `NG` value identifies the **sequencing library**.

**Run**
: In ATX parlance, a tissue-sample analyzed via DBiT-seq. Multiple Runs can be
  merged into a single Project for analysis.

**primary analysis**
: Alignment and QC of FASTQ files, and processing of image data.

**secondary analysis**
: Post-alignment processing that moves aligned data toward more meaningful
  context — gene accessibility, peak calling, and motif deviations (epigenomic),
  clustering, cell typing, and spatial analysis.

**DBiT-seq**
: Deterministic Barcoding in Tissue for spatial omics sequencing — the assay
  underlying ATX spatial data. See the [Bibliography](bibliography.md).

<a id="tixel"></a>
**tixel**
: A "tissue pixel" — one spatial barcode location on the DBiT-seq grid.

<a id="bulk-mode"></a>
**bulk (mode)**
: A [preprocessing](../epigenomics/preprocessing.md) mode for **non-spatial
  (bulk) ATAC-seq** runs. When enabled, the spatial barcode sequences in reads
  are replaced with **random barcodes**, so the run is processed as a single
  bulk sample rather than resolved into [tixels](#tixel). Enabled via the `bulk`
  toggle; AtlasXomics preprocessing supports both `spatial` and `bulk` run types.

<a id="no-ligation-bulk-mode"></a>
**no-ligation-bulk (mode)**
: A [bulk](#bulk-mode) preprocessing mode for libraries prepared **without the
  ligation-linker step**. Before alignment, reads have the expected linker
  sequences **added** and random barcodes assigned. Enabled via the
  `noLigation_bulk` toggle.

<a id="cross-talk"></a>
**cross-talk**
: In DBiT-seq, spatial barcodes are delivered through microfluidic channels
  (one set of channels for rows, another for columns). **Cross-talk** is
  barcode bleed-through — signal leaking between adjacent channels so that
  certain rows or columns show fragment counts elevated above the local
  background, contaminating those [tixels](#tixel).

<a id="cross-talk-correction"></a>
**cross-talk correction**
: A [preprocessing](../epigenomics/preprocessing.md) step that removes cross-talk
  contamination. Affected positions are detected in
  [BarcodeQC](../tools/barcodeqc.md) — a count matrix over the spatial grid is
  smoothed (LOWESS) across rows/columns, and positions whose counts exceed the
  smoothed background by more than `fold_above_background` are flagged into an
  `xtalkTable.csv` (columns `mer`, `row`, `col`, `xtalk_mask`,
  `fold_above_background`). During preprocessing, each flagged barcode's
  fragments are then **substituted** with copies of the nearest *unaffected*
  neighbor's fragments (searched `col ± 1`, `row ± 1`, `col ± 2`, `row ± 2`, no
  diagonals, up to distance 2); positions with no clean neighbor in range are
  left untouched. Enabled via the `xtalk_correction` toggle.

<a id="cleaning"></a><a id="clean"></a>
**CLEAN** (cleaning)
: **Channel-Linked Efficiency Artifact Normalization** — the correction for
  microfluidic **intensity** artifacts, where some channels capture more
  efficiently than others and their rows/columns show abnormally high signal.
  (Distinct from the positional bleed-through handled by
  [cross-talk correction](#cross-talk-correction).)

    Affected rows and columns are flagged by comparing each one's summed counts
    to a **lowess**-smoothed trend — anything whose **normalized difference**
    `(actual − smoothed) / actual` falls outside ±0.5 is flagged. Together the
    flagged rows and columns form a **mask**; each masked
    [tixel](#tixel) gets a
    **downsampling fraction** from the average of its unaffected neighbors, and
    its reads are downsampled accordingly to produce a **CLEANed FASTQ**.
    Unaffected tixels are untouched. A **regional** variant runs the same
    detection within 1/16 sub-regions of the array, for artifacts that span only
    part of a row or column.

    In the pipeline, detection happens in [BarcodeQC](../tools/barcodeqc.md)
    (which writes `cleanTable.csv`: `mer`, `finalDownFract`) and correction in
    [preprocessing](../epigenomics/preprocessing.md) / [RNAQC](../transcriptome/rnaqc.md)
    via the `ds_table` input and `cleaning` toggle.

    **See [CLEAN](../tools/clean.md) for the full algorithm, figures, and
    worked examples.**

<a id="fragments-file"></a>
**fragments file**
: A BED-like, tab-delimited `fragments.tsv.gz` file where each row is an ATAC-seq
  fragment; the primary output of epigenomic preprocessing.

<a id="spatial-folder"></a>
**Spatial folder**
: A directory produced by [AtlasXBrowser](../tools/atlasxbrowser.md) after image
  processing, containing the tissue images and metadata that map sequencing data
  onto the tissue. Contents:

    - **`tissue_lowres_image.png`** — low-resolution cropped tissue image.
    - **`tissue_highres_image.png`** — high-resolution cropped tissue image.
    - **`metadata.json`** — ROI coordinates, pixel-thresholding parameters
      (block size, threshold), on-tissue tixel count, image height, and rotation.
    - **`tissue_positions_list.csv`** — per-tixel barcode, on/off-tissue flag
      (`1`/`0`), row/column indices, and X/Y coordinates.
    - **`tissue_positions_list_log_UMI_Genes.csv`** *(optional)* — the positions
      list with added log-transformed UMI and gene counts for visualization.

    See the [AtlasXBrowser Spatial Folder docs](https://atlasxbrowser-docs.readthedocs.io/en/latest/SpatialFolder.html).

<a id="anndata"></a>
**AnnData** (`.h5ad`)
: The Python analysis object used throughout ATX secondary analysis — a feature
  matrix `.X` with aligned annotations: `obs` (per-cell/[tixel](#tixel)),
  `var` (per-feature), `obsm` (embeddings, incl. `spatial` and `X_umap`),
  `layers` (alternate matrices), and `uns` (unstructured results). Rows are
  tixels, not cells, in spatial data. ATX Workflows collect them in an
  **`anndata/`** subfolder of the output.

    **What `.X` holds depends on the object** — this is the usual source of
    confusion, since the file name, not the format, tells you what you have:

    | Object | `.X` |
    |---|---|
    | `combined.h5ad` | Tile (bin) or peak counts — the raw accessibility matrix. |
    | `combined_ge.h5ad` | Gene-accessibility scores (a proxy for expression). |
    | `combined_motifs.h5ad` | Per-cell TF motif deviation z-scores. |
    | `<run_id>_g_converted.h5ad` / `_m_converted.h5ad` | Per-Run gene / motif objects, converted from Seurat. |

<a id="sm-object"></a>
**`_sm` object** (reduced AnnData)
: An AnnData copy built for **fast loading in [Plots](../epigenomics/plots.md)**,
  written alongside the full object (`combined_sm_ge.h5ad`,
  `combined_sm_motifs.h5ad`, `combined_sm.h5ad`). It keeps the feature matrix,
  the UMAP embedding, and spatial coordinates, and drops what plotting doesn't
  need — `.raw`, most `layers` and `varm`, the PCA / neighbor graphs, and the QC
  `obs` / `var` columns.

    **Treat `_sm` as visualization-only.** Use the full object for differential
    testing, marker detection, re-clustering, or anything else computational.
    How much precision is lost depends on the modality:

    | Workflow | `_sm` matrix |
    |---|---|
    | [ATX_snap](../epigenomics/atx-snap.md), [create ArchRProject](../epigenomics/create-archrproject.md) | `float16` — counts lose precision and are no longer exact. |
    | [atx_SpatialGlue](../coprofiling/atx-glue.md) | `float16`, densified. |
    | [optimize_wt](../transcriptome/optimize-wt.md) | `float32` and sparse, with exact raw counts retained in `layers["counts"]`; `.X` is the log1p-normalized matrix, its source recorded in `uns["plotting_x_source"]`. |

    The transcriptome `_sm` is therefore numerically exact — but still
    *incomplete*, so the rule above holds for it too.

**ArchRProject**
: The [ArchR](https://www.archrproject.com/) analysis object bundling fragments,
  QC, dimensionality reduction, and clustering for a set of Runs.

## Latch platform concepts

The AtlasXomics platform is built on top of **[LatchBio](https://latch.bio/)**, a
cloud environment for building and running bioinformatics Workflows. These are
the Latch pieces you will encounter throughout this documentation.

**[Workflow](https://wiki.latch.bio/workflows/overview)**
: A versioned, containerized pipeline made up of one or more **Tasks**. Each ATX
  Workflow corresponds to a GitHub repository under
  [atlasxomics](https://github.com/atlasxomics).

**[Task](https://wiki.latch.bio/workflows/overview)**
: A single step within a Workflow (e.g. filtering, alignment). Tasks are the
  units the Latch UI displays while a Workflow runs.

**[Latch Data](https://wiki.latch.bio/wiki/data/overview)**
: The Latch file system where inputs and outputs are stored; remote paths use
  the `latch:///` scheme.

**[Plots](https://wiki.latch.bio/plots/overview)**
: Latch's interactive visualization environment, where ATX plotting apps render
  Workflow outputs.

<a id="registry"></a>
**[Registry](https://docs.latch.bio/registry/overview.html)**
: A light sample database that is **part of Latch**, storing samples, runs, and
  metadata alongside your data.

**[Pod](https://wiki.latch.bio/wiki/pods/overview)**
: An interactive, customizable Latch cloud compute instance (similar to an EC2
  instance) preconfigured with Jupyter and RStudio, used for analysis and for
  running interactive tools such as AtlasXBrowser.

<a id="slims"></a>
**SLIMS**
: AtlasXomics' internal LIMS platform — **separate from Latch** and used for ATX
  operations only. The *"Upload to SLIMS"* toggle is ATX-internal.

## Internal (ATX-only) Tasks

Several Workflows include Tasks that are **not relevant to customers** and exist
only for AtlasXomics internal operations. You may see these in the Latch UI while
a Workflow runs, but they do not affect your outputs.

**`lims_task`**
: Pushes QC results and run metadata to [SLIMS](#slims), the ATX internal LIMS
  platform (separate from Latch).

**`upload_latch_registry`** / **`upload_registry_task`**
: Writes Workflow outputs and their locations to the [Registry](#registry) — the
  light sample database built into Latch.

These steps are typically gated behind an *"Upload to SLIMS"* or *"Registry Table
ID"* parameter and can be ignored for external/DIY use. Individual Workflow pages
therefore omit them from their **Steps** lists, and do not repeat this note.
