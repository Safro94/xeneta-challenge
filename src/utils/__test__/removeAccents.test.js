import { removeAccents } from '../removeAccents';

describe('Remove accents', () => {
	it('should return a string without accents', () => {
		const inputValue = 'áàãâéèêíìîóòôõúùûü';
		const valueWithoutAccent = 'aaaaeeeiiioooouuuu';

		const result = removeAccents(inputValue);

		expect(result).toEqual(valueWithoutAccent);
	});
});
