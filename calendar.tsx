"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, type DayPickerProps } from "react-day-picker"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export type CalendarProps = DayPickerProps

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
        ),
        button_next: cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "inline-flex items-center justify-center rounded-md font-normal"
        ),
        day_button: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          "hover:bg-accent hover:text-accent-foreground"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" />
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }