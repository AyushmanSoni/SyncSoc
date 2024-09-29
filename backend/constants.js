const express = require('express')

const Soclist = new Set(["Sarasva" , "Rangtarangini" , "Virtuosi" , "Tesla" , "Geekhaven", "AMS", "Nirmiti" , "Geneticxcrew", "Gravity" , "Spirit"]);

function check(society){
    return Soclist.has(society)
}

function add(society){
    Soclist.add(society)
}

module.exports = {
    check,
    add,
};