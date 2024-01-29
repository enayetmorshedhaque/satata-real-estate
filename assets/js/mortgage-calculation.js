$(document).ready(function () {
    // Function to format numbers with commas
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Function to round a number to a specific number of decimal places
    function roundToDecimal(number, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }

    // Function to calculate mortgage
    function calculateMortgage(principal, interestRate, loanTerm) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        return monthlyPayment;
    }

    // Function to update calculation results
    function updateCalculationResults(principal, interest, monthlyPayment, totalPayable) {
        $("#calculation_principal_amount").text(formatNumberWithCommas(roundToDecimal(principal, 2)));
        $("#calculation_interest_amount").text(formatNumberWithCommas(roundToDecimal(interest, 2)));
        $("#calculation_monthly_payable_amount").text(formatNumberWithCommas(roundToDecimal(monthlyPayment, 2)));
        $("#calculation_total_payable_amount").text(formatNumberWithCommas(roundToDecimal(totalPayable, 2)));
    }

    // Event listener for the "Calculate Mortgage" button
    $("button.btn-primary").on("click", function (e) {
        e.preventDefault();

        // Get input values
        const principalAmount = parseFloat($("#principal_amount").val()) || 0;
        const loanPeriod = parseFloat($("#loan_period").val()) || 0;
        const loanInterest = parseFloat($("#loan_interest").val()) || 0;

        // Perform the mortgage calculation
        const monthlyPayment = calculateMortgage(principalAmount, loanInterest, loanPeriod);
        const totalPayable = monthlyPayment * loanPeriod * 12;
        const interestAmount = totalPayable - principalAmount;

        // Update the calculation results
        updateCalculationResults(
            roundToDecimal(principalAmount, 0),
            roundToDecimal(interestAmount, 0),
            roundToDecimal(monthlyPayment, 0),
            roundToDecimal(totalPayable, 0)
        );
    });
});
