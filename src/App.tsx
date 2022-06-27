import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Detail } from './components/Detail';
import { Home } from './components/Home';
import { Invalid } from './components/Invalid';
import { Page } from './components/Page';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page />}>
        <Route index element={<Navigate replace to={'/pokemon/'} />}></Route>
        <Route path='/pokemon/' element={<Home />} />
        <Route path='/pokemon/:page_id' element={<Detail />} />
      </Route>
      <Route path='*' element={<Invalid />} />
    </Routes>
  </BrowserRouter>
);
