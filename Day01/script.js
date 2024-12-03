// Fetch the input file
fetch('input.txt')
    .then(response => response.text())
    .then(data => {
        // Split the data into lines
        const lines = data.trim().split('\n');

        // Initialize arrays for the first and second columns
        const firstColumn = [];
        const secondColumn = [];

        // Iterate over each line and split into columns
        lines.forEach(line => {
            const [first, second] = line.split(/\s+/).map(Number);
            firstColumn.push(first);
            secondColumn.push(second);
        });

        // Sort both arrays
        firstColumn.sort((a, b) => a - b);
        secondColumn.sort((a, b) => a - b);

        // Calculate the cumulative distance
        let cumulativeDistance = 0;
        for (let i = 0; i < firstColumn.length; i++) {
            cumulativeDistance += Math.abs(firstColumn[i] - secondColumn[i]);
        }

        // Calculate the cumulative multiplier
        let cumulativeMultiplier = 0;
        firstColumn.forEach(value => {
            const count = secondColumn.filter(x => x === value).length;
            cumulativeMultiplier += value * count;
        });

        console.log('Cumulative Distance:', cumulativeDistance);
        console.log('Cumulative Multiplier:', cumulativeMultiplier);
        console.log('Sorted First Column:', firstColumn);
        console.log('Sorted Second Column:', secondColumn);
    })
    .catch(error => console.error('Error fetching the file:', error));