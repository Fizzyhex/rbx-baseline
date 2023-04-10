:::caution Under Construction
This documentation is up-to-date, but still a work in progress.
:::

# Introduction

Baseline is a functional library for Roblox that contains a few utilities for creating cleaner initalization scripts. It's a great tool for building client/server scripts for experiences using SSA (single-script architecture), but it's very general purpose and may be appropriate for other applications.

## Installation

The latest version of this package is available on [Wally](https://wally.run/package/fizzyhex/baseline), a package manager built for Roblox. To use Baseline, you need to run `wally init` on your project directory and then add it to your project as a dependancy. Here's what your `wally.toml` file could look like:

```toml title="wally.toml"
[package]
name = "your_name/your_project"
version = "0.1.0"
registry = "https://github.com/UpliftGames/wally-index"
realm = "shared"

[dependencies]
Baseline = "fizzyhex/Baseline@x.3.x" # This version number isn't valid! Go copy the latest version from Wally.
```