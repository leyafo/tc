import React, { Suspense, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
// import {fn} from './pages/Detail/stream'

const Detail = React.lazy(() => import("@/pages/Detail"));
// const Introduction = React.lazy(() => import("@/pages/Introduction"));
// const LockupConfirm = React.lazy(() => import("@/pages/LockupConfirm"));
// const WithdrawConfirm = React.lazy(() => import("@/pages/WithdrawConfirm"));

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<Detail />}></Route>
            {/*<Route path="/introduction" element={<Introduction />}></Route>*/}
            {/*<Route path="/lockup-confirm" element={<LockupConfirm />}></Route>*/}
            {/*<Route*/}
            {/*  path="/withdraw-confirm"*/}
            {/*  element={<WithdrawConfirm />}*/}
            {/*></Route>*/}
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
