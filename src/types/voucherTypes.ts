export interface VoucherData {
    id?: string;
    voucherNo: string;
    date: string;
    accountHead: string;
    receiverName: string;
    address: string;
    amountInWords: string;
    accountNo?: string;
    paymentMode: 'Cash' | 'Cheque' | 'Transfer';
    chequeNo?: string;
    towards: string;
    amount: number;
    regNo?: string;
    orgName: string;
    orgTagline?: string;
    orgAddress: string;
    orgPhone?: string;
    orgCell?: string;
    orgEmail?: string;
    orgWebsite?: string;
    orgLogo?: string;
    status: 'draft' | 'saved';
    createdAt?: number;
}
