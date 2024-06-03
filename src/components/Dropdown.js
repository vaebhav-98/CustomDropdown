import useOutsideClick from "@/hooks/useOutsideClick";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

function classnames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = ({ title, data, selectedId, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );
  const dropdownRef = useRef(null);

  const handleChange = (item) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setOpen(false);
  };

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setOpen(false),
  });

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-expanded={open}
        type="button"
        onClick={() => setOpen(!open)}
        className={classnames(
          "flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-gray-500 text-white"
        )}
      >
        <span>{selectedItem?.name || title}</span>
        <GoChevronDown
          size={20}
          className={classnames("transform duration-500 ease-in-out", {
            "rotate-180": open,
          })}
        />
      </button>
      {/* Open */}
      {open && (
        <div>
          <ul className="leading-10">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classnames(
                  "flex items-center cursor-pointer hover:bg-gray-200 px-3",
                  { "bg-gray-300": selectedItem?.id === item.id }
                )}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
