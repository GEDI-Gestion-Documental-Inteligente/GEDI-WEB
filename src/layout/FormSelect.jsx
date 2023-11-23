import React from "react";

export const FormSelect = ({ selectData: { name, options } }) => {
    return (
        <select
            className={`p-2 mb-2 border-b-cyan-800 border-2 hover:cursor-pointer focus:bg-cyan-50 hover:target:bg-cyan-300 w-1/2 `}
            name={name}
        >
            {options.map((option, index) => {
                if (option?.hideOption) {
                    return (
                        <option key={index} hidden>
                            {option.text}
                        </option>
                    );
                }
                return (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                );
            })}
        </select>
    );
};
