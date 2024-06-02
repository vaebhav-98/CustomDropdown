import useOutsideClick from "@/hooks/useOutsideClick";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

function classnames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = ({
  id,
  title = "Select",
  data,
  position = "bottom-left",
  hasImage = false,
  style,
  selectedId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classnames(
    "absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10",
    {
      "top-full right-0 mt-2": position === "bottom-right",
      "top-full left-0 mt-2": position === "bottom-left",
      "bottom-full right-0 mb-2": position === "top-right",
      "bottom-full left-0 mb-2": position === "top-left",
    }
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classnames(
          "flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-blue-500 text-white",
          style
        )}
      >
        <span>{selectedItem?.name || title}</span>
        <GoChevronDown
          size={20}
          className={classnames("transform duration-500 ease-in-out", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
            className="leading-10"
          >
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classnames(
                  "flex items-center cursor-pointer hover:bg-gray-200 px-3",
                  { "bg-gray-300": selectedItem?.id === item.id }
                )}
              >
                {hasImage && (
                  <img
                    src={item.imageUrl}
                    alt="image"
                    loading="lazy"
                    className="w-8 h-8 rounded-full bg-gray-400 object-cover me-2"
                  />
                )}
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
