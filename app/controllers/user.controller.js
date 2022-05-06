const db = require("../models");
const User = db.user;

exports.userBoard = (req, res) => {
    res.status(200).send(`Порядок действий при работе.`);
  };
  
exports.adminBoard = (req, res) => {
    res.status(200).send(`Инструкция по порядку действий при работе.`);
  };
  
exports.allBoard = (req, res) => {
    res.status(200).send("Для чего нужна система. ");
  };