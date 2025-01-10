function generateRandomNumbers() {
    const total = parseInt(document.getElementById('total').value.trim());
    const sampleInput = document.getElementById('sample').value.trim();
    const output = document.getElementById('output');

    // Validate the total input
    if (isNaN(total) || total <= 0) {
        output.innerHTML = "<p style='color:red;'>Invalid input. Please enter a valid total number of staff.</p>";
        return;
    }

    let sampleSize = 0;

    // Check if sample input is an integer
    if (/^\d+$/.test(sampleInput)) {
        sampleSize = parseInt(sampleInput); // Use as integer sample size
    } else if (sampleInput.includes('%')) {
        // Handle percentage input
        const fraction = parseFloat(sampleInput.replace('%', '')) / 100;
        if (isNaN(fraction) || fraction <= 0 || fraction > 1) {
            output.innerHTML = "<p style='color:red;'>Invalid input. Please enter a valid percentage (e.g., 20%) or a valid sample size integer.</p>";
            return;
        }
        sampleSize = Math.ceil(fraction * total);
    } else {
        // Handle decimal fraction input
        const sampleFraction = parseFloat(sampleInput);
        if (isNaN(sampleFraction) || sampleFraction <= 0 || sampleFraction >= 1) {
            output.innerHTML = "<p style='color:red;'>Invalid input. Please enter a valid sample fraction (e.g., 0.2 for 20%) or a valid integer sample size.</p>";
            return;
        }
        sampleSize = Math.round(total * sampleFraction);
    }

    // Check if the sample size exceeds the total number of staff
    if (sampleSize > total) {
        output.innerHTML = "<p style='color:red;'>Sample size cannot exceed the total number of staff.</p>";
        return;
    }

    // Generate random numbers
    const randomNumbers = [];
    while (randomNumbers.length < sampleSize) {
        const rand = Math.floor(Math.random() * total) + 1;
        if (!randomNumbers.includes(rand)) {
            randomNumbers.push(rand);
        }
    }

    // Updated output formatting
    output.innerHTML = `
        <h3>Random Numbers</h3>
        <p>${randomNumbers.join(', ')}</p>
    `;
}
