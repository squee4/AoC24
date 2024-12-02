fetch('input.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
			// Separate the data by lines
			let lines = data.split('\n');
			// We will assume all lines are valid
			let validLines = lines.length;
			// This is for part 2
			let unsafeValues = [];
			let	fixedValues = 0;

			// Loop among all lines
			lines.forEach(line => {
				// Split the line into an array
				let numbers = line.split(' ');
				// Check if the array is not sorted or 
				// if the distance between numbers is not valid
				if (!isSorted(numbers) || !isDistanceValid(numbers)) {
					// If so, remove one from the counter
					validLines--;
					// And add this array to the unsafeValues for the part 2
					unsafeValues.push(numbers);
				}
			});

			console.log("Safe = "+validLines);

			unsafeValues.forEach(arr => {
				for(let i = 0; i < arr.length; i++) {
					let temp = [...arr];
					temp.splice(i, 1);
					if (isSorted(temp) && isDistanceValid(temp)) {
						fixedValues++;
						return;
					}
				}
			});

			console.log("Fixed = "+fixedValues);
			console.log("New total = "+(fixedValues + validLines));

			// Function to check if the array is sorted
			function isSorted(arr) {
				let sortedAsc = [...arr].sort((a, b) => a - b);
				let sortedDesc = [...arr].sort((a, b) => b - a);
				return arr.join(' ') === sortedAsc.join(' ') || arr.join(' ') === sortedDesc.join(' ');
			}
			// Function to check if the distance between numbers is valid (1, 2 or 3)
			function isDistanceValid(arr) {
				for (let i = 0; i < arr.length - 1; i++) {
					let dist = Math.abs(arr[i] - arr[i + 1]);
					if (dist > 3 || dist === 0) {
						return false;
					}
				}
				return true;
			}
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });