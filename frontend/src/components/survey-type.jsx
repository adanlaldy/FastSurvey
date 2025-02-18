"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover"

const types = [
    {
        value: "open",
        label: "Open choice",
    },
    {
        value: "unique",
        label: "Unique",
    },
    {
        value: "multiple",
        label: "Multiple",
    },
]

export function SurveyType({onChange}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const handleSelect = (currentValue) => {
        const newValue = currentValue === value ? "" : currentValue
        setValue(newValue)
        setOpen(false)
        onChange(newValue) // Appeler la fonction onChange avec la nouvelle valeur
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? types.find((type) => type.value === value)?.label
                        : "Select a type..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {types.map((type) => (
                                <CommandItem
                                    key={type.value}
                                    value={type.value}
                                    onSelect={() => handleSelect(type.value)}
                                >
                                    {type.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === type.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
