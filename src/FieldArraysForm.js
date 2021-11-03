import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add pizza</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Pizza #{index + 1}</h4>
        <Field
          name={`${member}.slice `}
          type="number"
          step="2"
          component={renderField}
          label="No of Slice"
        />
        <Field
          name={`${member}.lastName`}
          type="number"
          component={renderField}
          label="diameter"
        />
      </li>
    ))}
  </ul>
);
const list=[
  {value: 'One', 
  list:[
    {value: 'abc', selected: false}, 
{value: 'efg', selected: false}]}, 
{value: 'Two', list: 
[{value: 'psr', selected: false}]}
]

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="DishName"
        type="text"
        component={renderField}
        label="Dish Name"
      />
      <Field
        name="Time"
        type="time"
        component={renderField}
        label="Time"
        step='2'
      />
            <div>
        <label>Pizza</label>
        <div>
          <Field name="Pizza" component="select">
            <option />
           <option value='pizza'> pizza{list.map((item, index) => {
              return (
                <div key={index}>
                  <option >{item.value}</option>
                {
                  item.list.map((subitem, i) => {
                    return (
                     <select><option>{subitem.value}</option></select>
                    )
                 })
                }
                </div>
              ) 
            })
            } 
          </option>
          </Field>
        </div>
      </div>

      <FieldArray  name='pizza' component={renderMembers}> 
      { 'members' ? renderMembers : renderHobbies}
      </FieldArray>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
 
