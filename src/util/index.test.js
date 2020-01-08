import { formatCurrency } from '.'
  
describe('util tests', () => {
    it('should format the currency with two decimal places', () => {
        const result = formatCurrency(10)
        expect(result).toBe('$10.00');
    });
})