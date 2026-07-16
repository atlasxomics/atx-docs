# ftp downloader

!!! info "At a glance"
    **Repository:** [atlasxomics/ftp_downloader](https://github.com/atlasxomics/ftp_downloader) ·
    **Display name:** ftp downloader ·
    **Modality:** Platform · **Stage:** Utility

## Overview

A platform-agnostic Workflow that downloads files directly into Latch Data,
accepting either structured **FTP parameters** or a single **download URL**. It
is commonly used to pull raw sequencing data from providers (e.g. Novogene) into
a workspace. Tested with FTP and HTTPS sources.

## Steps

1. **`download_task`** — Resolves the source and downloads into
   `latch:///downloads/<out_dir>/`:
    - **SFTP command** (`lftp -c …`) — parses the SFTP URL and runs the parallel
      `parallel_sftp.sh` helper (8 jobs) for fast recursive transfer.
    - **FTP parameters / URL** — runs `wget -c -r` (resumable, recursive) against
      `ftp://user:password@host:port/`.

    The execution is renamed to `out_dir` for clarity in the Latch UI.

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `out_dir` | str | Subdirectory under `downloads/`. Cannot start with `/`. |
| `source_url` | `Ftp_url` \| str | FTP parameters (user / password / host / port) **or** a single download URL / `lftp` command. |

## Outputs

A `LatchDir` containing the downloaded files, written to
`latch:///downloads/<out_dir>/`. FTP sources download recursively.

## Example run

*(Representative LaunchPlan / batch-table example to be added.)*
