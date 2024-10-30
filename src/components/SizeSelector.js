import { useEffect, useRef, useState } from 'react';

function SizeSelector({ sizes, sizesQty, selectedSize, setSelectedSize }) {
  const orderedSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const sortedSizes = sizes ? sizes.sort((a, b) => {
    return orderedSizes.indexOf(a.name) - orderedSizes.indexOf(b.name);
  }) : [];

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown element
  const dropdownSize = orderedSizes.length * 24;

  useEffect(() => {
    const firstAvailableSize = sortedSizes.find((size) => sizesQty[size._id] >= 1);
    if (firstAvailableSize) {
      setSelectedSize(firstAvailableSize._id);
    }
  }, [sortedSizes, sizesQty, setSelectedSize]);

  useEffect(() => {
    if (!sizes || sizes.length <= 0) return;
    setDropdownOpened(false);
  }, [selectedSize, sizes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpened(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!sizes || sizes.length <= 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={'pl-4 pr-2 gap-x-1.5 py-3 flex rounded-lg bg-gray-silver cursor-pointer hover:bg-gray-bluish active:bg-gray-bluish transition-all duration-100'}
        onClick={() => setDropdownOpened(!dropdownOpened)}
      >
        <span className="font-poppins text-base">{sortedSizes.find(size => size._id === selectedSize)?.name || "Select Size"}</span>
        <svg className={`mt-[0.5px] ${!dropdownOpened ? 'rotate-180' : 'rotate-0'} transition-all`} xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 22 24" fill="none">
          <path d="M17.875 8.25L11 15.75L4.125 8.25" stroke="black" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div
        style={{
          height: dropdownOpened ? dropdownSize : 20,
        }}
        className={`absolute w-full rounded-lg p-1 bg-white overflow-hidden ${dropdownOpened ? 'bottom-14 opacity-100 pointer-events-auto' : 'bottom-12 opacity-0 pointer-events-none'} transition-all`}
      >
        <ul className="flex flex-col-reverse">
          {sortedSizes.map((size, i) => (
            selectedSize !== size._id && (
              <li key={i} className={`pl-2 py-0.5 relative cursor-pointer z-10 group ${sizesQty[size._id] < 1 ? 'opacity-40 pointer-events-none' : ''}`} onClick={() => sizesQty[size._id] >= 1 && setSelectedSize(size._id)}>
                <span className="font-poppins text-base text-black">{size.name}</span>
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-md -z-10 transition-all duration-100 opacity-0 group-hover:opacity-100 scale-y-50 group-hover:scale-y-100"/>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SizeSelector;
