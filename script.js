// Get reference to the table body
const output = document.getElementById("output");

// Step 1: Show "Loading..." message initially
output.innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

// Step 2: Create a function that returns a promise that resolves after random time
function createPromise(promiseName) {
  return new Promise((resolve) => {
    // Generate random time between 1 and 3 seconds
    const randomTime = Math.random() * 2 + 1; // Random number between 1 and 3
    
    // Resolve after the random time
    setTimeout(() => {
      resolve({
        name: promiseName,
        time: randomTime
      });
    }, randomTime * 1000); // Convert to milliseconds
  });
}

// Step 3: Create 3 promises
const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

// Step 4: Track the start time to calculate total time
const startTime = Date.now();

// Step 5: Use Promise.all to wait for all promises to resolve
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // Calculate total time taken
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000; // Convert to seconds
    
    // Step 6: Clear the "Loading..." message
    output.innerHTML = '';
    
    // Step 7: Add rows for each promise result
    results.forEach((result) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.name}</td>
        <td>${result.time.toFixed(3)}</td>
      `;
      output.appendChild(row);
    });
    
    // Step 8: Add the total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
  })
  .catch((error) => {
    // Handle any errors
    output.innerHTML = `<tr><td colspan="2">Error: ${error.message}</td></tr>`;
  });