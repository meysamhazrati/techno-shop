import { useState, useEffect } from "react";
import ChevronIcon from "../icons/ChevronIcon";

const SelectBox = ({ title, options, currentValue, setValue, currentValues, setValues, multiple }) => {
  const [currentOption, setCurrentOption] = useState({ title: options?.find(({ value }) => value === currentValue)?.title, value: currentValue });
  const [currentOptions, setCurrentOptions] = useState(options?.map(({ title, value }) => currentValues?.includes(value) && { title, value }).filter((option) => option));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (multiple) {
      !currentValues.length && setCurrentOptions([]);
    } else {
      !currentValue && setCurrentOption({});
    }
  }, [currentValue, currentValues, multiple]);

  return (
    <div className="relative h-14 rounded-3xl border border-zinc-200 px-4 text-lg">
      <div className="flex h-full items-center justify-between gap-x-2">
        <h6 className={`overflow-auto text-nowrap ${(multiple ? currentOptions.length : currentOption.title) ? "text-zinc-900" : "text-zinc-400"}`}>{(multiple ? currentOptions.map(({ title }) => title).join("، ") : currentOption.title) || title}</h6>
        <button type="button" className="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <ChevronIcon className={`size-5 ${isOpen ? "-rotate-90" : "rotate-90"} transition-transform`} />
        </button>
      </div>
      <div className={`${isOpen ? "visible top-16 opacity-100" : "invisible top-14 opacity-0"} absolute left-0 z-10 w-full divide-y divide-zinc-200 overflow-hidden rounded-3xl ${options?.length ? "border border-zinc-200" : ""} bg-white transition-all`}>
        {options?.map((option, index) => (
          <button key={index} type="button" className={`w-full px-4 py-2 text-right transition-colors ${(multiple ? currentOptions.some(({ value }) => value === option.value) : currentOption.value === option.value) ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700"}`} onClick={() => {
            if (multiple) {
              setValues((values) => values.includes(option.value) ? values.filter((value) => value !== option.value) : [...values, option.value]);
              setCurrentOptions((options) => options.some(({ value }) => value === option.value) ? options.filter(({ value }) => value !== option.value) : [...options, option]);
            } else {
              setValue(option.value);
              setCurrentOption(option);
            }

            setIsOpen(false);
          }}>{option.title}</button>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;