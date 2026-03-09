export interface CompanyLogo {
    id: string;
    url: string;
}

export interface LineItem {
    id: string;
    name: string;
    description: string;
    hsnSac?: string;
    quantity: number;
    unitPrice: number;
    unit?: string;
    taxPercent: number;
    total: number;
}

export interface InvoiceData {
    id?: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    companyInfo: {
        logo?: string;
        name: string;
        address: string;
        email: string;
        phone: string;
        gstNumber?: string;
        placeOfSupply?: string;
        stateCode?: string;
    };
    customerInfo: {
        name: string;
        address: string;
        email: string;
        phone: string;
    };
    items: LineItem[];
    subtotal?: number;
    taxAmount?: number;
    discount: number;
    grandTotal?: number;
    template: 'classic' | 'modern' | 'minimal';
    status: 'draft' | 'saved';
    notes?: string;
    terms?: string;
    createdAt?: number;
}
