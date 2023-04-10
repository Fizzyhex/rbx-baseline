export type Filter = (value: any, key: any?) -> (boolean)

local CollectionService = game:GetService("CollectionService")

--[=[
	@class Baseline

	The best friend of your initializer scripts.

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
]=]
local Baseline = {}

Baseline.Filters = {
	--[=[
		@param className string
		@return bool
	]=]
	IsA = function(className: string)
		return function(instance: Instance)
			return instance:IsA(className)
		end :: Filter
	end,

	--[=[
		@param className string
		@return bool
	]=]
	ClassName = function(className: string)
		return function(instance: Instance, ...)
			return instance.ClassName == className
		end
	end,

	--[=[
		@param tag string
		@return bool
	]=]
	HasTag = function(tag: string)
		return function(instance: Instance)
			return CollectionService:HasTag(instance, tag)
		end
	end,

	--[=[
		@param attribute string -- Name of the attribute
		@param value any -- Attribute value to match
		@return bool
	]=]
	CheckAttribute = function(attribute: string, value: any)
		return function(instance: Instance)
			return instance:GetAttribute(attribute) == value
		end
	end,

	--[=[
		@param stringPattern string
		@return bool
	]=]
	MatchesName = function(stringPattern: string)
		return function(instance: Instance)
			return string.match(stringPattern, instance.Name) ~= nil
		end
	end,
}

--[=[
	Combines multiple filters together to create one.

	@param ... ...Filter -- Filters to combine
	@return Filter
]=]
function Baseline.CombineFilters(...)
	local filters = {...}

	return function(x)
		for _, filter in filters do
			if not filter(x) then
				return false
			end
		end

		return true
	end
end

--[=[
	Wraps a filter and makes it return the opposite of what it would before.

	@param filter Filter -- Filter to invert
	@return Filter
]=]
function Baseline.InvertFilter(filter: Filter)
	return function(...)
		return not filter(...)
	end
end

--[=[
	Iterates over a table and returns a table of content only accepted by the filter(s).

	@param tabl {} -- Table to filter
	@param filter Filter -- Filter to run
	@param ... ...Filter -- Additional filters to run
	@return {}
]=]
function Baseline.Filter(tabl: {}, filter: Filter, ...)
	local filters = {...}
	table.insert(filters, filter)

	local function CompositeFilter(x)
		for _, currentFilter in filters do
			if not currentFilter(x) then
				return false
			end
		end

		return true
	end

	local filtered = {}

	for key, value in tabl do
		if not CompositeFilter(value, key) then
			continue
		end

		if typeof(key) == "number" then
			table.insert(filtered, value)
		else
			filtered[key] = value
		end
	end

	return filtered
end

--[=[
	Runs a function for every key in a table.

	@param tabl {} -- Table to iterate over
	@param func function
	@param ... ...any -- Additional arguments to insert after key in the function call
	@return results {} -- A table containing anything returned by your function
]=]
function Baseline.CallForKeys(tabl, func, ...)
	local results = {}

	for key in tabl do
		local result = func(key, ...)
		table.insert(results, result)
	end

	return results
end

--[=[
	Runs a function for every value in a table.

	@param tabl {} -- Table to iterate over
	@param func function
	@param ... ...any -- Additional arguments to insert after value in the function call
	@return results {} -- A table containing anything returned by your function
]=]
function Baseline.CallForValues(tabl, func, ...)
	local results = {}

	for _, value in tabl do
		local result = func(value, ...)
		table.insert(results, result)
	end

	return results
end

--[=[
	Alias for CallForValues.

	@param tabl {} -- Table to iterate over
	@param func function
	@param ... ...any -- Additional arguments to insert after value in the function call
	@return results {} -- A table containing anything returned by your function
]=]
function Baseline.CallFor(tabl, func, ...)
	return Baseline.CallForValues(tabl, func, ...)
end

--[=[
	Runs a function for every value in a table.

	@param tabl {} -- Table to iterate over
	@param func function
	@param ... ...any -- Additional arguments to insert after value & key in the function call
	@return results {} -- A table containing anything returned by your function
]=]
function Baseline.CallForItems(tabl, func, ...)
	local results = {}

	for key, value in tabl do
		local outputValue, outputKey = func(value, key, ...)

		if outputKey then
			results[outputKey] = outputValue
		else
			table.insert(results, outputValue)
		end
	end
end

--[=[
	Calls a method on all items in a table, only if the method is present.

	@param tabl {} -- Table to iterate over
	@param methodName string -- Name of the method to call
	@param ... ...any -- Additional arguments to insert after value & key in the function call
	@return results {} -- A table containing anything returned by the method calls
]=]
function Baseline.CallMethods(tabl, methodName, ...)
	local results = {}

	for _, value in tabl do
		local method = value[methodName]

		if not method then
			continue
		end

		local result = method(value, ...)
		table.insert(results, result)
	end

	return results
end

--[=[
	Similar to `CallMethods` but method calls willbe wrapped in `task.spawn` too.

	@param tabl {} -- Table to iterate over
	@param methodName string -- Name of the method to call
	@param ... ...any -- Additional arguments to insert after value & key in the function call
]=]
function Baseline.SpawnMethods(tabl, methodName, ...)
	for _, value in tabl do
		local method = value[methodName]

		if not method then
			continue
		end

		task.spawn(method, value, ...)
	end
end

--[=[
	Combines multiple arrays.

	:::info
	This function does not mutate your tables, and instead returns a new table with your arrays combined.
	:::

	@param ... ...{[any]: any}
	@return results {}
]=]
function Baseline.Extend(...)
	local composite = {}

	for _, tabl in {...} do
		for _, key in tabl do
			table.insert(composite, key)
		end
	end

	return composite
end

return Baseline