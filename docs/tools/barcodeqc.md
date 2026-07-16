# BarcodeQC

**BarcodeQC** assesses barcode quality for a sequencing run — useful as an early
check before committing to a full preprocessing run. It is available both as a
Latch Workflow and as a standalone CLI.

## Latch Workflow

- **Repository:** [atlasxomics/barcodeqc_wf](https://github.com/atlasxomics/barcodeqc_wf)
- **Display name:** Barcode QC

Takes a read 2 FASTQ, a barcode set (`bc220` | `fg96` | `bc96` | `bc50`), an
optional downsample read count, and a tissue positions file, and reports barcode
match statistics.

## CLI

- **Repository:** [atlasxomics/barcodeqc](https://github.com/atlasxomics/barcodeqc)

The CLI runs the same barcode QC locally; see the [DIY / Local
Processing](diy.md) page.

*(Document inputs, outputs, and example invocation here.)*
