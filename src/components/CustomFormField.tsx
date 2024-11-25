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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { TagsInput } from "react-tag-input-component";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { Range } from "react-range"; // Import Range

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "text_area",
  PHONE_INPUT = "phone_input",
  SELECT = "select",
  CALENDAR = "calendar",
  TAGS = "tags",
  CHECKBOX = "checkbox",
  PASSWORD = "password",
  RANGE = "range", // Add range type
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
  calendarMode?: string;
  className?: string;
  type?: string;
  renderSkeleton?: (field: any) => ReactNode;
  min?: number;
  max?: number;
  step?: number;
}

const RenderIField = ({ field, props }: { field: any; props: CustomProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    iconSrc,
    iconAlt,
    fieldType,
    placeholder,
    className,
    type,
    onChange,
    min = 0,
    max = 100,
    step = 1,
  } = props;

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
              type={type}
              className={cn(
                "border-0 focus:ring-0 focus:outline-none",
                className
              )}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PASSWORD:
      return (
        <div className={cn("flex rounded-md border items-center", className)}>
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={props.disabled}
              {...field}
              type={showPassword ? "text" : "password"}
              className={cn(
                "border-0 focus:ring-0 focus:outline-none flex-1 focus-visible:ring-0",
                className
              )}
            />
          </FormControl>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 rounded-r-md focus:outline-none bg-inherit"
          >
            {showPassword ? (
              <EyeOff className="text-gray-500" size={20} />
            ) : (
              <Eye className="text-gray-500" size={20} />
            )}
          </button>
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

    case FormFieldType.TAGS:
      return (
        <FormControl>
          <TagsInput
            value={field.value || []}
            onChange={(newTags) => {
              field.onChange(newTags);
              if (onChange) onChange(newTags);
            }}
            name="tags"
            classNames={{
              input:
                "rounded-md px-4 outline-none border-0 focus:border-0 focus:ring-0 focus:ring-none focus:outline-none w-1/2 bg-transparent text-sm  text-gray-500 text-sm placeholder:text-sm",
              tag: "rounded-md bg-transparent dark:bg-gray-600 text-sm",
            }}
            placeHolder={props.placeholder || "Enter Tags"}
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
                  "w-full flex items-center justify-between px-3 py-2 dark:bg-inherit rounded-md border focus:ring-0 focus:outline-none",
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
                  if (props.disabled) return true;

                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate());

                  return date >= tomorrow;
                }}
                fromYear={1900}
                toYear={moment().year()}
                initialFocus
                className="" // Add this line to satisfy the expected prop
                classNames={{}} // Add this line to satisfy the expected prop
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
              disabled={props.disabled}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {placeholder}
            </span>
          </div>
        </FormControl>
      );

    case FormFieldType.RANGE:
      return (
        <FormControl>
          <div className="flex flex-col items-start">
            <Range
              step={step}
              min={min}
              max={max}
              values={[field.value || min]}
              onChange={(values) => {
                field.onChange(values[0]);
                if (onChange) onChange(values[0]);
              }}
              renderTrack={({ props, children }) => {
                const percentage = ((field.value - min) / (max - min)) * 100;
                return (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: `linear-gradient(90deg, #F96815 ${percentage}%, #ccc ${percentage}%)`, // Progress effect
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => (
                <div
                  className="size-5 rounded-full bg-[#F96815]"
                  {...props}
                  style={{
                    ...props.style,
                  }}
                />
              )}
            />
            {/* Display the selected value */}
            <span className="mt-2 text-gray-500">
              {field.value || min}% / {max}%
            </span>
          </div>
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
