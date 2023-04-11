---
sidebar_position: 2
title: "Concepts"
---

# Concepts

## Filters

### What are Filters?

Filters are simply functions that return true or false, very similarly to the filters in [Sleitnick's TableUtil](https://sleitnick.github.io/RbxUtil/api/TableUtil) for example.

:::info
TableUtil works great in conjunction with Baseline. They both use the same syntax for filters, which makes filters written for both cross compatible.
:::

```lua
local function IsOverFive(x: number)
    return x > 5
end

local filteredNumbers = Baseline.Filter({3, 5, 6, 7, 8}, IsOverFive)
-- { 6, 7, 8 }
print(filteredNumbers)
```

### Making more reusable filters

Here's where the decorator pattern comes in to play. Say we want to take the above `IsOverFive` filter, and make it work with a broader range of numbers. We can achieve this using a decorator:

```lua
local function IsOverFilterDecorator(min: number)
    return function(x: number)
        return x > min
    end
end

local isOverFive = IsOverFilterDecorator(5)
local isOverTwenty = IsOverFilterDecorator(20)

-- { 6, 7 }
print(Baseline.Filter({3, 4, 5, 6, 7}, isOverFive))

-- { 21, 22, 23 }
print(Baseline.Filter({19, 20, 21, 22, 23}, isOverTwenty))
```

### Roblox Instance Filters

Baseline comes with a bunch of useful decorators that create filters for Roblox Instances by default. Check the API docs if you're interested in learning about all of those.

```lua
local ZombiesContainer = ServerStorage.Zombies:GetChildren()
local zombieFilter = Baseline.CombineFilters(
    Baseline.Filters.HasTag("Zombie"),
    Baseline.Filters.IsA("Model")
)

-- { FastZombie, ZombifiedCitizen, FireZombie, Zombie }
print(Baseline.Filter(zombies, zombieFilter))
```