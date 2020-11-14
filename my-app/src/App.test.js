import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import * as spreadsheet from "./spreadsheet";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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
  expect(await spreadsheet.getTitle(validSheetId)).toBe('Test Competition');
});

//const document = await spreadsheet.initSheet(validSheetId);
//console.log(spreadsheet.getJudges(validSheetId));
test('GetJudges - Valid', async () => {
  expect(await spreadsheet.getJudges(validSheetId)).toEqual(["Judge A", "Judge B", "Judge C", "Judge D", "Judge E"]);
});

test('GetParticipants - Valid', async () => {
  expect(await spreadsheet.getParticipants(validSheetId)).toEqual(["Ash", "Birch", "Cherry", "Dogwood", "Elm", "Fir"]);
});

test('Vote - Valid', async () => {
  jest.setTimeout(10000);
  expect(await spreadsheet.vote(validSheetId, "Judge A", "Due Diligence", "Ash", "Birch", "Cherry")).toEqual(true);
});

test('Vote - Invalid Choice', async () => {
  expect(await spreadsheet.vote(validSheetId, "Judge A", "Due Diligence", "Ash", "Ash", "Ash")).toEqual(false);
});

test('Vote - Invalid Participant', async () => {
  expect(await spreadsheet.vote(validSheetId, "Judge A", "Due Diligence", "Ash", "Bob", "Joe")).toEqual(false);
});

test('Vote - Invalid Judge', async () => {
  expect(await spreadsheet.vote(validSheetId, "Bob Joe", "Due Diligence", "Ash", "Birch", "Cherry")).toEqual(false);
});

test('Vote - No Event', async () => {
  expect(await spreadsheet.vote(validSheetId, "Judge A", null, "Ash", "Birch", "Cherry")).toEqual(false);
});