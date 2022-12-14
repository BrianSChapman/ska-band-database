const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'TikiVibes12!',
    database: 'classlist_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

db.query