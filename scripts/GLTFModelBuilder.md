# Model Builder

This document describes how to use the model builder command in the cache reader tool to export GLTF models from OSRS cache data.

## Prerequisites

-   Run the project from the [osrscachereader](.) workspace.
-   Ensure the cache files are available in the project cache directory.
-   Install dependencies with:

```bash
npm install
```

## Basic usage

The general command shape is:

```bash
npm run cmd modelBuilder <type> <ids> <model-type> anim <animation-ids> name <output-name> [split]
```

### Example: single item

```bash
npm run cmd modelBuilder item 29796 maleModel0 anim 808 name model
```

This exports a single merged GLTF file to:

```text
out/model.gltf
```

### Example: multiple items with split output

```bash
npm run cmd modelBuilder item 26684,27235,27238,27241,26235,28902,13237,22249,12926,20997,11959,25865,23975,23979,23971,7462,22109,21021,21024 maleModel0,maleModel1 anim 808,819,824,820,822,821,426,5061,7618 name player split
```

This exports one file per model group, using the item name as part of the filename.

## Command parts

-   `item` / `npc` / `spotanim`: the entity type to load from the cache.
-   `<ids>`: one or more item, NPC, or spotanim IDs separated by commas.
-   `<model-type>`: the model field to read, such as `maleModel0`, `maleModel1`, `models`, or `modelId`.
-   `anim <animation-ids>`: one or more animation IDs to include.
-   `name <output-name>`: the base name for the exported file(s).
-   `split`: optional flag that writes each model group as a separate GLTF file instead of one merged model.

## Full command breakdown

The following command:

```bash
npm run cmd modelBuilder item 26684,27235,27238,27241,26235,28902,13237,22249,12926,20997,11959,25865,23975,23979,23971,7462,22109,21021,21024 maleModel0,maleModel1 anim 808,819,824,820,822,821,426,5061,7618,8057,8056,390 name player split
```

where:

    item
        - 26684 # tzkal slayer helmet
        - 27235 # masori mask (f)
        - 27238 # masori body (f)
        - 27241 # masori legs (f)
        - 26235 # zaryte vambracess
        - 28902 # dizana's max cape (l)
        - 13237 # pegasian boots
        - 22249 # anguish (or)
        - 20997 # twisted bow
        - 12926 # toxic blowpipe
        - 11959 # black chinchompa
        - 25865 # bow of faerdhinen
        - 23975 # crystal body
        - 23979 # crystal legs
        - 23971 # crystal helm
        - 7462 # barrows gloves
        - 22109 # ava's assembler
        - 21021 # ancestral top (buggy)
        - 21024 # ancestral bottom (buggy)
    anim
      - 808 # idle
      - 819 # walk
      - 824 # run
      - 820 # rotate 180
      - 822 # strafe left
      - 821 # strafe right
      - 426 # fire bow
      - 5061 # fire blowpipe
      - 7618 # throw chinchompa
      - 8057 # scythe idle
      - 8056 # scythe swing
      - 390  # sword slash

can be read as:

-   `npm run cmd` runs the command wrapper defined in the project.
-   `modelBuilder` tells the tool to export a GLTF model.
-   `item` means the input objects are item definitions from the cache.
-   `26684,27235,27238,27241,26235,28902,13237,22249,12926,20997,11959,25865,23975,23979,23971,7462,22109,21021,21024` is the list of item IDs to load.
-   `maleModel0,maleModel1` tells the builder to read the male model fields for each item.
-   `anim` switches the builder into animation mode for the following IDs.
-   `808,819,824,820,822,821,426,5061,7618,8057,8056,390` are the animation IDs to include in the export.
    -   **_IMPORTANT:_** Always use these these animation ids in this order since that's what `osrs-sdk` is expecting.
        -   Exception Example: Abyssal Tentacle was generated using the abyssal whip attack animation (1658) instead of sword slash (390).
-   `name player` sets the output base name to `player`.
-   `split` tells the builder to write one file per model group rather than one merged file.

## What this command is doing

This command loads a collection of equipment or wearable item definitions from the OSRS cache, reads their male model data, applies the listed animations, and exports them as GLTF files named using the `player` prefix.

Because `split` is present, the output is not a single merged file. Instead, each model group gets its own file, with names based on the model/group name.

## Output files

-   Without `split`, the output is written as:

```text
out/<name>.gltf
```

-   With `split`, the output is written as:

```text
out/<name>_<sanitized-model-name>.gltf
```

## Notes

-   The `split` flag is useful when you want one file per model component rather than one merged result.
-   Model names are sanitized into a filename-safe form by replacing non-alphanumeric characters with underscores and lowercasing them.
-   The tool uses the OSRS cache data and can export animations along with the model geometry.

### Practically speaking, your command should always look like this:

    npm run cmd modelBuilder item <ITEM_IDS> maleModel0,maleModel1 anim 808,819,824,820,822,821,426,5061,7618,8057,8056,390 name player split
