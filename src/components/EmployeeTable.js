import React from 'react';


export default function EmployeeTable(props) {

    return (
        <table className = 'table table-sortable text-center'>
            <thead>
                <tr>
                    <th scope = 'col'>Image</th>
                    <th scope = 'col' data-field = 'name' data-sortable = 'true'>
                        <span onClick = {() => props.sortBy('name', 'last', 'first')}>
                            Name
                        </span>
                    </th>
                    <th scope = 'col'>
                        <span onClick = {() => props.sortBy('phone')}>
                            Phone
                        </span>
                    </th>
                    <th scope = 'col'>
                        <span onClick = {() => props.sortBy('email')}>
                            Email
                        </span>
                    </th>
                    <th scope = 'col'>
                        Age
                    </th>
                </tr>
            </thead>

            <tbody>
                {props.state.filteredEmployees.map((employee) => {
                    const { first, last } = employee.name;
                    const fullName = `${last}, ${first}`
               

                return (
                    <tr key = {employee.login.uuid}>
                        <td>
                            <img src = {employee.picture.thumbnail} alt = {fullName} />
                        </td>
                        <td className = 'align-middle'>{fullName}</td>
                        <td className = 'align-middle'>{employee.phone}</td>
                        <td className = 'align-middle email'>
                            <a href= {`mailto:${employee.email}`}>{employee.email}</a>
                        </td>
                        <td className = 'align-middle'>{employee.dob.age}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}