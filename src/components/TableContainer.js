import React, { Component } from 'react';
import API from '../utils/API';
import Search from './Search';
import EmployeeTable from './EmployeeTable';

class TableContainer extends Component {


    state = {
        search: '',
        employees: [],
        filteredEmployees: [],
        sortDirections: this.initialSortDirections
    };


    get initialSortDirections() {
        return {
            name: '',
            phone: '',
            email: '',
        }
    };


    componentDidMount() {
        API.getEmployees()
            .then((res) => 
                this.setState({
                    employees: res.data.results,
                    filteredEmployees: res.data.results
                })
            )
    }


    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({
            search: value
        });
        this.filteredEmployees(value.toLowerCase().trim());
    };


    handleFormSubmit = (event) => {
        event.preventDefault();
    };


    sortByFunction = (key, primary = 0, secondary = 0) => {
        
        let sortedEmployees = this.state.filteredEmployees;

        if(this.state.sortDirections[key]) {
            this.setState({
                filteredEmployees: sortedEmployees.reverse(),
                sortDirections: {
                    ...this.initialSortDirections,
                    [key]: this.state.sortDirections[key] === 'asc' ? 'desc' : 'asc',
                }
            });
        }

        else {
            sortedEmployees = this.state.filteredEmployees.sort((a,b) => {
                a = a[key];
                b = b[key];


                if (primary) {
                    if (secondary && a[primary] === b[primary]) {
                        return a[secondary].localeCompare(b[secondary]);
                    }
                    return a[primary].localeCompare(b[primary]);
                }
                else {
                    return a.localeCompare(b);
                }
            });


        this.setState({
            filteredEmployees: sortedEmployees,
            sortDirections: {
                ...this.initialSortDirections,
                [key]: 'asc'
            }
        });


        }
    };


    filteredEmployees = (input) => {
        if (input) {
            this.setState({
                filteredEmployees: this.state.employees.filter((employee) => {
                    return(
                        employee.name.first.toLowerCase().concat(' ', employee.name.last.toLowerCase()).includes(input)
                        ||
                        employee.phone.includes(input)
                        ||
                        employee.email.includes(input)
                    )
                })
            })
        }
        
        else {
            this.setState({
                filteredEmployees: this.state.employees
            });
        }
    };


    render() {
        return (
            <>
                <Search
                    value = {this.state.search}
                    handleInputChange = {this.handleInputChange}
                    handleFormSubmit = {this.handleFormSubmit}
                />
                <EmployeeTable
                    state = {this.state}
                    sortBy = {this.sortByFunction}
                    filteredEmployees = {this.filteredEmployees}
                />
            </>
        )
    }
}



export default TableContainer;