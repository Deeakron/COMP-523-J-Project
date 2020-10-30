import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import * as spreadsheet from "./spreadsheet";
/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElemeqnt = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

const nullSheetId = null;
test('GetTitle - Null', async () => {
  expect(await spreadsheet.getTitle(nullSheetId)).not.toBe('Test');
});

const invalidSheetId = 'a'
test('GetTitle - Invalid', async () => {
  expect(await spreadsheet.getTitle(invalidSheetId)).not.toBe('Test');
});

const validSheetId='194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM'
test('GetTitle - Valid', async () => {
  expect(await spreadsheet.getTitle(validSheetId)).toBe('Test');
});
