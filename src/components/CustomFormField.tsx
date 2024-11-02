import PhoneInput from "react-phone-number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { E164Number } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"; // Import Popover component
import { format } from "date-fns";
import { Calendar } from "./ui/calendar"; // Import Calendar component
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import moment from "moment";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "text_area",
  PHONE_INPUT = "phone_input",
  SELECT = "select",
  CALENDAR = "calendar", // Add calendar type
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  defaultValue?: string;
  name: string;
  onChange?: (e: any) => void;
  label?: string;
  placeholder: string;
  iconSrc?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: ReactNode;
  iconAlt?: string;
  className?: string;
  renderSkeleton?: (filed: any) => ReactNode;
}

const RenderIField = ({ field, props }: { field: any; props: CustomProps }) => {
  // Manage the open state locally
  const [isOpen, setIsOpen] = useState(false);
  const { iconSrc, iconAlt, fieldType, placeholder, className, onChange } =
    props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className={cn("flex rounded-md border", className)}>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt!}
              height={24}
              width={24}
              className="mx-3 border-0"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={props.disabled}
              {...field}
              className={cn(
                "border-0 focus:ring-0 focus:outline-none",
                className
              )}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            onChange={field.onChange}
            defaultCountry="BD"
            placeholder={placeholder}
            international
            disabled={props.disabled}
            {...field}
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            className={cn("input-phone", className)}
            numberInputProps={{
              className:
                "rounded-md px-4 focus:outline-none w-1/2 bg-transparent dark:bg-transparent text-sm  text-gray-500",
            }}
          />
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            disabled={props.disabled}
            {...field}
            className={cn("border focus:ring-0 focus:outline-none", className)}
          />
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            value={field.value}
            disabled={props.disabled}
          >
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.CALENDAR:
      return (
        <FormControl>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild disabled={props.disabled}>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md border focus:ring-0 focus:outline-none",
                  className
                )}
              >
                {field.value ? (
                  format(field.value, props.dateFormat || "PPP")
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
                <CalendarIcon className="ml-2 h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-md rounded-lg">
              <Calendar
                mode="single"
                defaultMonth={
                  field?.value ? moment(field.value).toDate() : null
                }
                captionLayout="dropdown-buttons"
                selected={moment(field.value).toDate()}
                onSelect={(e) => {
                  field.onChange(e);
                  setIsOpen(false);
                }}
                disabled={(date) => {
                  // If props.disabled is true, disable all dates by returning true
                  if (props.disabled) return true;
                  // Otherwise, disable dates based on your original logic (if any)
                  return date > new Date();
                }}
                fromYear={1900}
                toYear={moment().year()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      );

    // Other cases remain unchanged
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, label, name } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <RenderIField field={field} props={props} />
          <FormMessage className="shad-error"></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
