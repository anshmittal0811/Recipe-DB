import React, { useState } from 'react'
import { CustomSelect } from '../components/common/CustomSelect';
import { useReceptors } from '../hooks/useReceptors';
import { IReceptor } from '../interfaces/Receptor';

const Receptors = () => {

  const receptorTypes = [
    { name: "Taste Receptors", value: "taste" },
    { name: "Odor Receptors", value: "odor" },
  ];

  const [searchQueryType, setSearchQueryType] = useState(receptorTypes[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const { data: receptors, isLoading, error } = useReceptors(searchQueryType.value, {
    page: currentPage,
    limit: pageSize,
  });

  const handleReceptorTypeChange = (selectedOption: any) => {
    if (selectedOption) {
      setSearchQueryType(selectedOption);
      setCurrentPage(0); // Reset to first page when changing type
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8 mt-8">
      {/* Receptor Type Selection */}
      <div className="flex justify-center items-center mb-8">
        <div className="md:hidden">
          <CustomSelect
            options={receptorTypes}
            value={searchQueryType.value}
            onChange={handleReceptorTypeChange}
            className="w-[15rem]"
          />
        </div>

        {/* Desktop: Button group */}
        <div className="hidden md:flex justify-center items-center bg-[#F1F1F1] rounded-full px-1 py-1 shadow-sm w-fit">
          <div className="flex justify-center items-center space-x-6">
            {receptorTypes.map((receptorType) => (
              <button
                key={receptorType.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  searchQueryType.value === receptorType.value
                    ? "bg-white text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => {
                  setSearchQueryType(receptorType);
                  setCurrentPage(0);
                }}
              >
                {receptorType.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-600 text-center">
            <p className="text-lg font-semibold">Error loading receptors</p>
            <p className="text-sm">Please try again later</p>
          </div>
        </div>
      )}

      {/* Receptors Table */}
      {receptors && receptors.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UniProt ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organism
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receptor Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {receptors.map((receptor: IReceptor) => (
                  <tr key={receptor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {receptor.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {receptor.uniprot_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {receptor.entry_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {receptor.organism}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {receptor.receptor_type?.charAt(0).toUpperCase() + receptor.receptor_type?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <a
                        href={receptor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {receptor.url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={receptors.length < pageSize}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage + 1}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={receptors.length < pageSize}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {receptors && receptors.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg font-medium">No receptors found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Receptors