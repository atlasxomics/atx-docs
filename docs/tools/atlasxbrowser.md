# AtlasXBrowser

**AtlasXBrowser** is the ATX application for processing spatial **image** data —
mapping tissue images to the spatial barcode grid and producing the
[Spatial folder](../reference/glossary.md#spatial-folder) consumed by downstream
Workflows. It can run on a Latch [Pod](https://wiki.latch.bio/wiki/pods/overview)
or locally.

It sits alongside sequencing in the data flow: FASTQ goes through
[preprocessing](../epigenomics/preprocessing.md) while the tissue **images** go
through AtlasXBrowser, and the two meet at the
[optimization](../epigenomics/index.md#how-the-workflows-fit-together) stage —
which needs the Spatial folder to place cells on the tissue.

## Documentation

AtlasXBrowser has its own dedicated documentation site; this page links out to it
rather than duplicating content.

- **Docs:** <https://atlasxbrowser-docs.readthedocs.io/en/latest/>
- **Releases:** <https://github.com/atlasxomics/AtlasXbrowser/releases>
- **Tutorial:** [Running AtlasXBrowser](https://scribehow.com/o/01jzlMHMRV-kYMeF_qMI2Q/viewer/Running_AtlasXBrowser__8Wp0TTJ7SRW85_-vbGe5SA?referrer=knowledge-page)
