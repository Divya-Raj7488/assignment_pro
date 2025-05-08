import React, { useState, useEffect, useRef } from "react";

interface CityData {
  name: string;
  country: string;
  timezone: string;
}

interface CityListProps {
  cityListInDisplay: CityData[];
}

const CityList = ({ cityListInDisplay }: CityListProps) => {
  const [visibleCities, setVisibleCities] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCities(cityListInDisplay.slice(0, 50));
  }, [cityListInDisplay]);
  useEffect(() => {
    const handleScroll = () => {
      const container = tableContainerRef.current;
      if (!container || isLoading) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < 200) {
        if (visibleCities.length < cityListInDisplay.length) {
          loadMoreCities();
        }
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleCities, cityListInDisplay, isLoading]);
  const loadMoreCities = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentLength = visibleCities.length;
      const nextBatch = cityListInDisplay.slice(
        currentLength,
        currentLength + 100
      );

      setVisibleCities((prev) => [...prev, ...nextBatch]);
      setIsLoading(false);
    }, 300);
  };

  if (cityListInDisplay.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-xl font-medium">No cities found</p>
        <p className="mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div
      ref={tableContainerRef}
      className="w-full overflow-auto max-h-screen pb-8"
      data-testid="city-list-container"
    >
      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S.No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                City Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timezone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleCities.map((city, index) => {
              return (
                <tr
                  key={`${city}-${index}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  data-testid={`city-row-${index}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {city.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{city.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    India/Asia
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && (
          <div className="w-full py-4 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        {!isLoading &&
          visibleCities.length >= cityListInDisplay.length &&
          cityListInDisplay.length > 0 && (
            <div className="w-full py-4 text-center text-gray-500">
              All cities loaded
            </div>
          )}
      </div>
    </div>
  );
};

export default CityList;
