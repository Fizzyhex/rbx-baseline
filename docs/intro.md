---
sidebar_position: 1
---

# Introduction

:::caution Under Construction
This documentation is up-to-date, but still a work in progress.
:::

Baseline is a functional library for Roblox that contains a utilities for creating cleaner initalization scripts. It's a great tool for client/server scripts for experiences using SSA (single-script architecture), but it's very general purpose and may be appropriate for other applications.

If you're interested, feel free to take a look at the API docs and concepts page for more info!

```lua title="ExampleInit.server.lua"
local Baseline = require(somewhere.Packages.Baseline)
local ControllersFolder = somewhere.Controllers

local moduleScriptFilter = Baseline.Filters.IsA("ModuleScript")

-- Let's require any descendants that are a ModuleScript
local controllers = Baseline.CallFor(
    Baseline.Filter(ControllersFolder:GetDescendants(), moduleScriptFilter),
    require
)

-- Do controller:OnInit() for any controller that has an 'OnInit' method
Baseline.CallMethods(controllers, "OnInit")
-- Do task.spawn(controller:OnStart()) for any controller that has an 'OnStart' method
Baseline.SpawnMethods(controllers, "OnStart")
-- Print the table of all our loaded controllers
print("Loaded all controllers!", controllers)
```