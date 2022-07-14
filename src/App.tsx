import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { DetailPage } from './components/DetailPage';
import { HomePage } from './components/HomePage';
import { Invalid } from './components/Invalid';
import { Page } from './components/Page';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page />}>
        <Route index element={<Navigate replace to={'/pokemon/'} />}></Route>
        <Route path='/pokemon/' element={<HomePage />} />
        <Route path='/pokemon/:page_id' element={<DetailPage />} />
      </Route>
      <Route path='*' element={<Invalid />} />
    </Routes>
  </BrowserRouter>
);
