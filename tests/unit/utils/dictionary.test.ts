import { describe, expect, it } from 'vitest';

describe('utils: dictionary', () => {
  it('can get dictionary API URLs', () => {
    expect(dictionaryCategoriesParentApiUrl).toEqual('/api/v1/dictionary/categories/parent');
    expect(dictionaryCategoriesChildApiUrl).toEqual('/api/v1/dictionary/categories/child');
    expect(dictionaryAccountsApiUrl).toEqual('/api/v1/dictionary/accounts');
    expect(dictionaryLoansApiUrl).toEqual('/api/v1/dictionary/loans');
    expect(dictionaryTagsApiUrl).toEqual('/api/v1/dictionary/tags');
    expect(dictionaryTransactionTypesApiUrl).toEqual('/api/v1/dictionary/transactions/types');
    expect(dictionaryLoanTypesApiUrl).toEqual('/api/v1/dictionary/loans/types');
  });
});
