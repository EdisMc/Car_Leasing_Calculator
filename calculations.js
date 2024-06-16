document.addEventListener('DOMContentLoaded', function () {
    const carType = document.getElementById('carType');
    const carValue = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');
    const leasePeriod = document.getElementById('leasePeriod');
    const leasePeriodRange = document.getElementById('leasePeriodRange');
    const downPayment = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');

    const leasingCost = document.getElementById('leasingCost');
    const downPaymentAmount = document.getElementById('downPaymentAmount');
    const downPaymentPercent = document.getElementById('downPaymentPercent');
    const monthlyInstallment = document.getElementById('monthlyInstallment');
    const interestRate = document.getElementById('interestRate');

    const syncInputRange = (input, range) => {
        input.addEventListener('input', () => range.value = input.value);
        range.addEventListener('input', () => input.value = range.value);
    };

    syncInputRange(carValue, carValueRange);
    syncInputRange(leasePeriod, leasePeriodRange);
    syncInputRange(downPayment, downPaymentRange);

    const calculateResults = () => {
        const carValueNum = parseFloat(carValue.value);
        const leasePeriodNum = parseInt(leasePeriod.value, 10);
        const downPaymentPercentNum = parseFloat(downPayment.value) / 100;
        const downPaymentAmountNum = carValueNum * downPaymentPercentNum;
    
        let annualInterestRate = carType.value === 'new' ? 2.99 : 3.7;
        let monthlyInterestRate = annualInterestRate / 12 / 100;
    
        // Principal amount to be financed
        const principal = carValueNum - downPaymentAmountNum;
    
        // Monthly installment calculation using the formula for annuity payments
        const monthlyInstallmentValue = (principal * monthlyInterestRate) / 
            (1 - Math.pow(1 + monthlyInterestRate, -leasePeriodNum));
        const totalLeasingCost = (monthlyInstallmentValue * leasePeriodNum) + downPaymentAmountNum;
    
        leasingCost.textContent = `€${totalLeasingCost.toFixed(2)}`;
        downPaymentAmount.textContent = `€${downPaymentAmountNum.toFixed(2)}`;
        downPaymentPercent.textContent = ''; // Empty string to remove percentage display
    
        monthlyInstallment.textContent = `€${monthlyInstallmentValue.toFixed(2)}`;
        interestRate.textContent = `${annualInterestRate}%`;
    };
      

    carValue.addEventListener('input', calculateResults);
    carValueRange.addEventListener('input', calculateResults);
    leasePeriod.addEventListener('input', calculateResults);
    leasePeriodRange.addEventListener('input', calculateResults);
    downPayment.addEventListener('input', calculateResults);
    downPaymentRange.addEventListener('input', calculateResults);
    carType.addEventListener('change', calculateResults);

    calculateResults();
});