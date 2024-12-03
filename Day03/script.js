// Fetch the input file
fetch('input.txt')
    .then(response => response.text())
    .then(data => {
        
    })
    .catch(error => console.error('Error fetching the file:', error));