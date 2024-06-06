import React, { useState } from 'react';

function AccountPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({});

  if (!user) {
    return <div>No user data available. Please register or login.</div>;
  }

  const validate = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    }

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const updatedUser = {
        firstName,
        lastName,
        email,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="account-page">
      
      <form noValidate>
        <div className="form-group">
        <h2>Account Information</h2>
          <label>First Name:</label>
          {isEditing ? (
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <p>{user.firstName}</p>
          )}
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          {isEditing ? (
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <p>{user.lastName}</p>
          )}
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{user.email}</p>
          )}
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        {isEditing ? (
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default AccountPage;
