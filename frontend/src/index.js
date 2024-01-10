// 1) Import react
import "./index.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { ThemeProvider } from "@material-tailwind/react";


// 2) Get refence to root div
const div = document.querySelector('#root');
 
// 3) control rdiv with roo
const root = ReactDOM.createRoot(div);


// 5) show compoent
root.render(
<ThemeProvider>
  <App/>
</ThemeProvider>
)