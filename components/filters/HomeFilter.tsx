"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },
  //   { name: "Newest", value: "newest" },
  //   { name: "Popular", value: "popular" },
  //   { name: "Unanswered", value: "unanswered" },
  //   { name: "Recommeded", value: "recommended" },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const [active, setActive] = useState(filterParams);
  const router = useRouter();

  const handleTypeClick = (filter: string) => {
    let newUrl = "";
    if (filter !== active) {
      setActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    } else {
      setActive("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default HomeFilter;
