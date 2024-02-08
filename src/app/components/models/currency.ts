export interface Currency {
    id: number;
    title: string;
    symbol: string;
    is_prefix_symbol: number;
    decimals: number;
    code: string;
    is_default: number;
    exchange_rate: number;
}
