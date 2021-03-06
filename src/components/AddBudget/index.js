import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/budget/actions';
import styled from 'styled-components';
import FormBudget from '../FormBudget';
import DisplayMainBudget from '../DisplayMainBudget';
import img from '../../assets/img/background.jpg';

const Wrapper = styled.header`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: url(${img});
`;

const AddBudget = ({ add, subtract, budget }) => {

    const initalState = {
        name: '',
        value: '',
        operation: 'add',
    }

    const [budgetInput, setBudgetInput] = useReducer((state, newState) => ({...state, ...newState}), initalState);

    const handleChange = e => {
        const name = e.target.name;
        const newValue = e.target.value;

        setBudgetInput({[name]: newValue});
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { name, value, operation } = budgetInput;
        const parseValue = parseFloat(value);

        if(budgetInput.name && budgetInput.value) {
            operation === 'add' ? add(name, parseValue) : subtract(name, parseValue)
        } else {
            console.log('nie wysylamy')
        }
          setBudgetInput(initalState)
      }

    return (
        <Wrapper>
            <DisplayMainBudget budget={budget}/>
            <FormBudget 
                handleSubmit={handleSubmit}
                handleChange={handleChange} 
                name={budgetInput.name} 
                value={budgetInput.value} 
                operation={budgetInput.operation}
            />
        </Wrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    add:(name, value) => dispatch(actions.add(name,value)),
    subtract:(name, value) => dispatch(actions.subtract(name,value))
});

const mapStateToProps = state => ({
    budget:state.budget
});

export default connect(mapStateToProps ,mapDispatchToProps)(AddBudget);