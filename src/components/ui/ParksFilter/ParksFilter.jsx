import React, { useState, useEffect } from 'react';
import './ParksFilter.css';
import Button from '../Button/Button.jsx';

function ParksFilter({
                         onFilterChange,
                         stateOptions = [],
                         isLoading = false,
                         currentFilters = { state: '', hasFee: '' }
                     }) {
    const [selectedState, setSelectedState] = useState(currentFilters.state || '');
    const [hasFee, setHasFee] = useState(currentFilters.hasFee || '');

    useEffect(() => {
        setSelectedState(currentFilters.state || '');
        setHasFee(currentFilters.hasFee || '');
    }, [currentFilters]);

    const allStates = stateOptions.length > 0 ? stateOptions : [
        { name: 'Alabama', code: 'AL' },
        { name: 'Alaska', code: 'AK' },
        { name: 'Arizona', code: 'AZ' },
        { name: 'Arkansas', code: 'AR' },
        { name: 'California', code: 'CA' },
        { name: 'Colorado', code: 'CO' },
        { name: 'Connecticut', code: 'CT' },
        { name: 'Delaware', code: 'DE' },
        { name: 'Florida', code: 'FL' },
        { name: 'Georgia', code: 'GA' },
        { name: 'Hawaii', code: 'HI' },
        { name: 'Idaho', code: 'ID' },
        { name: 'Illinois', code: 'IL' },
        { name: 'Indiana', code: 'IN' },
        { name: 'Iowa', code: 'IA' },
        { name: 'Kansas', code: 'KS' },
        { name: 'Kentucky', code: 'KY' },
        { name: 'Louisiana', code: 'LA' },
        { name: 'Maine', code: 'ME' },
        { name: 'Maryland', code: 'MD' },
        { name: 'Massachusetts', code: 'MA' },
        { name: 'Michigan', code: 'MI' },
        { name: 'Minnesota', code: 'MN' },
        { name: 'Mississippi', code: 'MS' },
        { name: 'Missouri', code: 'MO' },
        { name: 'Montana', code: 'MT' },
        { name: 'Nebraska', code: 'NE' },
        { name: 'Nevada', code: 'NV' },
        { name: 'New Hampshire', code: 'NH' },
        { name: 'New Jersey', code: 'NJ' },
        { name: 'New Mexico', code: 'NM' },
        { name: 'New York', code: 'NY' },
        { name: 'North Carolina', code: 'NC' },
        { name: 'North Dakota', code: 'ND' },
        { name: 'Ohio', code: 'OH' },
        { name: 'Oklahoma', code: 'OK' },
        { name: 'Oregon', code: 'OR' },
        { name: 'Pennsylvania', code: 'PA' },
        { name: 'Rhode Island', code: 'RI' },
        { name: 'South Carolina', code: 'SC' },
        { name: 'South Dakota', code: 'SD' },
        { name: 'Tennessee', code: 'TN' },
        { name: 'Texas', code: 'TX' },
        { name: 'Utah', code: 'UT' },
        { name: 'Vermont', code: 'VT' },
        { name: 'Virginia', code: 'VA' },
        { name: 'Washington', code: 'WA' },
        { name: 'West Virginia', code: 'WV' },
        { name: 'Wisconsin', code: 'WI' },
        { name: 'Wyoming', code: 'WY' },
        { name: 'District of Columbia', code: 'DC' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'Guam', code: 'GU' },
        { name: 'Northern Mariana Islands', code: 'MP' },
        { name: 'Puerto Rico', code: 'PR' },
        { name: 'U.S. Virgin Islands', code: 'VI' }
    ];

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleFeeChange = (e) => {
        setHasFee(e.target.value);
    };

    const applyFilters = () => {
        onFilterChange({
            state: selectedState,
            hasFee: hasFee
        });
    };

    const resetFilters = () => {
        setSelectedState('');
        setHasFee('');
        onFilterChange({
            state: '',
            hasFee: ''
        });
    };

    const removeFilter = (filterType) => {
        if (filterType === 'state') {
            setSelectedState('');
            onFilterChange({
                ...currentFilters,
                state: ''
            });
        } else if (filterType === 'hasFee') {
            setHasFee('');
            onFilterChange({
                ...currentFilters,
                hasFee: ''
            });
        }
    };

    const getStateName = (code) => {
        const state = allStates.find(state => state.code === code);
        return state ? state.name : code;
    };

    return (
        <div className="parks-filter">
            <div className="filter-form">
                <div className="filter-group">
                    <label htmlFor="state-filter">State:</label>
                    <select
                        id="state-filter"
                        value={selectedState}
                        onChange={handleStateChange}
                        disabled={isLoading}
                    >
                        <option value="">All States</option>
                        {allStates.map((state) => (
                            <option key={state.code} value={state.code}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="fee-filter">Entry Fee:</label>
                    <select
                        id="fee-filter"
                        value={hasFee}
                        onChange={handleFeeChange}
                        disabled={isLoading}
                    >
                        <option value="">All Parks</option>
                        <option value="true">Parks with Entry Fee</option>
                        <option value="false">Parks without Entry Fee</option>
                    </select>
                </div>

                <div className="filter-buttons">
                    <Button
                        onClick={applyFilters}
                        disabled={isLoading}
                        className="primary"
                    >
                        Apply Filters
                    </Button>
                    <Button
                        onClick={resetFilters}
                        disabled={isLoading}
                        className="primary"
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {(currentFilters.state || currentFilters.hasFee) && (
                <div className="active-filters">
                    <span>Active Filters:</span>
                    {currentFilters.state && (
                        <div className="filter-tag">
                            {getStateName(currentFilters.state)}
                            <button onClick={() => removeFilter('state')}>×</button>
                        </div>
                    )}
                    {currentFilters.hasFee === 'true' && (
                        <div className="filter-tag">
                            Parks with Entry Fee
                            <button onClick={() => removeFilter('hasFee')}>×</button>
                        </div>
                    )}
                    {currentFilters.hasFee === 'false' && (
                        <div className="filter-tag">
                            Parks without Entry Fee
                            <button onClick={() => removeFilter('hasFee')}>×</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ParksFilter;