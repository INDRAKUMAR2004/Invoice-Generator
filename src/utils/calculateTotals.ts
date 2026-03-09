import type { LineItem } from '../types/invoiceTypes';

export const calculateLineItemTotal = (quantity: number, unitPrice: number, taxPercent: number) => {
    const baseTotal = quantity * unitPrice;
    const taxAmount = (baseTotal * taxPercent) / 100;
    return baseTotal + taxAmount;
};

export const calculateInvoiceTotals = (items: LineItem[], discount: number = 0) => {
    let subtotal = 0;
    let totalTax = 0;

    items.forEach(item => {
        const itemSubtotal = item.quantity * item.unitPrice;
        const itemTax = (itemSubtotal * item.taxPercent) / 100;
        subtotal += itemSubtotal;
        totalTax += itemTax;
    });

    const grandTotal = subtotal + totalTax - discount;

    return {
        subtotal,
        taxAmount: totalTax,
        grandTotal: Math.max(0, grandTotal),
    };
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};

const single = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const formatNumberToWords = (n: number, s: string): string => {
    let str = '';
    if (n > 19) {
        str += tens[Math.floor(n / 10)] + (n % 10 > 0 ? ' ' + single[n % 10] : '');
    } else if (n > 0) {
        if (n >= 10 && n <= 19) {
            str += double[n % 10];
        } else {
            str += single[n];
        }
    }
    if (n > 0) {
        str += s;
    }
    return str;
};

const convertIndianSystem = (amount: number): string => {
    if (amount === 0) return 'Zero';

    let words = '';
    words += formatNumberToWords(Math.floor(amount / 10000000), ' Crore ');
    amount %= 10000000;
    words += formatNumberToWords(Math.floor(amount / 100000), ' Lakh ');
    amount %= 100000;
    words += formatNumberToWords(Math.floor(amount / 1000), ' Thousand ');
    amount %= 1000;
    words += formatNumberToWords(Math.floor(amount / 100), ' Hundred ');
    amount %= 100;

    if (amount > 0 && words.trim() !== '') {
        words += 'And ';
    }
    words += formatNumberToWords(Math.floor(amount), '');

    return words.trim();
};

export const amountToWords = (amount: number): string => {
    if (!amount) return 'Indian Rupee Zero Only';

    try {
        const words = convertIndianSystem(amount);
        return `Indian Rupee ${words} Only`;
    } catch {
        return 'Value as represented numerically';
    }
};
