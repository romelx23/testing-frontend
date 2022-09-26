import React, { FC } from "react";
interface Props {
  item: {
    id: number;
    name: string;
    icon?: string;
    iconFontawesome?: string;
  };
}

export const CardAdmin: FC<Props> = ({ item }) => {
  const { name, icon, iconFontawesome } = item;
//   let blob = new Blob([icon||''], { type: "image/svg+xml" });
//   let url = URL.createObjectURL(blob);
  return (
    <div className="w-64 h-40 bg-indigo-600 text-white rounded-2xl flex items-center">
      <h1 className="text-center text-2xl">{name}</h1>
      {iconFontawesome ? (
        <i className={`w-20 text-3xl ${iconFontawesome}`}></i>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
    </div>
  );
};
