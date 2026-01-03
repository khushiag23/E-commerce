import { useState } from "react";

export const Dropdown = ( { value, onChange } ) => {


    return (
        <div>
            <select value={value} onChange={onChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    )
}