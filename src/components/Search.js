import React from 'react';


export default function Search(props) {
    
    return (
        <form className = 'form-inline m-2' >
            <input
                className = 'form-control'
                value = {props.value}
                name = 'search'
                onChange = {props.handleInputChange}
                type = 'search'
                placeholder = 'Search'
            />
        </form>
    )
}