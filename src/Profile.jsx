import React, { useState, useEffect } from 'react';
import './Profile.css'

// Profile component
const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const server_url = import.meta.env.VITE_SERVER_URL;
  const userid = localStorage.getItem('userid');
  // Fetch user profile data from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${server_url}/user/${userid}`);
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setUser({ name: data.name, email: data.email });
        setNewName(data.name);  // Set name and email in input fields
        setNewEmail(data.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle profile and password change form submit
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server_url}/user/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName, newEmail, newPassword }),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      alert('Profile updated successfully');
      setUser({ name: newName, email: newEmail });
      setNewPassword('');  // Clear password field after update
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {/* Edit Profile Form */}
      <form onSubmit={handleProfileUpdate}>
        <div className="profile-info">
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="profile-info">
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="profile-info">
          <label>
            <strong>New Password:</strong>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="update-btn">Update Profile</button>
      </form>

      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
