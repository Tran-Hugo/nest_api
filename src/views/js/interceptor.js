// Define the modified fetch function
function modifiedFetch(url, options = {}) {
  // modify the request here
  options.headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    ...options.headers,
  };

  // call the original fetch function with the modified request
  return fetch(url, options)
    .then((response) => {
      if (response.status === 401) {
        fetch('http://localhost:3000/auth/refreshtoken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: localStorage.getItem('refresh_token'),
            access_token: localStorage.getItem('token'),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            window.location.reload();
          });
      }

      // Otherwise, return the response
      return response;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error('Error during fetch request:', error);
      throw error;
    });
}

// Export the modified fetch function
export { modifiedFetch };
