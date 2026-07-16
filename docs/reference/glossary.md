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

**tixel**
: A "tissue pixel" — one spatial barcode location on the DBiT-seq grid.

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

**cleaning**
: A [preprocessing](../epigenomics/preprocessing.md) step that remediates
  microfluidic **intensity** artifacts (as opposed to the positional bleed-
  through handled by [cross-talk correction](#cross-talk-correction)).
  Over-represented barcodes / [tixels](#tixel) are randomly downsampled toward
  the local background using a `cleanTable.csv` (columns `mer`,
  `finalDownFract` — the fraction each barcode is downsampled to), generated in
  [BarcodeQC](../tools/barcodeqc.md). Enabled via the `cleaning` toggle. The
  standalone [clean](../epigenomics/helpers/clean.md) Workflow applies a related
  row/column outlier-downsampling directly to a fragments file.

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

**ArchRProject**
: The [ArchR](https://www.archrproject.com/) analysis object bundling fragments,
  QC, dimensionality reduction, and clustering for a set of Runs.

**Registry**
: A light sample database that is **part of Latch**, storing samples, runs, and
  metadata alongside your data.

**SLIMS**
: AtlasXomics' internal LIMS platform — **separate from Latch** and used for ATX
  operations only. The *"Upload to SLIMS"* toggle is ATX-internal.

**Latch Data**
: The Latch file system where inputs and outputs are stored; remote paths use
  the `latch:///` scheme.

**Plots**
: Latch's interactive visualization environment, where ATX plotting apps render.

**Pod**
: An interactive, customizable Latch cloud compute instance (similar to an EC2
  instance) preconfigured with Jupyter and RStudio, used for analysis and for
  running interactive tools such as AtlasXBrowser.
